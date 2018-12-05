using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Blog.Services.Models;

namespace Blog.Services.Interfaces
{
    public interface IUserService : IDisposable
    {
        IList<UserDTO> GetAllUsers();
        Task<UserDTO> GetUserById(string id);
        Task<OperationDetails> EditUser(UserDTO userDto, string[] rolesToAdd);
        Task<OperationDetails> DeleteUserById(string id);
        IEnumerable<RoleDTO> GetAllRoles();
        Task<OperationDetails> CreateRole(string name);
        Task<OperationDetails> DeleteRoleById(string id);
        Task<OperationDetails> CreateUser(UserDTO userDto);
        Task<ClaimsIdentity> Authenticate(UserDTO userDto);
    }
}
