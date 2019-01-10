using System.Linq;
using System.Threading.Tasks;
using System.Web.Http.Results;
using Blog.Api.Controllers;
using Blog.Tests.Initialize.EffortSetting;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Blog.Api.Tests.Controllers
{
    [TestClass]
    public class RoleAdminControllerTests
    {
        private RoleAdminController _controller;

        [TestInitialize]
        public void TestInitialize()
        {
            _controller = new RoleAdminController(EffortProviderFactory.GetFakeUserService());
        }

        [TestMethod]
        public void Get()
        {
            var roles = _controller.Get();

            Assert.AreEqual(3, roles.Count());
        }

        [TestMethod]
        public async Task Post_4()
        {
            const string roleName = "NewRole";

            var result = await _controller.Post(roleName);

            Assert.IsInstanceOfType(result, typeof(OkResult));
        }

        [TestMethod]
        public async Task Delete_2()
        {
            const int id = 2;

            var result = await _controller.Delete(id);
            var records = _controller.Get();

            Assert.IsInstanceOfType(result, typeof(OkResult));
            Assert.AreEqual(2, records.Count());
        }
    }
}