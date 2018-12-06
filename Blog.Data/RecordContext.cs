using System.Data.Entity;
using Blog.Data.Interfaces;

namespace Blog.Data
{
    public class RecordContext : DbContext, IRecordContext
    {
        public DbSet<Record> Records { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public RecordContext() : base("RecordsDataBase")
        {

        }
    }
}
