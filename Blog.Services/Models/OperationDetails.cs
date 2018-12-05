using System.Collections.Generic;

namespace Blog.Services.Models
{
    public class OperationDetails
    {
        public OperationDetails(bool isSucceed, IEnumerable<string> message)
        {
            IsSucceed = isSucceed;
            Message = message;
        }

        public bool IsSucceed { get; }

        public IEnumerable<string> Message { get; }
    }
}
