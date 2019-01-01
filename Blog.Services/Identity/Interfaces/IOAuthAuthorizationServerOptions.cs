using Microsoft.Owin.Security.OAuth;

namespace Blog.Services.Identity.Interfaces
{
    public interface IOAuthAuthorizationServerOptions
    {
        OAuthAuthorizationServerOptions GetOptions();
    };
}
