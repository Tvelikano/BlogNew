using AutoMapper;
using Blog.Data.Identity;
using Microsoft.AspNet.Identity;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Blog.Services.Identity
{
    public class UserService : IUserService
    {
        private IUnitOfWork Database { get; }
        private readonly IMapper _userMapper = new MapperConfiguration(cfg => cfg.CreateMap<User, UserDTO>()).CreateMapper();
        private readonly IMapper _roleMapper = new MapperConfiguration(cfg => cfg.CreateMap<Role, RoleDTO>()).CreateMapper();

        public UserService(IUnitOfWork uow)
        {
            Database = uow;
        }

        public IEnumerable<UserDTO> GetAllUsers()
        {
            return _userMapper.Map<IEnumerable<User>, IEnumerable<UserDTO>>(
                Database.UserManager.Users);
        }

        public async Task<UserDTO> GetUserById(string id)
        {
            var user = await Database.UserManager.FindByIdAsync(id);
            return _userMapper.Map<UserDTO>(user);
        }

        public async Task<OperationDetails> EditUserById(string id, string name, string email, string password)
        {
            var user = await Database.UserManager.FindByIdAsync(id);
            if (user == null) return new OperationDetails(false, new[] { "User not found" });
            user.UserName = name;
            user.Email = email;
            var validEmail = await Database.UserManager.UserValidator.ValidateAsync(user);

            if (!validEmail.Succeeded)
            {
                return new OperationDetails(false, validEmail.Errors);
            }

            var validPass = await Database.UserManager.PasswordValidator.ValidateAsync(password);

            if (!validPass.Succeeded)
            {
                return new OperationDetails(false, validPass.Errors);

            }
            user.PasswordHash = Database.UserManager.PasswordHasher.HashPassword(password);

            var result = await Database.UserManager.UpdateAsync(user);
            return result.Succeeded ?
                new OperationDetails(true, new[] { "User information successfully changed" }) :
                new OperationDetails(false, result.Errors);
        }

        public async Task<OperationDetails> CreateUser(UserDTO userDto)
        {
            var user = await Database.UserManager.FindByEmailAsync(userDto.Email);

            if (user != null) return new OperationDetails(false, new[] { "User with this login already exist" });

            user = new User { Email = userDto.Email, UserName = userDto.UserName };
            var result = await Database.UserManager.CreateAsync(user, userDto.Password);
            if (result.Errors.Any())
                return new OperationDetails(false, result.Errors);
            await Database.UserManager.AddToRoleAsync(user.Id, userDto.Role);
            await Database.SaveAsync();

            return new OperationDetails(true, new[] { "User successfully created" });
        }

        public async Task<OperationDetails> DeleteUserById(string id)
        {
            var user = await Database.UserManager.FindByIdAsync(id);

            if (user == null) return new OperationDetails(false, new[] { "User not found" });

            var result = await Database.UserManager.DeleteAsync(user);
            if (result.Errors.Any())
                return new OperationDetails(false, result.Errors);
            await Database.SaveAsync();

            return new OperationDetails(true, new[] { "User successfully deleted" });
        }

        public IEnumerable<RoleDTO> GetAllRoles()
        {
            return _roleMapper.Map<IEnumerable<Role>, IEnumerable<RoleDTO>>(
                Database.RoleManager.Roles);
        }

        public async Task<OperationDetails> CreateRole(string name)
        {
            var result = await Database.RoleManager.CreateAsync(new Role() { Name = name });
            if (result.Errors.Any())
                return new OperationDetails(false, result.Errors);
            await Database.SaveAsync();
            return new OperationDetails(true, new[] { "Role successfully created" });
        }

        public async Task<OperationDetails> DeleteRoleById(string id)
        {
            var role = await Database.RoleManager.FindByIdAsync(id);
            if (role == null) return new OperationDetails(false, new[] { "Role not found" });
            var result = await Database.RoleManager.DeleteAsync(role);
            if (result.Errors.Any())
                return new OperationDetails(false, result.Errors);
            await Database.SaveAsync();

            return new OperationDetails(true, new[] { "User successfully deleted" });
        }

        public async Task<ClaimsIdentity> Authenticate(UserDTO userDto)
        {
            ClaimsIdentity claim = null;
            var user = await Database.UserManager.FindAsync(userDto.UserName, userDto.Password);
            if (user != null)
                claim = await Database.UserManager.CreateIdentityAsync(user,
                    DefaultAuthenticationTypes.ApplicationCookie);
            return claim;
        }

        public void Dispose()
        {
            Database.Dispose();
        }
    }
}
