using Blog.Services;
using System.Collections.Generic;

namespace Blog.Site.Models
{
    public class RecordListViewModel
    {
        public IEnumerable<RecordDTO> Records { get; set; }
        public PagingInfo PageInfo { get; set; }
        public string SearchString { get; set; }
    }
}