using System;
using System.Threading.Tasks;

namespace Blog.Data.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        AppUserManager UserManager { get; }

        AppRoleManager RoleManager { get; }

        Task SaveAsync();
    }
}
