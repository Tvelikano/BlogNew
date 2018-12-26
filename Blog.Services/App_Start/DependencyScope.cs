using System;
using System.Collections.Generic;
using System.Web.Http.Dependencies;

namespace Blog.Services
{
    public class DependencyScope : IDependencyScope
    {
        private DependencyResolver _kernel;

        public DependencyScope(DependencyResolver kernel)
        {
            _kernel = kernel;
        }

        public object GetService(Type serviceType) => _kernel.GetService(serviceType);

        public IEnumerable<object> GetServices(Type serviceType) => _kernel.GetServices(serviceType);


        public void Dispose()
        {
            _kernel = null;
        }
    }
}
