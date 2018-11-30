using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Blog.Data.Repository.Interfaces
{
    public interface IRecordRepository
    {
        IEnumerable<Record> Get(
            Expression<Func<Record, bool>> filter = null,
            Func<IQueryable<Record>, IOrderedQueryable<Record>> orderBy = null,
            Func<IQueryable<Record>, IQueryable<Record>> param = null);

        Task<Record> GetById(object id);

        Task Insert(Record entityToInsert);

        Task Delete(Record entityToDelete);

        Task Update(Record entityToUpdate);

        Task Save();
    }
}
