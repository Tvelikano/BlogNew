using Microsoft.AspNet.Identity.EntityFramework;

namespace Blog.Data
{
    public class AppIdentityDbContext : IdentityDbContext<User>
    {
        public AppIdentityDbContext() : base("IdentityDataBase") { }
    }
}
