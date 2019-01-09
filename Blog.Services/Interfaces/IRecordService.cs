using Blog.Services.Models;
using System.Threading.Tasks;

namespace Blog.Services.Interfaces
{
    public interface IRecordService
    {
        ReturnListDTO<ReturnModelDTO<RecordDTO>> GetAll(GetArgsDTO<RecordDTO> recordsArgsDto);

        Task<RecordDTO> GetById(int id);

        Task Insert(RecordDTO record);

        Task Update(RecordDTO record);

        Task Delete(int id);

        Task InsertComment(CommentDTO comment);

        ReturnListDTO<CommentDTO> GetCommentsById(int recordId);
    }
}