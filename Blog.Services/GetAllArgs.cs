namespace Blog.Services
{
    public struct GetAllArgs
    {
        public bool IsAuthenticated { get; set; }
        public string SearchString { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
    }
}
