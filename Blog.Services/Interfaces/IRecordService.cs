using System.Collections.Generic;
using System.Threading.Tasks;

namespace Blog.Services.Interfaces
{
    public interface IRecordService
    {
        IEnumerable<RecordDTO> GetAll();

        (IEnumerable<RecordDTO>, int) GetAll(GetAllArgs args);

        Task<RecordDTO> FindById(int? id);

        Task Insert(RecordDTO record);

        Task Update(RecordDTO record);

        Task Delete(RecordDTO record);

        Task Delete(int id);
    }
}