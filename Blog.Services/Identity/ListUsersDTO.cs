using System.Collections.Generic;

namespace Blog.Services.Identity
{
    public class ListUsersDTO
    {
        public IList<UserDTO> Users { get; set; }
        public int Count { get; set; }
    }
}
