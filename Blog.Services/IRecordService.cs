using System.Collections.Generic;
using System.Threading.Tasks;

namespace Blog.Services
{
    public interface IRecordService
    {
        IEnumerable<RecordDTO> GetAll();
        Task<RecordDTO> FindById(int? id);
        Task Insert(RecordDTO record);
        Task Update(RecordDTO record);
        Task Delete(RecordDTO record);
        Task Delete(int id);
    }
}