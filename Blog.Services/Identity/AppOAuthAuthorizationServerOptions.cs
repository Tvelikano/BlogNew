using Blog.Services.Identity.Interfaces;

using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;

using System;

namespace Blog.Services.Identity
{
    public class AppOAuthAuthorizationServerOptions : IOAuthAuthorizationServerOptions
    {
        private readonly IOAuthAuthorizationServerProvider _provider;

        public AppOAuthAuthorizationServerOptions(IOAuthAuthorizationServerProvider provider)
        {
            _provider = provider;
        }
        public OAuthAuthorizationServerOptions GetOptions()
        {
            return new OAuthAuthorizationServerOptions()
            {
                TokenEndpointPath = new PathString("/api/token"),
                Provider = _provider,
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(14),
                AllowInsecureHttp = true
            };
        }
    }
}
