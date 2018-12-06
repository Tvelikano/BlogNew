using System.Data.Entity;
using Blog.Data.Identity.Interfaces;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Blog.Data.Identity
{
    public class AppUserStore : UserStore<User>
    {
        public AppUserStore(IAppIdentityDbContext db) : base((DbContext)db)
        {

        }
    }
}
