using Blog.Services.Identity.Interfaces;

using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security.Cookies;

using Ninject;

using Owin;

namespace Blog.Api
{
    public partial class Startup
    {
        public void ConfigureAuth(IAppBuilder app, IKernel kernel)
        {
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);

            app.UseCookieAuthentication(new CookieAuthenticationOptions());
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            app.UseOAuthBearerTokens(kernel.Get<IOAuthAuthorizationServerOptions>().GetOptions());
        }
    }
}