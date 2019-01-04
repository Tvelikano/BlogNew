﻿namespace Blog.Api.Models
{
    public class SearchQuery
    {
        public string SearchString { get; set; } = "";

        public int Page { get; set; } = 1;

        public int PageSize { get; set; } = 3;
    }
}