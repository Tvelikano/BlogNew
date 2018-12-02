using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Blog.Data;
using Blog.Data.Interfaces;
using Blog.Data.Repository;
using Blog.Data.Repository.Interfaces;
using Blog.Services.Interfaces;
using Microsoft.AspNet.Identity;
using Ninject;

namespace Blog.Services
{
    public class DependencyResolver : IDependencyResolver
    {
        private readonly IKernel _kernel;

        public DependencyResolver(IKernel kernelParam)
        {
            _kernel = kernelParam;
            AddBindings();
        }
        public object GetService(Type serviceType)
        {
            return _kernel.TryGet(serviceType);
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            return _kernel.GetAll(serviceType);
        }
        private void AddBindings()
        {
            _kernel.Bind<IAppUserManager>().To<AppUserManager>();
            _kernel.Bind<IRecordRepository>().To<EfRecordRepository>();
            _kernel.Bind<IRecordService>().To<RecordService>();
            _kernel.Bind<IUserService>().To<UserService>();
            _kernel.Bind<IUnitOfWork>().To<IdentityUnitOfWork>();
        }
    }
}