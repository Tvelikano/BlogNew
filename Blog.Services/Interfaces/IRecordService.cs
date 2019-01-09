using System.Threading.Tasks;
using Blog.Services.Models;

namespace Blog.Services.Interfaces
{
    public interface IRecordService
    {
        ReturnListDTO<ReturnModelDTO<RecordDTO>> GetAll(GetArgsDTO<RecordDTO> recordsArgsDto);

        Task<RecordDTO> FindById(int id);

        Task Insert(RecordDTO record);

        Task Update(RecordDTO record);
        
        Task Delete(int id);

        Task InsertComment(CommentDTO comment);

        ReturnListDTO<CommentDTO> FindCommentsById(int recordId);
    }
}