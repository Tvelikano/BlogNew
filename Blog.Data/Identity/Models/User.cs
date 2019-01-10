using Blog.Data.Identity.Interfaces;
using Blog.Data.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Blog.Data.Identity.Models
{
    public class User : IdentityUser<int, UserLogin, UserRole, UserClaim>
    {
        public ICollection<Comment> Comments { get; set; }

        public ICollection<Record> Records { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(IAppUserManager manager, string authenticationType)
        {
            return await manager.CreateIdentityAsync(this, authenticationType);
        }
    }
}
