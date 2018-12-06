using Blog.Data.Enums;
using Blog.Data.Interfaces;
using Blog.Data.Repository.Interfaces;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Data.Repository
{
    public class EfRecordRepository : IRecordRepository
    {
        private readonly IRecordContext _context;
        private readonly DbSet<Record> _records;
        private readonly DbSet<Comment> _comments;

        public EfRecordRepository(IRecordContext context)
        {
            _context = context;
            _records = _context.Records;
            _comments = _context.Comments;
        }

        public ListRecords Get(GetAllRecordsArgs recordsArgs)
        {
            IQueryable<Record> query = _records;

            if (!recordsArgs.IsAdmin)
            {
                query = recordsArgs.IsAuthenticated ?
                    query.Where(r => r.State != RecordState.Private) :
                    query.Where(r => r.State == RecordState.Public);
            }

            if (!string.IsNullOrEmpty(recordsArgs.SearchString))
            {
                query = query.Where(r => r.Name.Contains(recordsArgs.SearchString));
            }

            if (recordsArgs.OrderBy != null)
            {
                query = query.OrderBy(recordsArgs.OrderBy);
            }

            var count = query.Count();

            if (recordsArgs.Page > 0 && recordsArgs.PageSize > 0)
            {
                query = query.Skip(recordsArgs.PageSize * (recordsArgs.Page - 1)).Take(recordsArgs.PageSize);
            }

            return new ListRecords
            {
                Records = query.Include(r => r.Comments).Select(r => new ReturnRecord
                {
                    Record = r,
                    CommentsCount = r.Comments.Count
                }),
                Count = count
            };
        }

        public async Task<Record> GetById(int id)
        {
            return await _records.FindAsync(id);
        }

        public Record GetByIdWithComment(int id)
        {
            return _records.Include(n => n.Comments).Single(r => r.RecordId == id);
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

        public async Task InsertComment(Comment entityToInsert)
        {
            _comments.Add(entityToInsert);

            await Save();
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }
    }
}
