using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Blog.Services;

namespace Blog.Site.Models
{
    public class UserViewModel
    {
        public string Id { get; set; }

        [Required]
        [Display(Name = "Name")]
        public string UserName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [Compare("Password", ErrorMessage = "Passwords not match")]
        [DataType(DataType.Password)]
        public string PasswordConfirm { get; set; }

        public string[] Roles { get; set; }
    }
}