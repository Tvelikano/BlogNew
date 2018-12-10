using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Blog.Services.Models;

namespace Blog.Services.Identity.Interfaces
{
    public interface IUserService<TUser, TRole> : IDisposable
    {
        ReturnListDTO<TUser> GetAllUsers(GetArgsDTO<TUser> usersArgs);

        Task<TUser> GetUserById(int id);

        Task<OperationDetails> EditUser(TUser userDto);

        Task<OperationDetails> DeleteUserById(int id);

        IEnumerable<TRole> GetAllRoles();

        Task<OperationDetails> CreateRole(string name);

        Task<OperationDetails> DeleteRoleById(int id);

        Task<OperationDetails> CreateUser(TUser userDto);

        Task<ClaimsIdentity> Authenticate(TUser userDto);
    }
}
