using AutoMapper;
using Blog.Data.Identity;
using Blog.Data.Identity.Interfaces;
using Blog.Services.Interfaces;
using Blog.Services.Models;
using Microsoft.AspNet.Identity;
using System.Collections.Generic;
using System.Data.Entity;
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

        public IList<UserDTO> GetAllUsers()
        {
            return _userMapper.Map<IList<User>, IList<UserDTO>>(_database.UserManager.Users.Include(x => x.Roles).ToList());
        }

        public async Task<UserDTO> GetUserById(string id)
        {
            return _userMapper.Map<UserDTO>(await _database.UserManager.FindByIdAsync(id));
        }

        public async Task<OperationDetails> EditUser(UserDTO userDto, string[] rolesToAdd)
        {
            var user = await _database.UserManager.FindByIdAsync(userDto.Id);

            if (user == null)
            {
                return new OperationDetails(false, new[] { "User not found" });
            }

            user.UserName = userDto.UserName;
            user.Email = userDto.Email;

            var isEmailValid = await _database.UserManager.UserValidator.ValidateAsync(user);

            if (!isEmailValid.Succeeded)
            {
                return new OperationDetails(false, isEmailValid.Errors);
            }

            var isPasswordValid = await _database.UserManager.PasswordValidator.ValidateAsync(userDto.Password);

            if (!isPasswordValid.Succeeded)
            {
                return new OperationDetails(false, isPasswordValid.Errors);
            }

            user.PasswordHash = _database.UserManager.PasswordHasher.HashPassword(userDto.Password);
            
            var removeFromRolesResult = await _database.UserManager.RemoveFromRolesAsync(user.Id, GetAllRoles().Select(role => role.Name).ToArray());

            if (!removeFromRolesResult.Succeeded)
            {
                return new OperationDetails(false, removeFromRolesResult.Errors);
            }

            if (rolesToAdd != null)
            {
                foreach (var role in rolesToAdd)
                {
                    var addToRoleResult = await _database.UserManager.AddToRoleAsync(user.Id, role);

                    if (!addToRoleResult.Succeeded)
                    {
                        return new OperationDetails(false, addToRoleResult.Errors);
                    }
                }
            }

            var updateUserResult = await _database.UserManager.UpdateAsync(user);

            return !updateUserResult.Succeeded ? 
                new OperationDetails(false, updateUserResult.Errors) :
                new OperationDetails(true, new[] {"User information successfully changed"});
        }

        public async Task<OperationDetails> CreateUser(UserDTO userDto)
        {
            var user = await _database.UserManager.FindByEmailAsync(userDto.Email);

            if (user != null)
            {
                return new OperationDetails(false, new[] { "User with this Email already exist" });
            }

            user = new User { Email = userDto.Email, UserName = userDto.UserName };

            var createUserResult = await _database.UserManager.CreateAsync(user, userDto.Password);

            if (createUserResult.Errors.Any())
            {
                return new OperationDetails(false, createUserResult.Errors);
            }

            var addToRoleResult = await _database.UserManager.AddToRolesAsync(user.Id, "User");

            if (!addToRoleResult.Succeeded)
            {
                return new OperationDetails(false, addToRoleResult.Errors);
            }

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

            var deleteUserResult = await _database.UserManager.DeleteAsync(user);

            if (deleteUserResult.Errors.Any())
            {
                return new OperationDetails(false, deleteUserResult.Errors);
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
            var createRoleResult = await _database.RoleManager.CreateAsync(new Role { Name = name });

            if (createRoleResult.Errors.Any())
            {
                return new OperationDetails(false, createRoleResult.Errors);
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

            var deleteRoleResult = await _database.RoleManager.DeleteAsync(role);
            if (deleteRoleResult.Errors.Any())
            {
                return new OperationDetails(false, deleteRoleResult.Errors);
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
