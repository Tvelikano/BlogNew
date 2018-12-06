using System.Threading.Tasks;

namespace Blog.Services.Interfaces
{
    public interface IRecordService
    {
        ListRecordsDTO GetAll(GetAllRecordsArgsDTO recordsArgsDto);

        Task<RecordDTO> FindById(int id, bool isWithComments = false);

        Task Insert(RecordDTO record);

        Task Update(RecordDTO record);

        Task Delete(RecordDTO record);

        Task Delete(int id);

        Task InsertComment(CommentDTO comment);
    }
}