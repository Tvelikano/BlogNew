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
using Ninject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Dependencies;

namespace Blog.Services
{
    public class DependencyResolver : IDependencyResolver
    {
        private IKernel _kernel;

        public DependencyResolver(IKernel kernelParam)
        {
            _kernel = kernelParam;

            AddBindings();
        }

        public object GetService(Type serviceType) => _kernel.TryGet(serviceType);

        public IEnumerable<object> GetServices(Type serviceType) => _kernel.GetAll(serviceType).ToArray();


        public IDependencyScope BeginScope()
        {
            return new DependencyScope(this);
        }

        private void AddBindings()
        {
            _kernel.Bind<IUserStore<User, int>>().To<AppUserStore>();

            _kernel.Bind<IRoleStore<Role, int>>().To<AppRoleStore>();

            _kernel.Bind<IAppUserManager>().To<AppUserManager>();

            _kernel.Bind<IAppRoleManager>().To<AppRoleManager>();

            _kernel.Bind<IRecordContext>().To<RecordContext>();

            _kernel.Bind<IRecordRepository>().To<EfRecordRepository>();

            _kernel.Bind<IRecordService>().To<RecordService>();

            _kernel.Bind<IUserService<UserDTO, RoleDTO>>().To<UserService<UserDTO, RoleDTO>>();

            _kernel.Bind<IUnitOfWork>().To<IdentityUnitOfWork>();

            _kernel.Bind<IAuthenticationManager>().ToMethod(c => HttpContext.Current.GetOwinContext().Authentication);
        }

        public void Dispose()
        {
            _kernel = null;
        }
    }
}