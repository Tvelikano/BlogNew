using System.Threading.Tasks;
using Blog.Data.Models;

namespace Blog.Data.Repository.Interfaces
{
    public interface IRecordRepository
    {
        ReturnList<ReturnModel<Record>> Get(GetArgs<Record> args);

        Task<ReturnModel<Record>> GetById(int id);

        Task<int> Insert(Record entityToInsert);

        Task Delete(int id);

        Task Update(Record entityToUpdate);

        Task InsertComment(Comment entityToInsert);

        ReturnList<Comment> GetCommentsById(int recordId);

        Task Save();
    }
}
