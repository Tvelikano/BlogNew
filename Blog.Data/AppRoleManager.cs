using Microsoft.AspNet.Identity;

namespace Blog.Data
{
    public class AppRoleManager : RoleManager<Role>
    {
        public AppRoleManager(IRoleStore<Role, string> store) : base(store) { }
    }
}
