using System.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Blog.Data.Identity
{
    public class AppIdentityDbContext : IdentityDbContext<User>
    {
        public AppIdentityDbContext() : base("IdentityDataBase") { }
    }
}
