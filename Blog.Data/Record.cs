using System;
using System.ComponentModel.DataAnnotations;

namespace Blog.Data
{
    public enum RecordState
    {
        Private,
        Internal,
        Public
    }
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
