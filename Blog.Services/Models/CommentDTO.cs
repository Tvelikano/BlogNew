using Blog.Services.Identity.Models;
using System;
using System.ComponentModel.DataAnnotations;

namespace Blog.Services.Models
{
    public class CommentDTO
    {
        public int CommentId { get; set; }

        [Required]
        public string Content { get; set; }

        public DateTime CreateDate { get; set; }

        public int RecordId { get; set; }

        public RecordDTO Record { get; set; }

        public int UserId { get; set; }

        public UserDTO User { get; set; }
    }
}
