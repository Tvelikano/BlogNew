using Blog.Data.Enums;
using Blog.Data.Interfaces;
using Blog.Data.Repository.Interfaces;
using System.Collections.Generic;
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

        public ReturnList<ReturnModel<Record>> Get(GetArgs<Record> args)
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
                query = args.Descending ?
                    query.OrderByDescending(args.OrderBy) :
                    query.OrderBy(args.OrderBy);
            }

            var count = query.Count();

            if (args.Page > 0 && args.PageSize > 0)
            {
                query = query.Skip(args.PageSize * (args.Page - 1)).Take(args.PageSize);
            }

            return new ReturnList<ReturnModel<Record>>
            {
                List = query.Include(r => r.Comments).Select(r => new ReturnModel<Record>
                {
                    Model = r,
                    Info = r.Comments.Count()
                }).ToList(),
                Count = count
            };
        }

        public IEnumerable<Record> GetAll()
        {
            IQueryable<Record> query = _records;

            return query.ToList();
        }

        public async Task<Record> GetById(int id)
        {
            return await _records.FindAsync(id);
        }

        public async Task Insert(Record entityToInsert)
        {
            _records.Add(entityToInsert);

            await Save();
        }

        public async Task Delete(int id)
        {
            _context.Entry(await GetById(id)).State = EntityState.Deleted;

            await Save();
        }

        public async Task Update(Record entityToUpdate)
        {
            _records.Attach(entityToUpdate);

            _context.Entry(entityToUpdate).State = EntityState.Modified;

            await Save();
        }
        public ReturnList<Comment> GetCommentsById(int recordId)
        {
            var query = _comments.Where(c => c.RecordId == recordId).OrderByDescending(c => c.CreateDate).Include(c => c.User).ToList();

            return new ReturnList<Comment>
            {
                List = query,
                Count = query.Count(),
                Info = recordId
            };
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
