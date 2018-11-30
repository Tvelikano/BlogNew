using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Blog.Services.Identity
{
    public interface IUserService : IDisposable
    {
        IEnumerable<UserDTO> GetAllUsers();
        Task<UserDTO> GetUserById(string id);
        Task<OperationDetails> EditUserById(string id, string name, string email, string password);
        Task<OperationDetails> DeleteUserById(string id);
        IEnumerable<RoleDTO> GetAllRoles();
        Task<OperationDetails> CreateRole(string name);
        Task<OperationDetails> DeleteRoleById(string id);
        Task<OperationDetails> CreateUser(UserDTO userDto);
        Task<ClaimsIdentity> Authenticate(UserDTO userDto);
    }
}
