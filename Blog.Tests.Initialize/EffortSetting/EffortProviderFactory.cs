using Blog.Data;
using Blog.Data.Identity;
using Blog.Data.Interfaces;
using Blog.Data.Models;
using System;
using System.Data.Common;
using System.Data.Entity.Infrastructure;

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

            model.Users.Add(
                new User
                {
                    Id = 1,
                    UserName = "Admin",
                    Email = "Admin",
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

            model.Comments.Add(new Comment
            {
                CommentId = 1,
                Content = "1",
                CreateDate = DateTime.Now,
                RecordId = 1,
                UserId = 1
            });

            model.SaveChanges();

            return model;
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
