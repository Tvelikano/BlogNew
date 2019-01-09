using Blog.Data.Models;
using Blog.Data.Repository;
using Blog.Tests.Initialize.EffortSetting;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Data.Tests
{
    [TestClass]
    public class EfRecordRepositoryTests
    {
        private EfRecordRepository _repository;

        [AssemblyInitialize]
        public static void AssemblyInit(TestContext context)
        {
            Effort.Provider.EffortProviderConfiguration.RegisterProvider();
        }

        [TestInitialize]
        public void TestInitialize()
        {
            _repository = new EfRecordRepository(EffortProviderFactory.GetFakeContext());
        }

        [TestMethod]
        public void Get_AllRecords()
        {
            List<Record> records = null;

            records = _repository.GetAll().ToList();

            Assert.AreNotEqual(null, records);
            Assert.AreEqual(3, records.Count);
            Assert.AreEqual(1, records.ToList()[0].RecordId);
        }

        [TestMethod]
        public void Get_RecordsByArgs()
        {
            var getArgs = new GetArgs<Record>
            {
                IsAdmin = true,
                OrderBy = r => r.CreateDate.ToString(),
                Page = 1,
                PageSize = 2
            };

            var records = _repository.Get(getArgs);

            Assert.AreEqual(3, records.Count);
            Assert.AreEqual(2, records.List.Count);
        }

        [TestMethod]
        public async Task Get_RecordById_2()
        {
            const int id = 2;

            var record = await _repository.GetById(id);

            Assert.AreNotEqual(null, record);
            Assert.AreEqual(id, record.RecordId);
        }

        [TestMethod]
        public async Task Insert_Record_4()
        {
            var record = new Record { RecordId = 4, Name = "4", Content = "4", UserId = 1 };

            await _repository.Insert(record);
            var records = _repository.GetAll().ToList();

            Assert.AreEqual(4, records.Count);
        }

        [TestMethod]
        public async Task Update_Record_2()
        {
            var record = new Record { RecordId = 2, Name = "222", Content = "2", UserId = 1 };

            await _repository.Update(record);
            var actualRecord = await _repository.GetById(record.RecordId);

            Assert.AreEqual(record.Name, actualRecord.Name);
        }

        [TestMethod]
        public async Task Delete_RecordById_2()
        {
            const int id = 2;

            await _repository.Delete(id);
            var records = _repository.GetAll().ToList();

            Assert.AreEqual(2, records.Count);
        }

        [TestMethod]
        public void Get_CommentsById_1()
        {
            const int recordId = 1;

            var comments = _repository.GetCommentsById(recordId);

            Assert.AreEqual(1, comments.Count);
        }

        [TestMethod]
        public async Task Insert_Comment_2()
        {
            var comment = new Comment
            {
                CommentId = 2,
                Content = "1",
                CreateDate = DateTime.Now,
                RecordId = 1,
                UserId = 1
            };

            await _repository.InsertComment(comment);
            var comments = _repository.GetCommentsById(comment.RecordId);

            Assert.AreEqual(2, comments.Count);
        }
    }
}
