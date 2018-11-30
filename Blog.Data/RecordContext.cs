using System.Data.Entity;

namespace Blog.Data
{
    internal class RecordContext : DbContext
    {
        public DbSet<Record> Records { get; set; }

        public RecordContext() : base("RecordsDataBase")
        {

        }
    }
}
