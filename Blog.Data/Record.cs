﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Blog.Data.Enums;
using Blog.Data.Identity;

namespace Blog.Data
{
    public class Record
    {
        public int RecordId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Content { get; set; }

        public DateTime CreateDate { get; set; }

        [Required]
        public RecordState State { get; set; } = RecordState.Private;

        public string UserId { get; set; }

        public User User { get; set; }

        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}
