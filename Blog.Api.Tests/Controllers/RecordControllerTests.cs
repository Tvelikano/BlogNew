using Blog.Api.Controllers;
using Blog.Api.Models;
using Blog.Services.Models;
using Blog.Tests.Initialize.EffortSetting;

using Microsoft.VisualStudio.TestTools.UnitTesting;

using System.Security.Principal;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Results;

namespace Blog.Api.Tests.Controllers
{
    [TestClass]
    public class RecordControllerTests
    {
        private RecordController _controller;

        [AssemblyInitialize]
        public static void AssemblyInit(TestContext context)
        {
            Effort.Provider.EffortProviderConfiguration.RegisterProvider();
        }

        [TestInitialize]
        public void TestInitialize()
        {
            var identity = new GenericIdentity("Admin");
            Thread.CurrentPrincipal = new GenericPrincipal(identity, new[] { "Admin" });

            _controller = new RecordController(EffortProviderFactory.GetFakeRecordService());
        }

        [TestMethod]
        public async Task Get_ById_2()
        {
            const int id = 2;

            var result = await _controller.Get(id);
            var actualRecord = (result as OkNegotiatedContentResult<ReturnModelDTO<RecordDTO>>).Content;

            Assert.AreNotEqual(null, result);
            Assert.IsInstanceOfType(result, typeof(OkNegotiatedContentResult<ReturnModelDTO<RecordDTO>>));
            Assert.AreNotEqual(null, actualRecord);
            Assert.AreEqual(id, actualRecord.Model.RecordId);
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
        public async Task Post_4()
        {
            var record = new RecordDTO { RecordId = 4, Name = "4", Content = "4", UserId = 1 };

            await _controller.Post(record);
            var getResult = await _controller.Get(record.RecordId);
            var actualRecord = (getResult as OkNegotiatedContentResult<ReturnModelDTO<RecordDTO>>).Content;

            Assert.AreNotEqual(null, actualRecord);
            Assert.AreEqual(record.RecordId, actualRecord.Model.RecordId);
        }

        [TestMethod]
        public async Task Put_2()
        {
            var record = new RecordDTO { RecordId = 2, Name = "222", Content = "2", UserId = 1 };

            var result = await _controller.Put(record);
            var getResult = await _controller.Get(record.RecordId);
            var actualRecord = (getResult as OkNegotiatedContentResult<ReturnModelDTO<RecordDTO>>).Content;

            Assert.IsInstanceOfType(result, typeof(OkResult));
            Assert.AreEqual(record.Name, actualRecord.Model.Name);
        }

        [TestMethod]
        public async Task Delete_ById_2()
        {
            const int id = 2;

            var result = await _controller.Delete(id);
            var getResult = await _controller.Get(id);

            Assert.IsInstanceOfType(result, typeof(OkResult));
            Assert.IsInstanceOfType(getResult, typeof(NotFoundResult));
        }
    }
}