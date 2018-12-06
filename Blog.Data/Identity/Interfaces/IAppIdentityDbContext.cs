using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Blog.Data.Identity.Interfaces
{
    public interface IAppIdentityDbContext
    {
        IDbSet<User> Users { get; set; }
        IDbSet<IdentityRole> Roles { get; set; }
        bool RequireUniqueEmail { get; set; }
        Database Database { get; }
        DbContextConfiguration Configuration { get; }
        DbSet Set(Type entityType);
        int SaveChanges();
        Task<int> SaveChangesAsync();
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
        IEnumerable<DbEntityValidationResult> GetValidationErrors();
        DbEntityEntry Entry(object entity);
    }
}
