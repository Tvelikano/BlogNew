using Blog.Data.Identity.Interfaces;
using Microsoft.AspNet.Identity;

namespace Blog.Data.Identity
{
    public class AppRoleManager : RoleManager<Role, int> , IAppRoleManager
    {
        public AppRoleManager(IRoleStore<Role, int> store) : base(store)
        {

        }
    }
}
