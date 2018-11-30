using System;
using System.ComponentModel.DataAnnotations;

namespace Blog.Services
{
    public enum RecordStateDTO
    {
        Private,
        Internal,
        Public
    }
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
