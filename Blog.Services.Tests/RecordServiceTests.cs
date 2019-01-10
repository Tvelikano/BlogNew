using Blog.Services.Models;
using Blog.Tests.Initialize.EffortSetting;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Threading.Tasks;

namespace Blog.Services.Tests
{
    [TestClass]
    public class RecordServiceTests
    {
        private RecordService _service;

        [AssemblyInitialize]
        public static void AssemblyInit(TestContext context)
        {
            Effort.Provider.EffortProviderConfiguration.RegisterProvider();
        }

        [TestInitialize]
        public void TestInitialize()
        {
            _service = new RecordService(
                EffortProviderFactory.GetFakeRecordRepository(),
                EffortProviderFactory.GetFakeServiceAutoMapper()
                );
        }

        [TestMethod]
        public void Get_RecordsByArgs()
        {
            var getArgs = new GetArgsDTO<RecordDTO>
            {
                IsAdmin = true,
                OrderBy = r => r.CreateDate.ToString(),
                Page = 1,
                PageSize = 2
            };

            var records = _service.GetAll(getArgs);

            Assert.AreEqual(3, records.Count);
            Assert.AreEqual(2, records.List.Count);
        }

        [TestMethod]
        public async Task Get_RecordById_2()
        {
            const int id = 2;

            var record = await _service.GetById(id);

            Assert.AreNotEqual(null, record);
            Assert.AreEqual(id, record.RecordId);
        }

        [TestMethod]
        public async Task Insert_Record_4()
        {
            var record = new RecordDTO { RecordId = 4, Name = "4", Content = "4", UserId = 1 };

            await _service.Insert(record);
            var actualRecord = await _service.GetById(record.RecordId);

            Assert.AreNotEqual(null, actualRecord);
            Assert.AreEqual(record.RecordId, actualRecord.RecordId);
        }

        [TestMethod]
        public async Task Update_Record_2()
        {
            var record = new RecordDTO { RecordId = 2, Name = "222", Content = "2", UserId = 1 };

            await _service.Update(record);
            var actualRecord = await _service.GetById(record.RecordId);

            Assert.AreEqual(record.Name, actualRecord.Name);
        }

        [TestMethod]
        public async Task Delete_RecordById_2()
        {
            const int id = 2;

            await _service.Delete(id);
            var record = await _service.GetById(id);

            Assert.AreEqual(null, record);
        }

        [TestMethod]
        public void Get_CommentsById_1()
        {
            const int recordId = 1;

            var comments = _service.GetCommentsById(recordId);

            Assert.AreEqual(3, comments.Count);
        }

        [TestMethod]
        public async Task Insert_Comment_2()
        {
            var comment = new CommentDTO
            {
                CommentId = 2,
                Content = "1",
                CreateDate = DateTime.Now,
                RecordId = 1,
                UserId = 1
            };

            await _service.InsertComment(comment);
            var comments = _service.GetCommentsById(comment.RecordId);

            Assert.AreEqual(4, comments.Count);
        }
    }
}