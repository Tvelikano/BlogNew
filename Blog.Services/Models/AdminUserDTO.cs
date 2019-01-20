using System;

namespace Blog.Services.Models
{
    public class AdminUserDTO
    {
        public int UserId { get; set; }
        public int? TotalRecords { get; set; }
        public int? TotalComments { get; set; }
        public DateTime? LastRecord { get; set; }
        public DateTime? LastComment { get; set; }
    }
}
