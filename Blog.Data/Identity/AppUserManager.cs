using Microsoft.AspNet.Identity;

namespace Blog.Data.Identity
{
    public class AppUserManager : UserManager<User>
    {
        public AppUserManager(IUserStore<User> store) : base(store) { }
    }
}
