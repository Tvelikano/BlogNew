using Microsoft.AspNet.Identity.EntityFramework;

using System.Collections.Generic;

namespace Blog.Data.Identity
{
    public class User : IdentityUser<int, UserLogin, UserRole, UserClaim>
    {
        public ICollection<Comment> Comments { get; set; }

        public ICollection<Record> Records { get; set; }
    }
}
