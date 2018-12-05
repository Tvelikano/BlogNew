using System.Collections.Generic;

namespace Blog.Data
{
    public class ReturnRecords
    {
        public IEnumerable<Record> Records { get; set; }
        public int Count { get; set; }
    }
}
