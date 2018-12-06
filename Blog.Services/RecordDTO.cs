﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Blog.Services.Enums;

namespace Blog.Services
{
    public class RecordDTO
    {
        public int RecordId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Content { get; set; }

        public DateTime CreateDate { get; set; }

        [Required]
        public RecordStateDTO State { get; set; } = RecordStateDTO.Private;

        public ICollection<CommentDTO> Comments { get; set; } = new List<CommentDTO>();
    }
}
