using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Blog.Data.Repository.Interfaces;

namespace Blog.Data.Repository
{
    public class EfRecordRepository : IRecordRepository
    {
        private readonly RecordContext _context = new RecordContext();

        private DbSet<Record> Records => _context.Records;

        public IEnumerable<Record> Get(
            Expression<Func<Record, bool>> filter = null,
            Func<IQueryable<Record>, IOrderedQueryable<Record>> orderBy = null,
            Func<IQueryable<Record>, IQueryable<Record>> param = null)
        {
            IQueryable<Record> query = Records;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            if (orderBy != null)
            {
                query = orderBy.Invoke(query);
            }

            if (param != null)
            {
                query = param.Invoke(query);
            }

            return query;
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
