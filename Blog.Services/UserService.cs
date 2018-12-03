using AutoMapper;
using Blog.Data.Identity;
using Blog.Data.Identity.Interfaces;
using Blog.Services.Interfaces;
using Blog.Services.Models;
using Microsoft.AspNet.Identity;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Blog.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _database;
        private readonly IMapper _userMapper;
        private readonly IMapper _roleMapper;

        public UserService(IUnitOfWork uow, IMapper userMapper, IMapper roleMapper)
        {
            _database = uow;
            _userMapper = userMapper;
            _roleMapper = roleMapper;
        }

        public async Task<IEnumerable<UserDTO>> GetAllUsers()
        {
            var users = _database.UserManager.Users;

            var usersDto = _userMapper.Map<IEnumerable<User>, IEnumerable<UserDTO>>(users);

            foreach (var user in users)
            {
                foreach (var role in user.Roles)
                {
                    var appRole = await _database.RoleManager.FindByIdAsync(role.RoleId);

                    usersDto.FirstOrDefault(u => u.Id == user.Id).AppRoles.Add(_roleMapper.Map<RoleDTO>(appRole));
                }
            }

            return usersDto;
        }

        public async Task<UserDTO> GetUserById(string id)
        {
            var user = await _database.UserManager.FindByIdAsync(id);

            var userDto = _userMapper.Map<UserDTO>(user);

            foreach (var role in user.Roles)
            {
                var appRole = await _database.RoleManager.FindByIdAsync(role.RoleId);

                userDto.AppRoles.Add(_roleMapper.Map<RoleDTO>(appRole));
            }

            return userDto;
        }

        public async Task<OperationDetails> EditUser(UserDTO userDto, string[] rolesToAdd)
        {
            var user = await _database.UserManager.FindByIdAsync(userDto.Id);

            if (user == null)
            {
                return new OperationDetails(false, new[] { "User not found" });
            }

            await _database.UserManager.RemoveFromRolesAsync(user.Id, GetAllRoles().Select(role => role.Name).ToArray());

            if (rolesToAdd != null)
            {
                foreach (var role in rolesToAdd)
                {
                    await _database.UserManager.AddToRoleAsync(user.Id, role);
                }
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
                return new OperationDetails(false, new[] { "User with this Email already exist" });
            }

            user = new User { Email = userDto.Email, UserName = userDto.UserName };

            var result = await _database.UserManager.CreateAsync(user, userDto.Password);

            if (result.Errors.Any())
            {
                return new OperationDetails(false, result.Errors);
            }

            await _database.UserManager.AddToRolesAsync(user.Id, "User");

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
