using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Blog.Api.Startup))]

namespace Blog.Api
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}