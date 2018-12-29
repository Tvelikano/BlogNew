using Blog.Data.Identity;
using Blog.Data.Interfaces;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace Blog.Data
{
    public class RecordContext : IdentityDbContext<User, Role, int, UserLogin, UserRole, UserClaim>, IRecordContext
    {
        public DbSet<Record> Records { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<UserLogin> UserLogins { get; set; }

        public DbSet<UserClaim> UserClaims { get; set; }

        public DbSet<UserRole> UserRoles { get; set; }

        public RecordContext() : base("RecordsDataBase")
        {

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

            modelBuilder.Entity<User>().ToTable("User");
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
