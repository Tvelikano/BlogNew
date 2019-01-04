using System.ComponentModel.DataAnnotations;

namespace Blog.Api.Models
{
    public class RegisterViewModel
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [Compare("Password", ErrorMessage = "Passwords not match")]
        [DataType(DataType.Password)]
        public string PasswordConfirm { get; set; }
    }
}