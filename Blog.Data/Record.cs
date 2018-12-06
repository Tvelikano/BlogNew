using System;
using System.ComponentModel.DataAnnotations;
using Blog.Data.Enums;

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
    }
}
