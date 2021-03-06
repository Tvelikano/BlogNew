﻿using Blog.Data.Identity.Interfaces;

using Microsoft.AspNet.Identity.EntityFramework;

using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Blog.Data.Identity
{
    public class User : IdentityUser<int, UserLogin, UserRole, UserClaim>
    {
        public ICollection<Comment> Comments { get; set; }

        public ICollection<Record> Records { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(IAppUserManager manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }
    }
}
