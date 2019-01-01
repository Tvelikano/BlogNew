using System;
using Blog.Data;
using Blog.Data.Identity;
using Blog.Data.Identity.Interfaces;
using Blog.Services.Identity;
using Blog.Services.Identity.Interfaces;

using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using Ninject;

using Owin;

namespace Blog.Api
{
    public partial class Startup
    {
        public void ConfigureAuth(IAppBuilder app, IKernel kernel)
        {
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            app.CreatePerOwinContext(RecordContext.Create);
            app.CreatePerOwinContext<AppUserManager>(AppUserManager.Create);

            app.UseCookieAuthentication(new CookieAuthenticationOptions());
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            var OAuthOptions = new OAuthAuthorizationServerOptions
            {
                TokenEndpointPath = new PathString("/api/token"),
                Provider = new AppOAuthProvider("self"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(14),
                AllowInsecureHttp = true
            };

            app.UseOAuthBearerTokens(OAuthOptions);
        }
    }
}