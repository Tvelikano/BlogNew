﻿using AutoMapper;
using Blog.Data.Identity;
using Blog.Data.Identity.Interfaces;
using Blog.Services.Identity.Interfaces;
using Blog.Services.Models;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Blog.Services.Identity
{
    public class UserService<TUser, TRole> : IUserService<TUser, TRole> where TUser : UserDTO where TRole : RoleDTO
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
        
        public ReturnListDTO<TUser> GetAllUsers(GetArgsDTO<TUser> usersArgs)
        {
            var query = _database.UserManager.Users;
            
            if (!string.IsNullOrEmpty(usersArgs.SearchString))
            {
                query = query.Where(r => r.UserName.Contains(usersArgs.SearchString));
            }

            if (usersArgs.OrderBy != null)
            {
                query = query.OrderBy(_userMapper.Map<Expression<Func<User, object>>>(usersArgs.OrderBy));
            }

            var count = query.Count();

            if (usersArgs.Page > 0 && usersArgs.PageSize > 0)
            {
                query = query.Skip(usersArgs.PageSize * (usersArgs.Page - 1)).Take(usersArgs.PageSize);
            }

            return new ReturnListDTO<TUser>
            {
                List = _userMapper.Map<IList<TUser>>(query.ToList()),
                Count = count
            };
        }

        public async Task<TUser> GetUserById(int id)
        {
            return _userMapper.Map<TUser>(await _database.UserManager.FindByIdAsync(id));
        }

        public async Task<OperationDetails> EditUser(TUser userDto)
        {
            var result = await _database.UserManager.EditUserAsync(_userMapper.Map<EditUser>(userDto));

            return !result.Succeeded ? 
                new OperationDetails(false, result.Errors) :
                new OperationDetails(true, new[] {"User information successfully changed"});
        }

        public async Task<OperationDetails> CreateUser(TUser userDto)
        {
            var user = await _database.UserManager.FindByEmailAsync(userDto.Email);

            if (user != null)
            {
                return new OperationDetails(false, new[] { "User with this Email already exist" });
            }

            user = new User { Email = userDto.Email, UserName = userDto.UserName };

            var createUserResult = await _database.UserManager.CreateAsync(user, userDto.Password);

            if (!createUserResult.Succeeded)
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

        public async Task<OperationDetails> DeleteUserById(int id)
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

        public IEnumerable<TRole> GetAllRoles()
        {
            return _roleMapper.Map<IEnumerable<Role>, IEnumerable<TRole>>(
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

        public async Task<OperationDetails> DeleteRoleById(int id)
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

        public async Task<ClaimsIdentity> Authenticate(TUser userDto)
        {
            ClaimsIdentity claim = null;

            var user = await _database.UserManager.FindAsync(userDto.UserName, userDto.Password);

            if (user != null)
            {
                claim = await _database.UserManager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ExternalBearer);
            }

            return claim;
        }

        public void Dispose()
        {
            _database.Dispose();
        }
    }
}
