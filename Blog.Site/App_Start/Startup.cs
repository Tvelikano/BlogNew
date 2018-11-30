using Blog.Services;
using Blog.Services.Identity;
using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Owin;
using DependencyResolver = System.Web.Mvc.DependencyResolver;

namespace Blog.Site
{
    public class Startup
    {
        ServiceCreator creator = new ServiceCreator();
        //private IUserService Service { get; }
        //public Startup()
        //{
        //    Service = (IUserService)DependencyResolver.Current.GetService(typeof(IUserService));
        //}
        public void Configuration(IAppBuilder app)
        {
            // app.CreatePerOwinContext(() => Service);
            app.CreatePerOwinContext(CreateUserService);
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString("/Account/Login"),
            });
        }
        private IUserService CreateUserService()
        {
            return creator.CreateUserService();
        }
    }
}