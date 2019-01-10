using Blog.Services.Enums;
using Blog.Services.Identity.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Blog.Services.Models
{
    public class RecordDTO
    {
        public int RecordId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Content { get; set; }

        public DateTime CreateDate { get; set; }

        public RecordStateDTO State { get; set; } = RecordStateDTO.Private;

        public ICollection<CommentDTO> Comments { get; set; } = new List<CommentDTO>();

        public int UserId { get; set; }

        public UserDTO User { get; set; }
    }
}
