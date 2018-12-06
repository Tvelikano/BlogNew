using Blog.Data.Interfaces;
using Blog.Data.Repository.Interfaces;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Blog.Data.Enums;

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

        public ReturnRecords Get(GetAllArgs args)
        {
            IQueryable<Record> query = _records;

            if (!args.IsAdmin)
            {
                query = args.IsAuthenticated ?
                    query.Where(r => r.State != RecordState.Private) :
                    query.Where(r => r.State == RecordState.Public);
            }
            
            if (!string.IsNullOrEmpty(args.SearchString))
            {
                query = query.Where(r => r.Name.Contains(args.SearchString));
            }

            if (args.OrderBy != null)
            {
                query = query.OrderBy(args.OrderBy);
            }
            
            var count = query.Count();

            if (args.Page > 0 && args.PageSize > 0)
            {
                query = query.Skip(args.PageSize * (args.Page - 1)).Take(args.PageSize);
            }

            return new ReturnRecords
            {
                Records = query,
                Count = count
            };
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
