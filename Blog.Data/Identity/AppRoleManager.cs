using Blog.Data.Identity.Interfaces;
using Microsoft.AspNet.Identity;

namespace Blog.Data.Identity
{
    public class AppRoleManager : RoleManager<Role>, IAppRoleManager
    {
        public AppRoleManager(IRoleStore<Role, string> store) : base(store)
        {

        }
    }
}
