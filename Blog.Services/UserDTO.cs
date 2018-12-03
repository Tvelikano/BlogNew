using System.Collections.Generic;

namespace Blog.Services
{
    public class UserDTO
    {
        public string Id { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string PasswordConfirm { get; set; }

        public string UserName { get; set; }

        public ICollection<RoleDTO> AppRoles { get; set; } = new List<RoleDTO>();
    }
}
