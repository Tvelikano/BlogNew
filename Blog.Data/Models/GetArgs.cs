using System;
using System.Linq.Expressions;

namespace Blog.Data.Models
{
    public struct GetArgs<T>
    {
        public bool IsAdmin { get; set; }

        public bool IsAuthenticated { get; set; }

        public string SearchString { get; set; }

        public Expression<Func<T, object>> OrderBy { get; set; }

        public bool Descending { get; set; }
        
        public int Page { get; set; }

        public int PageSize { get; set; }
    }
}
