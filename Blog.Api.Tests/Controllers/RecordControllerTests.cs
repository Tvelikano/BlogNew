﻿using AutoMapper;
using Blog.Api.Controllers;
using Blog.Api.Models;
using Blog.Data.Identity;
using Blog.Data.Repository;
using Blog.Services;
using Blog.Services.Identity;
using Blog.Services.Models;
using Blog.Tests.Initialize.EffortSetting;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Linq;
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
            var repository = new Mock<EfRecordRepository>(EffortProviderFactory.GetFakeContext());

            var conf = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<User, UserDTO>().ForMember(dest => dest.Roles, src => src.MapFrom(o => o.Roles.Select(r => r.RoleId)));

                cfg.CreateMap<IdentityUserRole, string>().ConvertUsing(src => src.RoleId);

                cfg.CreateMap<RoleDTO, Role>().ForMember(dest => dest.Users, src => src.Ignore());
            });

            var mapper = new Mapper(conf);

            var service = new RecordService(repository.Object, mapper);

            var identity = new GenericIdentity("Admin");
            Thread.CurrentPrincipal = new GenericPrincipal(identity, new[] { "Admin" });

            _controller = new RecordController(service);
        }

        [TestMethod]
        public async Task Get_ById_2()
        {
            const int id = 2;

            var record = await _controller.Get(id);

            Assert.AreNotEqual(null, record);
            Assert.AreEqual(id, record.RecordId);
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
            var actualRecord = await _controller.Get(record.RecordId);

            Assert.AreNotEqual(null, actualRecord);
            Assert.AreEqual(record.RecordId, actualRecord.RecordId);
        }

        [TestMethod]
        public async Task PutTest()
        {
            var record = new RecordDTO { RecordId = 2, Name = "222", Content = "2", UserId = 1 };

            var result = await _controller.Put(record);
            var actualRecord = await _controller.Get(record.RecordId);

            Assert.IsInstanceOfType(result, typeof(OkResult));
            Assert.AreEqual(record.Name, actualRecord.Name);
        }

        [TestMethod]
        public async Task Delete_ById_2()
        {
            const int id = 2;

            var result = await _controller.Delete(id);
            var record = await _controller.Get(id);

            Assert.IsInstanceOfType(result, typeof(OkResult));
            Assert.AreEqual(null, record);
        }
    }
}