using System.Threading.Tasks;
using Blog.Api.Controllers;
using Blog.Api.Models;
using Blog.Tests.Initialize.EffortSetting;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Web.Http.Results;

namespace Blog.Api.Tests.Controllers
{
    [TestClass]
    public class UserAdminControllerTests
    {
        private UserAdminController _controller;

        [TestInitialize]
        public void TestInitialize()
        {
            _controller = new UserAdminController(
                EffortProviderFactory.GetFakeUserService(),
                null,
                EffortProviderFactory.GetFakeSiteAutoMapper()
                );
        }

        [TestMethod]
        public async Task Get_ById_2()
        {
            const int id = 1;

            var user = await _controller.Get(id);

            Assert.AreNotEqual(null, user);
            Assert.AreEqual(id, user.Id);
        }

        [TestMethod]
        public void Get_ByQuery()
        {
            var searchQuery = new SearchQuery
            {
                Page = 1,
                PageSize = 2,
                SearchString = ""
            };

            var records = _controller.Get(searchQuery);

            Assert.AreEqual(2, records.List.Count);
        }

        [TestMethod]
        public async Task Post()
        {
            var user = new UserViewModel
            {
                UserName = "Nick",
                Email = "Nick@mail.com",
                Password = "123456",
                PasswordConfirm = "123456"
            };

            var result = await _controller.Post(user);

            Assert.IsInstanceOfType(result, typeof(OkResult));
        }

        [TestMethod]
        public async Task Put()
        {
            var user = new UserViewModel
            {
                Id = 1,
                UserName = "Admin",
                Email = "Admin@mail.com",
                Password = "123456",
                PasswordConfirm = "123456"
            };

            var result = await _controller.Put(user);

            Assert.IsInstanceOfType(result, typeof(OkResult));
        }

        [TestMethod]
        public async Task Delete()
        {
            const int id = 2;

            var result = await _controller.Delete(id);

            Assert.IsInstanceOfType(result, typeof(OkResult));
        }
    }
}