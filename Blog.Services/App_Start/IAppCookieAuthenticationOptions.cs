using System;
using Microsoft.Owin;
using Microsoft.Owin.Infrastructure;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;

namespace Blog.Services
{
    public interface IAppCookieAuthenticationOptions
    {
        string CookieName { get; set; }
        string CookieDomain { get; set; }
        string CookiePath { get; set; }
        bool CookieHttpOnly { get; set; }
        CookieSecureOption CookieSecure { get; set; }
        TimeSpan ExpireTimeSpan { get; set; }
        bool SlidingExpiration { get; set; }
        PathString LoginPath { get; set; }
        PathString LogoutPath { get; set; }
        string ReturnUrlParameter { get; set; }
        ICookieAuthenticationProvider Provider { get; set; }
        ISecureDataFormat<AuthenticationTicket> TicketDataFormat { get; set; }
        ISystemClock SystemClock { get; set; }
        ICookieManager CookieManager { get; set; }
        IAuthenticationSessionStore SessionStore { get; set; }
        string AuthenticationType { get; set; }
        AuthenticationMode AuthenticationMode { get; set; }
        AuthenticationDescription Description { get; set; }
    }
}