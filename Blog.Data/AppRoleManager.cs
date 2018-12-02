﻿using Blog.Data.Interfaces;
using Microsoft.AspNet.Identity;

namespace Blog.Data
{
    public class AppRoleManager : RoleManager<Role>, IAppRoleManager
    {
        public AppRoleManager(IRoleStore<Role, string> store) : base(store) { }
    }
}
