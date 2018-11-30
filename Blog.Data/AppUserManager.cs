using Blog.Data.Interfaces;
using Microsoft.AspNet.Identity;

namespace Blog.Data
{
    public class AppUserManager : UserManager<User>, IAppUserManager
    {
        public AppUserManager(IUserStore<User> store) : base(store)
        {

        }
    }
}
