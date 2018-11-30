using System;
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
        [DataType(DataType.MultilineText)]
        public string Content { get; set; }

        public DateTime CreateDate { get; set; }

        [Required]
        public RecordStateDTO State { get; set; } = RecordStateDTO.Private;
    }
}
