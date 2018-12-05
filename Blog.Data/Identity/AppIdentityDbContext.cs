using Blog.Data.Identity.Interfaces;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Blog.Data.Identity
{
    public class AppIdentityDbContext : IdentityDbContext<User>, IAppIdentityDbContext
    {
        public AppIdentityDbContext() : base("RecordsDataBase")
        {

        }
    }
}
