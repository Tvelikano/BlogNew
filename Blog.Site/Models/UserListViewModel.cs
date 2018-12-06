using System.Collections.Generic;

namespace Blog.Site.Models
{
    public class UserListViewModel
    {
        public IEnumerable<UserViewModel> Users { get; set; }

        public PagingInfo PageInfo { get; set; }

        public string SearchString { get; set; }
    }
}