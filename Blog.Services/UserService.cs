using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Blog.Data;
using Blog.Data.Interfaces;
using Blog.Services.Interfaces;
using Blog.Services.Models;
using Microsoft.AspNet.Identity;
using Ninject;

namespace Blog.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _database;
        private readonly IMapper _userMapper;
        private readonly IMapper _roleMapper;

        public UserService(IUnitOfWork uow, [Named("Service")] IMapper userMapper, [Named("Service")] IMapper roleMapper)
        {
            _database = uow;
            _userMapper = userMapper;
            _roleMapper = roleMapper;
        }

        public IEnumerable<UserDTO> GetAllUsers()
        {
            return _userMapper.Map<IEnumerable<User>, IEnumerable<UserDTO>>(_database.UserManager.Users);
        }

        public async Task<UserDTO> GetUserById(string id)
        {
            var user = await _database.UserManager.FindByIdAsync(id);

            return _userMapper.Map<UserDTO>(user);
        }

        public async Task<OperationDetails> EditUser(UserDTO userDto)
        {
            var user = await _database.UserManager.FindByIdAsync(userDto.Id);

            if (user == null)
            {
                return new OperationDetails(false, new[] { "User not found" });
            }

            user.UserName = userDto.UserName;

            user.Email = userDto.Email;

            var validEmail = await _database.UserManager.UserValidator.ValidateAsync(user);

            if (!validEmail.Succeeded)
            {
                return new OperationDetails(false, validEmail.Errors);
            }

            var validPass = await _database.UserManager.PasswordValidator.ValidateAsync(userDto.Password);

            if (!validPass.Succeeded)
            {
                return new OperationDetails(false, validPass.Errors);
            }

            user.PasswordHash = _database.UserManager.PasswordHasher.HashPassword(userDto.Password);

            var result = await _database.UserManager.UpdateAsync(user);

            return result.Succeeded ?
                new OperationDetails(true, new[] { "User information successfully changed" }) :
                new OperationDetails(false, result.Errors);
        }

        public async Task<OperationDetails> CreateUser(UserDTO userDto)
        {
            var user = await _database.UserManager.FindByEmailAsync(userDto.Email);

            if (user != null)
            {
                return new OperationDetails(false, new[] { "User with this login already exist" });
            }

            user = new User { Email = userDto.Email, UserName = userDto.UserName };

            var result = await _database.UserManager.CreateAsync(user, userDto.Password);

            if (result.Errors.Any())
            {
                return new OperationDetails(false, result.Errors);
            }
               
            await _database.UserManager.AddToRoleAsync(user.Id, userDto.Role);

            await _database.SaveAsync();

            return new OperationDetails(true, new[] { "User successfully created" });
        }

        public async Task<OperationDetails> DeleteUserById(string id)
        {
            var user = await _database.UserManager.FindByIdAsync(id);

            if (user == null)
            {
                return new OperationDetails(false, new[] { "User not found" });
            }

            var result = await _database.UserManager.DeleteAsync(user);

            if (result.Errors.Any())
            {
                return new OperationDetails(false, result.Errors);
            }
            await _database.SaveAsync();

            return new OperationDetails(true, new[] { "User successfully deleted" });
        }

        public IEnumerable<RoleDTO> GetAllRoles()
        {
            return _roleMapper.Map<IEnumerable<Role>, IEnumerable<RoleDTO>>(
                _database.RoleManager.Roles);
        }

        public async Task<OperationDetails> CreateRole(string name)
        {
            var result = await _database.RoleManager.CreateAsync(new Role { Name = name });

            if (result.Errors.Any())
            {
                return new OperationDetails(false, result.Errors);
            }
                
            await _database.SaveAsync();

            return new OperationDetails(true, new[] { "Role successfully created" });
        }

        public async Task<OperationDetails> DeleteRoleById(string id)
        {
            var role = await _database.RoleManager.FindByIdAsync(id);

            if (role == null)
            {
                return new OperationDetails(false, new[] { "Role not found" });
            }

            var result = await _database.RoleManager.DeleteAsync(role);
            if (result.Errors.Any())
            {
                return new OperationDetails(false, result.Errors);
            }
                
            await _database.SaveAsync();

            return new OperationDetails(true, new[] { "User successfully deleted" });
        }

        public async Task<ClaimsIdentity> Authenticate(UserDTO userDto)
        {
            ClaimsIdentity claim = null;

            var user = await _database.UserManager.FindAsync(userDto.UserName, userDto.Password);

            if (user != null)
            {
                claim = await _database.UserManager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ApplicationCookie);
            }
                
            return claim;
        }

        public void Dispose()
        {
            _database.Dispose();
        }
    }
}
