using System.Data.Entity;
using Blog.Data.Identity.Interfaces;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Blog.Data.Identity
{
    public class AppRoleStore : RoleStore<Role>
    {
        public AppRoleStore(IAppIdentityDbContext db) : base((DbContext)db)
        {
            
        }
    }
}
