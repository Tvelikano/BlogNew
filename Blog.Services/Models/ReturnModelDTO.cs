namespace Blog.Services.Models
{
    public class ReturnModelDTO<T>
    {
        public T Model { get; set; }

        public int Info { get; set; }
    }
}
