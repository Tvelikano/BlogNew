using System.Collections.Generic;

namespace Blog.Data
{
    public class ListRecords
    {
        public IEnumerable<ReturnRecord> Records { get; set; }

        public int Count { get; set; }
    }
}
