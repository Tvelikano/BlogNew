using Blog.Data;
using Blog.Data.Identity;
using Blog.Data.Identity.Interfaces;
using Blog.Data.Interfaces;
using Blog.Data.Repository;
using Blog.Data.Repository.Interfaces;
using Blog.Services.Identity;
using Blog.Services.Identity.Interfaces;
using Blog.Services.Interfaces;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using Ninject.Modules;
using System.Web;
using Blog.Data.Identity.Models;
using Blog.Services.Identity.Models;

namespace Blog.Services
{
    public class NinjectConfigModule : NinjectModule
    {
        public override void Load()
        {
            Bind<IUserStore<User, int>>().To<AppUserStore>();

            Bind<IRoleStore<Role, int>>().To<AppRoleStore>();

            Bind<IAppUserManager>().To<AppUserManager>();

            Bind<IAppRoleManager>().To<AppRoleManager>();

            Bind<IRecordContext>().To<RecordContext>();

            Bind<IRecordRepository>().To<EfRecordRepository>();

            Bind<IRecordService>().To<RecordService>();

            Bind<IUserService<UserDTO, RoleDTO>>().To<UserService<UserDTO, RoleDTO>>();

            Bind<IUnitOfWork>().To<IdentityUnitOfWork>();

            Bind<IAuthenticationManager>().ToMethod(c => HttpContext.Current.GetOwinContext().Authentication);

            Bind<IOAuthAuthorizationServerProvider>().To<AppOAuthProvider>();

            Bind<IOAuthAuthorizationServerOptions>().To<AppOAuthAuthorizationServerOptions>();
        }
    }
}
