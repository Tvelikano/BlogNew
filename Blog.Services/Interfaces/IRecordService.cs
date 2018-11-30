using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Blog.Services.Interfaces
{
    public interface IRecordService
    {
        IEnumerable<RecordDTO> GetAll();

        IEnumerable<RecordDTO> GetAll(bool isAuthenticated, string searchString, int page, int pageSize, out int count);

        Task<RecordDTO> FindById(int? id);

        Task Insert(RecordDTO record);

        Task Update(RecordDTO record);

        Task Delete(RecordDTO record);

        Task Delete(int id);
    }
}