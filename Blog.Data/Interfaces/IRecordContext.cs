using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Threading.Tasks;

namespace Blog.Data.Interfaces
{
    public interface IRecordContext
    {
        DbSet<Record> Records { get; set; }

        DbSet<Comment> Comments{ get; set; }

        DbSet Set(Type entityType);

        Task<int> SaveChangesAsync();

        DbEntityEntry Entry(object entity);
    }
}
