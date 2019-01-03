using Blog.Services;
using Blog.Services.Identity.Interfaces;
using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Ninject;
using Ninject.Web.Common.OwinHost;
using Ninject.Web.WebApi.OwinHost;
using Owin;
using System.Web.Http;
using System.Web.Http.Cors;

[assembly: OwinStartup(typeof(Blog.Api.Startup))]

namespace Blog.Api
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var config = new HttpConfiguration();


            config.EnableCors(new EnableCorsAttribute("http://localhost:53695", "*", "*"));
            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            var kernel = new StandardKernel(new NinjectConfigModule(), new SiteAutoMapperModule(), new ServiceAutoMapperModule());

            app.UseCookieAuthentication(new CookieAuthenticationOptions());
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            app.UseOAuthBearerTokens(kernel.Get<IOAuthAuthorizationServerOptions>().GetOptions());
            
            app.UseNinjectMiddleware(() => kernel)
                .UseNinjectWebApi(config);
        }
    }
}