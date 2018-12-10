﻿using System.Collections.Generic;

namespace Blog.Site.Models
{
    public class ListViewModel<T>
    {
        public IList<T> List { get; set; }

        public PagingInfo PageInfo { get; set; }

        public string SearchString { get; set; }
    }
}