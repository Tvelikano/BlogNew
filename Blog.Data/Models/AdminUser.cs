using System;
using System.ComponentModel.DataAnnotations;

namespace Blog.Data.Models
{
    public class AdminUser
    {
        [Key]
        public int UserId { get; set; }
        public int? TotalRecords { get; set; }
        public int? TotalComments { get; set; }
        public DateTime? LastRecord { get; set; }
        public DateTime? LastComment { get; set; }
    }
}
