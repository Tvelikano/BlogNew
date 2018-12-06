using System;
using System.Linq.Expressions;
using Blog.Data;

namespace Blog.Services
{
    public struct GetAllArgsDTO
    {
        public bool IsAdmin { get; set; }

        public bool IsAuthenticated { get; set; }

        public string SearchString { get; set; }

        public Expression<Func<RecordDTO, object>> OrderBy { get; set; }

        public int Page { get; set; }

        public int PageSize { get; set; }
    }
}
