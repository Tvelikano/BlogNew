using AutoMapper;
using Blog.Data;
using Blog.Data.Identity;
using Blog.Data.Identity.Interfaces;
using Blog.Data.Identity.Models;
using Blog.Data.Interfaces;
using Blog.Data.Models;
using Blog.Data.Repository;
using Blog.Data.Repository.Interfaces;
using Blog.Services;
using Blog.Services.Identity;
using Blog.Services.Identity.Interfaces;
using Blog.Services.Identity.Models;
using Blog.Services.Interfaces;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Data.Common;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;
using Blog.Api.Models;
using Microsoft.Owin.Security;

namespace Blog.Tests.Initialize.EffortSetting
{
    public class EffortProviderFactory : IDbConnectionFactory
    {
        private static DbConnection _connection;
        private static readonly object Lock = new object();

        public static void ResetDb()
        {
            lock (Lock)
            {
                _connection = null;
            }
        }

        public static IRecordContext GetFakeContext()
        {
            ResetDb();

            var model = new RecordContext();

            model.Roles.Add(
                new Role { Id = 1, Name = "Admin" });

            model.Roles.Add(
                new Role { Id = 2, Name = "User" });

            model.Roles.Add(
                new Role { Id = 3, Name = "Manager" });

            model.Users.Add(
                new User
                {
                    Id = 1,
                    UserName = "Admin",
                    Email = "Admin@mail.com",
                    EmailConfirmed = false,
                    PhoneNumberConfirmed = false,
                    TwoFactorEnabled = false,
                    LockoutEnabled = false,
                    AccessFailedCount = 0
                });

            model.Users.Add(
                new User
                {
                    Id = 2,
                    UserName = "User",
                    Email = "User@mail.com",
                    EmailConfirmed = false,
                    PhoneNumberConfirmed = false,
                    TwoFactorEnabled = false,
                    LockoutEnabled = false,
                    AccessFailedCount = 0
                });

            model.Users.Add(
                new User
                {
                    Id = 3,
                    UserName = "NewUser",
                    Email = "NewUser@mail.com",
                    EmailConfirmed = false,
                    PhoneNumberConfirmed = false,
                    TwoFactorEnabled = false,
                    LockoutEnabled = false,
                    AccessFailedCount = 0
                });

            model.Records.AddRange(new[]{
                new Record {RecordId = 1, Name = "1", Content = "1", UserId = 1},
                new Record {RecordId = 2, Name = "2", Content = "2", UserId = 1},
                new Record {RecordId = 3, Name = "3", Content = "3", UserId = 1}
            });

            model.Comments.AddRange(new[]{
                new Comment
                {
                    CommentId = 1,
                    Content = "1",
                    CreateDate = DateTime.Now,
                    RecordId = 1,
                    UserId = 1
                },
                new Comment
                {
                    CommentId = 2,
                    Content = "2",
                    CreateDate = DateTime.Now,
                    RecordId = 1,
                    UserId = 1
                },
                new Comment
                {
                    CommentId = 3,
                    Content = "3",
                    CreateDate = DateTime.Now,
                    RecordId = 1,
                    UserId = 1
                }
            });

            model.SaveChanges();

            return model;
        }

        public static IRecordRepository GetFakeRecordRepository()
        {
            return new EfRecordRepository(GetFakeContext());
        }

        public static IUserStore<User, int> GetFakeUserStore()
        {
            return new AppUserStore(GetFakeContext());
        }

        public static IRoleStore<Role, int> GetFakeRoleStore()
        {
            return new AppRoleStore(GetFakeContext());
        }

        public static IAppUserManager GetFakeUserManager()
        {
            var userManager = new AppUserManager(GetFakeUserStore());

            userManager.AddPassword(1, "123456");
            userManager.AddPassword(2, "123456");
            userManager.AddPassword(3, "123456");

            return userManager;
        }

        public static IAppRoleManager GetFakeRoleManager()
        {
            return new AppRoleManager(GetFakeRoleStore());
        }

        public static IUnitOfWork GetFakeUnitOfWork()
        {
            return new IdentityUnitOfWork(GetFakeContext(), GetFakeUserManager(), GetFakeRoleManager());
        }

        public static IUserService<UserDTO, RoleDTO> GetFakeUserService()
        {
            return new UserService<UserDTO, RoleDTO>(GetFakeUnitOfWork(), GetFakeServiceAutoMapper(), GetFakeServiceAutoMapper());
        }

        public static IMapper GetFakeServiceAutoMapper()
        {
            var conf = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<User, UserDTO>().ForMember(dest => dest.Roles, src => src.MapFrom(o => o.Roles.Select(r => r.RoleId)));

                cfg.CreateMap<IdentityUserRole, string>().ConvertUsing(src => src.RoleId);

                cfg.CreateMap<RoleDTO, Role>().ForMember(dest => dest.Users, src => src.Ignore());
            });

            return new Mapper(conf);
        }

        public static IRuntimeMapper GetFakeSiteAutoMapper()
        {
            var conf = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<RegisterViewModel, UserDTO>()
                    .ForMember(dest => dest.Id, source => source.Ignore())
                    .ForMember(dest => dest.Roles, source => source.Ignore());

                cfg.CreateMap<LoginViewModel, UserDTO>()
                    .ForMember(dest => dest.Id, source => source.Ignore());

                cfg.CreateMap<UserDTO, UserViewModel>()
                    .ForMember(dest => dest.PasswordConfirm, source => source.Ignore());
            });

            return new Mapper(conf);
        }

        public static IAuthenticationManager GetFakeAuthenticationManager()
        {
            return HttpContext.Current.GetOwinContext().Authentication;
        }

        public static IRecordService GetFakeRecordService()
        {
            return new RecordService(GetFakeRecordRepository(), GetFakeServiceAutoMapper());
        }

        public DbConnection CreateConnection(string nameOrConnectionString)
        {
            lock (Lock)
            {
                return _connection ?? (_connection = Effort.DbConnectionFactory.CreateTransient());
            }
        }
    }
}
