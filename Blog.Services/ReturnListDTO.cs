using System.Collections.Generic;

namespace Blog.Services
{
    public class ReturnListDTO<T>
    {
        public IList<T> List { get; set; }

        public int Count { get; set; }

        public object Info { get; set; }
    }
}
