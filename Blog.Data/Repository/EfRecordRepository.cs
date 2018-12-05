using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Blog.Data.Interfaces;
using Blog.Data.Repository.Interfaces;

namespace Blog.Data.Repository
{
    public class EfRecordRepository : IRecordRepository
    {
        private readonly IRecordContext _context;
        private readonly DbSet<Record> _records;

        public EfRecordRepository(IRecordContext context)
        {
            _context = context;
            _records = _context.Records;
        }

        public IEnumerable<Record> Get(
            Expression<Func<Record, bool>> filter = null,
            Expression<Func<Record, dynamic>> orderBy = null,
            params Expression<Func<IQueryable<Record>, object>>[] navigations)
        {
            IQueryable<Record> query = _records;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            if (orderBy != null)
            {
                query = query.OrderBy(orderBy);
            }

            query = navigations.Aggregate(query, (current, par) => (IQueryable<Record>)par.Compile().Invoke(current));
            
            return query;
        }

        public async Task<Record> GetById(object id)
        {
            return await _records.FindAsync(id);
        }

        public async Task Insert(Record entityToInsert)
        {
            _records.Add(entityToInsert);

            await Save();
        }

        public async Task Delete(Record entityToDelete)
        {
            if (_context.Entry(entityToDelete).State == EntityState.Detached)
            {
                _records.Attach(entityToDelete);
            }

            _records.Remove(entityToDelete);

            await Save();
        }

        public async Task Update(Record entityToUpdate)
        {
            _records.Attach(entityToUpdate);

            _context.Entry(entityToUpdate).State = EntityState.Modified;

            await Save();
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }
    }
}
