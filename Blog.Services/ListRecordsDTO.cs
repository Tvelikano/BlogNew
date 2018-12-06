using System.Collections.Generic;

namespace Blog.Services
{
    public class ListRecordsDTO
    {
        public IEnumerable<ReturnRecordDTO> Records { get; set; }

        public int Count { get; set; }
    }
}
