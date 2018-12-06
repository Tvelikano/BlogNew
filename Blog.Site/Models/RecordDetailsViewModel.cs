using Blog.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Blog.Site.Models
{
    public class RecordDetailsViewModel
    {
        public int RecordId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [DataType(DataType.MultilineText)]
        public string Content { get; set; }

        public DateTime CreateDate { get; set; }

        public ICollection<CommentDTO> Comments { get; set; }
        
        public bool IsWithComments { get; set; }
    }
}