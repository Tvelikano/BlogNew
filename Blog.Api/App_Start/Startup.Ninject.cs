using Blog.Services;

using Ninject;
using Ninject.Web.Common.OwinHost;
using Ninject.Web.WebApi.OwinHost;

using Owin;

using System.Web.Http;

namespace Blog.Api
{
    public partial class Startup
    {
        public IKernel ConfigureNinject(IAppBuilder app)
        {
            var config = new HttpConfiguration();
            WebApiConfig.Register(config);
            var kernel = CreateKernel();
            app.UseNinjectMiddleware(() => kernel)
                .UseNinjectWebApi(config);

            return kernel;
        }

        public IKernel CreateKernel()
        {
            var kernel = new StandardKernel(new SiteAutoMapperModule(), new ServiceAutoMapperModule());
            RegisterServices(kernel);
            return kernel;
        }

        private static void RegisterServices(IKernel kernel)
        {
            System.Web.Mvc.DependencyResolver.SetResolver(new DependencyResolver(kernel));
        }
    }
}