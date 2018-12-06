using System;
using System.Linq.Expressions;

namespace Blog.Services.Identity
{
    public class GetAllUsersArgsDTO
    {
        public string SearchString { get; set; }

        public Expression<Func<UserDTO, object>> OrderBy { get; set; }

        public int Page { get; set; }

        public int PageSize { get; set; }
    }
}
