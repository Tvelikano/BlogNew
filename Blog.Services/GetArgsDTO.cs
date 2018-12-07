using System;
using System.Linq.Expressions;

namespace Blog.Services
{
    public struct GetArgsDTO<T>
    {
        public bool IsAdmin { get; set; }

        public bool IsAuthenticated { get; set; }

        public string SearchString { get; set; }

        public Expression<Func<T, object>> OrderBy { get; set; }

        public int Page { get; set; }

        public int PageSize { get; set; }
    }
}
