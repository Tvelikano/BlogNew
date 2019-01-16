﻿using Blog.Services;
using Blog.Services.Identity.Interfaces;

using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security.Cookies;

using Ninject;
using Ninject.Web.Common.OwinHost;
using Ninject.Web.WebApi.OwinHost;

using Owin;

using System.Linq;
using System.Threading.Tasks;
using System.Web.Cors;
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

            var cors = new EnableCorsAttribute("http://localhost:53695", "*", "*");
            config.EnableCors(cors);



            var kernel = new StandardKernel(new NinjectConfigModule(), new SiteAutoMapperModule(), new ServiceAutoMapperModule());

            app.UseCookieAuthentication(new CookieAuthenticationOptions());
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            app.UseOAuthBearerTokens(kernel.Get<IOAuthAuthorizationServerOptions>().GetOptions());

            app.Map("/signalr", map =>
            {
                var corsOption = new CorsOptions
                {
                    PolicyProvider = new CorsPolicyProvider
                    {
                        PolicyResolver = context =>
                        {
                            var policy = new CorsPolicy { AllowAnyHeader = true, AllowAnyMethod = true, SupportsCredentials = true };

                            cors.Origins.ToList().ForEach(o => policy.Origins.Add(o));

                            return Task.FromResult(policy);
                        }
                    }
                };
                map.UseCors(corsOption).RunSignalR();
            });

            config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            app.UseNinjectMiddleware(() => kernel)
                .UseNinjectWebApi(config);
        }
    }
}