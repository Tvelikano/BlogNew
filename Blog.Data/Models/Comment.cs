using Blog.Data.Identity.Models;
using System;
using System.ComponentModel.DataAnnotations;

namespace Blog.Data.Models
{
    public class Comment
    {
        public int CommentId { get; set; }

        [Required]
        public string Content { get; set; }

        public DateTime CreateDate { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }

        public int RecordId { get; set; }

        public Record Record { get; set; }
    }
}
