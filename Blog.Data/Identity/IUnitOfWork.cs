using System;
using System.Threading.Tasks;

namespace Blog.Data.Identity
{
    public interface IUnitOfWork : IDisposable
    {
        AppUserManager UserManager { get; }
        AppRoleManager RoleManager { get; }
        Task SaveAsync();
    }
}
