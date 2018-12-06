using System;
using System.ComponentModel.DataAnnotations;

namespace Blog.Services
{
    public class CommentDTO
    {
        public int CommentId { get; set; }

        [Required]
        public string Content { get; set; }

        public DateTime CreateDate { get; set; }

        public string UserName { get; set; }

        public int RecordId { get; set; }

        public RecordDTO Record { get; set; }
    }
}
