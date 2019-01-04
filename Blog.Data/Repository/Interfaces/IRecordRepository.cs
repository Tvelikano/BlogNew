using System.Threading.Tasks;

namespace Blog.Data.Repository.Interfaces
{
    public interface IRecordRepository
    {
        ReturnList<ReturnModel<Record>> Get(GetArgs<Record> args);

        Task<Record> GetById(int id);

        Task Insert(Record entityToInsert);

        Task Delete(int id);

        Task Update(Record entityToUpdate);

        Task InsertComment(Comment entityToInsert);

        ReturnList<Comment> GetCommentsById(int recordId);

        Task Save();
    }
}
