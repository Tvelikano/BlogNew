﻿using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Blog.Services.Models;

namespace Blog.Services.Identity.Interfaces
{
    public interface IUserService : IDisposable
    {
        ListUsersDTO GetAllUsers(GetAllUsersArgsDTO usersArgs);

        Task<UserDTO> GetUserById(string id);

        Task<OperationDetails> EditUser(UserDTO userDto);

        Task<OperationDetails> DeleteUserById(string id);

        IEnumerable<RoleDTO> GetAllRoles();

        Task<OperationDetails> CreateRole(string name);

        Task<OperationDetails> DeleteRoleById(string id);

        Task<OperationDetails> CreateUser(UserDTO userDto);

        Task<ClaimsIdentity> Authenticate(UserDTO userDto);
    }
}
