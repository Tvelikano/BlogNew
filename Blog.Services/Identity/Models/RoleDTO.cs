using System.ComponentModel.DataAnnotations;

namespace Blog.Services.Identity.Models
{
    public class RoleDTO
    {
        public int Id { get; set; }

        [Required]
        [MinLength(4)]
        public string Name { get; set; }
    }
}
