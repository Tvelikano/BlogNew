using Blog.Data.Identity.Interfaces;
using Microsoft.AspNet.Identity;

namespace Blog.Data.Identity
{
    public class AppUserManager : UserManager<User>, IAppUserManager
    {
        public AppUserManager(IUserStore<User> store) : base(store)
        {

        }
    }
}
