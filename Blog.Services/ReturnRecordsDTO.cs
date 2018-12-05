using System.Collections.Generic;

namespace Blog.Services
{
    public class ReturnRecordsDTO
    {
        public IEnumerable<RecordDTO> Records { get; set; }
        public int Count { get; set; }
    }
}
