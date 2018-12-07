using System.Collections.Generic;

namespace Blog.Data
{
    public class ReturnList<T>
    {
        public IList<T> List { get; set; }

        public int Count { get; set; }

        public object Info { get; set; }
    }
}
