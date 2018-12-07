using System;
using Blog.Data.Identity;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;

namespace Blog.Services
{
    public class AppCookieAuthenticationOptions : CookieAuthenticationOptions
    {
        public AppCookieAuthenticationOptions()
        {
            AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie;
            LoginPath = new PathString("/Account/Login");
            Provider = new CookieAuthenticationProvider
            {
                OnValidateIdentity = SecurityStampValidator
                    .OnValidateIdentity<AppUserManager, User, int>(
                        validateInterval: TimeSpan.FromMinutes(30),
                        regenerateIdentityCallback: (manager, user) =>
                            user.GenerateUserIdentityAsync(manager),
                        getUserIdCallback: (id) => (id.GetUserId<int>()))
            };
        }
    }
}
