using Blog.Data;
using Blog.Services.Interfaces;

namespace Blog.Services
{
    public class ServiceCreator
    {
        public IUserService CreateUserService()
        {
            return new UserService(new IdentityUnitOfWork());
        }
    }
}
