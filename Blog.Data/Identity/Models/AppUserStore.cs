using System.Data.Entity;
using Blog.Data.Interfaces;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Blog.Data.Identity.Models
{
    public class AppUserStore : UserStore<User, Role, int, UserLogin, UserRole, UserClaim>
    {
        public AppUserStore(IRecordContext db) : base((DbContext)db)
        {

        }
    }
}
