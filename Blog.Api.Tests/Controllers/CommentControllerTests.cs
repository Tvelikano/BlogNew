using System.Linq;
using System.Security.Principal;
using System.Threading;
using System.Threading.Tasks;
using Blog.Api.Controllers;
using Blog.Services.Models;
using Blog.Tests.Initialize.EffortSetting;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Blog.Api.Tests.Controllers
{
    [TestClass]
    public class CommentControllerTests
    {
        private CommentController _controller;
        
        [TestInitialize]
        public void TestInitialize()
        {
            var identity = new GenericIdentity("Admin");
            Thread.CurrentPrincipal = new GenericPrincipal(identity, new[] { "Admin" });

            _controller = new CommentController(EffortProviderFactory.GetFakeRecordService());
        }

        [TestMethod]
        public void Get_ById_1()
        {
            const int id = 1;

            var comments = _controller.Get(id);

            Assert.AreNotEqual(null, comments);
            Assert.AreEqual(id, comments.Info);
        }

        [TestMethod]
        public async Task Post_4()
        {
            var comment = new CommentDTO { CommentId = 4, RecordId = 2,  Content = "4" };

            await _controller.Post(comment);
            var comments = _controller.Get(comment.RecordId);

            Assert.AreNotEqual(null, comments);
            Assert.AreEqual(comment, comments.List.First(c => c.CommentId == comment.CommentId));
        }
    }
}