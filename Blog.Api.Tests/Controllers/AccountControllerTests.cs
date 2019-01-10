using Blog.Api.Controllers;
using Blog.Api.Models;
using Blog.Tests.Initialize.EffortSetting;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Security.Principal;
using System.Threading;
using System.Web.Http.Results;

namespace Blog.Api.Tests.Controllers
{
    [TestClass]
    public class AccountControllerTests
    {
        private AccountController _controller;

        [TestInitialize]
        public void TestInitialize()
        {
            var identity = new GenericIdentity("Admin");
            Thread.CurrentPrincipal = new GenericPrincipal(identity, new[] { "Admin" });

            _controller = new AccountController(
                EffortProviderFactory.GetFakeUserService(),
                EffortProviderFactory.GetFakeSiteAutoMapper(),
                EffortProviderFactory.GetFakeAuthenticationManager()
                );
        }

        [TestMethod]
        public void GetUserInfo()
        {
            var user = _controller.GetUserInfo();

            Assert.AreEqual("Admin", user.UserName);
        }

        [TestMethod]
        public void Register()
        {
            var user = new RegisterViewModel
            {
                Email = "Nick@mail.com",
                Password = "123456",
                PasswordConfirm = "123456",
                UserName = "Nick"
            };

            var result = _controller.Register(user);

            Assert.IsInstanceOfType(result, typeof(OkResult));
        }

        [TestMethod]
        public void Logout()
        {
            Assert.Fail();
        }
    }
}