using System.Threading.Tasks;

namespace Blog.Services.Interfaces
{
    public interface IRecordService
    {
        ReturnRecordsDTO GetAll(GetAllArgsDTO argsDto);

        Task<RecordDTO> FindById(int? id);

        Task Insert(RecordDTO record);

        Task Update(RecordDTO record);

        Task Delete(RecordDTO record);

        Task Delete(int id);
    }
}