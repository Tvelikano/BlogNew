using System;
using System.ComponentModel.DataAnnotations;

namespace Blog.Data
{
    public class Comment
    {
        public int CommentId { get; set; }

        [Required]
        public string Content { get; set; }

        public DateTime CreateDate { get; set; }

        public string UserName { get; set; }

        public int RecordId { get; set; }

        public Record Record { get; set; }
    }
}
