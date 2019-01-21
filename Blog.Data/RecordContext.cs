using Blog.Data.Identity.Models;
using Blog.Data.Interfaces;
using Blog.Data.Models;

using Microsoft.AspNet.Identity.EntityFramework;

using System.Data.Common;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace Blog.Data
{
    public class RecordContext : IdentityDbContext<User, Role, int, UserLogin, UserRole, UserClaim>, IRecordContext
    {
        public virtual DbSet<Record> Records { get; set; }

        public virtual DbSet<Comment> Comments { get; set; }

        public virtual DbSet<AdminUser> AdminUsers { get; set; }

        public virtual DbSet<UserLogin> UserLogins { get; set; }

        public virtual DbSet<UserClaim> UserClaims { get; set; }

        public virtual DbSet<UserRole> UserRoles { get; set; }

        public RecordContext() : base("RecordsDataBase")
        {

        }

        public RecordContext(string nameOrConnectionString)
            : base(nameOrConnectionString)
        {
            Configuration.LazyLoadingEnabled = false;
        }

        public RecordContext(DbConnection connection)
            : base(connection, true)
        {
            Configuration.LazyLoadingEnabled = false;
        }

        public static RecordContext Create()
        {
            return new RecordContext();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();

            modelBuilder.Entity<Record>().ToTable("Record");
            modelBuilder.Entity<Comment>().ToTable("Comment");
            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<AdminUser>().HasKey(u => u.UserId);
            modelBuilder.Entity<AdminUser>().ToTable("AdminUser");
            modelBuilder.Entity<User>().Property(u => u.PasswordHash).HasMaxLength(500);
            modelBuilder.Entity<User>().Property(u => u.PhoneNumber).HasMaxLength(50);

            modelBuilder.Entity<Role>().ToTable("Role");
            modelBuilder.Entity<UserRole>().ToTable("UserRole");
            modelBuilder.Entity<UserLogin>().ToTable("UserLogin");
            modelBuilder.Entity<UserClaim>().ToTable("UserClaim");
            modelBuilder.Entity<UserClaim>().Property(u => u.ClaimType).HasMaxLength(150);
            modelBuilder.Entity<UserClaim>().Property(u => u.ClaimValue).HasMaxLength(500);
        }
    }
}
