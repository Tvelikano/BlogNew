using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;
using Blog.Data.Interfaces;

namespace Blog.Data.Identity
{
    public class AppUserStore : UserStore<User, Role, int, UserLogin, UserRole, UserClaim>
    {
        public AppUserStore(IRecordContext db) : base((DbContext)db)
        {

        }
    }
}
