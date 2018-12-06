using System.Threading.Tasks;

namespace Blog.Data.Repository.Interfaces
{
    public interface IRecordRepository
    {
        ListRecords Get(GetAllRecordsArgs recordsArgs);

        Task<Record> GetById(int id);

        Record GetByIdWithComment(int id);

        Task Insert(Record entityToInsert);

        Task Delete(Record entityToDelete);

        Task Update(Record entityToUpdate);

        Task InsertComment(Comment entityToInsert);

        Task Save();
    }
}
