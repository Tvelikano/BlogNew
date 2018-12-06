using System;
using System.Linq.Expressions;

namespace Blog.Data
{
    public struct GetAllRecordsArgs
    {
        public bool IsAdmin { get; set; }

        public bool IsAuthenticated { get; set; }

        public string SearchString { get; set; }

        public Expression<Func<Record, object>> OrderBy { get; set; }

        public int Page { get; set; }

        public int PageSize { get; set; }
    }
}
