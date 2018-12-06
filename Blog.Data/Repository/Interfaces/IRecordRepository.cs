using System.Threading.Tasks;

namespace Blog.Data.Repository.Interfaces
{
    public interface IRecordRepository
    {
        ReturnRecords Get(GetAllArgs args);

        Task<Record> GetById(object id);

        Task Insert(Record entityToInsert);

        Task Delete(Record entityToDelete);

        Task Update(Record entityToUpdate);

        Task Save();
    }
}
