using Blog.Data.Enums;
using Blog.Data.Interfaces;
using Blog.Data.Models;
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
        private readonly DbSet<AdminUser> _adminUsers;

        public EfRecordRepository(IRecordContext context)
        {
            _context = context;
            _records = _context.Records;
            _comments = _context.Comments;
            _adminUsers = _context.AdminUsers;
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

        public IEnumerable<AdminUser> GetAllAdminUsers()
        {
            IQueryable<AdminUser> query = _adminUsers;

            return query.ToList();
        }

        public async Task<ReturnModel<Record>> GetById(int id)
        {
            var record = await _records.Include(r => r.Comments).FirstOrDefaultAsync(r => r.RecordId == id);
            if (record == null)
            {
                return null;
            }

            var model = new ReturnModel<Record> { Model = record, Info = record.Comments.Count };

            return model;

        }

        public async Task<int> Insert(Record entityToInsert)
        {
            _records.Add(entityToInsert);

            await Save();

            return entityToInsert.RecordId;
        }

        public async Task Delete(int id)
        {
            _context.Entry((await GetById(id)).Model).State = EntityState.Deleted;

            await Save();
        }

        public async Task Update(Record entityToUpdate)
        {
            var record = (await GetById(entityToUpdate.RecordId)).Model;

            if (record != null)
            {
                record.Name = entityToUpdate.Name;
                record.Content = entityToUpdate.Content;
                record.State = entityToUpdate.State;

                _context.Records.Attach(record);

                _context.Entry(record).State = EntityState.Modified;

                await Save();
            }
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
