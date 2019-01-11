using System.Collections.Generic;

namespace Blog.Services.Models
{
    public class OperationDetails
    {
        public OperationDetails(bool isSucceed, IEnumerable<string> errors)
        {
            IsSucceed = isSucceed;
            Errors = errors;
        }

        public bool IsSucceed { get; }

        public IEnumerable<string> Errors { get; }
    }
}
