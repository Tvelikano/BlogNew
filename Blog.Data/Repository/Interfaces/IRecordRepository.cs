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
            Expression<Func<Record, dynamic>> orderBy = null,
            params Expression<Func<IQueryable<Record>, object>>[] navigations);

        Task<Record> GetById(object id);

        Task Insert(Record entityToInsert);

        Task Delete(Record entityToDelete);

        Task Update(Record entityToUpdate);

        Task Save();
    }
}
