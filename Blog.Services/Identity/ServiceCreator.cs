using Blog.Data.Identity;

namespace Blog.Services.Identity
{
    public class ServiceCreator
    {
        public IUserService CreateUserService()
        {
            return new UserService(new IdentityUnitOfWork());
        }
    }
}
