using Blog.Services.Enums;
using Blog.Services.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Blog.Services
{
    public class RecordDTO
    {
        public int RecordId { get; set; }

        [Required(ErrorMessage = "Please, set Name")]
        [StringLength(50, MinimumLength = 5)]
        public string Name { get; set; }

        [Required(ErrorMessage = "Please, set Content")]
        [StringLength(1000, MinimumLength = 5)]
        public string Content { get; set; }

        public DateTime CreateDate { get; set; }

        public RecordStateDTO State { get; set; } = RecordStateDTO.Private;

        public ICollection<CommentDTO> Comments { get; set; } = new List<CommentDTO>();

        public string UserId { get; set; }

        public UserDTO User { get; set; }
    }
}
