using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Blog.Data
{
    public class EfRecordRepository : IRecordRepository
    {
        private readonly RecordContext _context = new RecordContext();
        private DbSet<Record> Records => _context.Records;
        public IEnumerable<Record> Get(
            Expression<Func<Record, bool>> filter = null,
            Func<IQueryable<Record>, IOrderedQueryable<Record>> orderBy = null,
            string includeProperties = "")
        {
            IQueryable<Record> query = Records;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            query = includeProperties
                .Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries)
                    .Aggregate(query, (current, includeProperty) => current.Include(includeProperty));

            return orderBy != null ? orderBy(query) : query;
        }

        public async Task<Record> GetById(object id)
        {
            return await Records.FindAsync(id);
        }

        public async Task Insert(Record entityToInsert)
        {
            Records.Add(entityToInsert);
            await Save();
        }

        public async Task Delete(Record entityToDelete)
        {
            if (_context.Entry(entityToDelete).State == EntityState.Detached)
            {
                Records.Attach(entityToDelete);
            }
            Records.Remove(entityToDelete);
            await Save();
        }

        public async Task Update(Record entityToUpdate)
        {
            Records.Attach(entityToUpdate);
            _context.Entry(entityToUpdate).State = EntityState.Modified;
            await Save();
        }
        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }
    }
}
