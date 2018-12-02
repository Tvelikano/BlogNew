using System;
using System.Threading.Tasks;

namespace Blog.Data.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IAppUserManager UserManager { get; }

        IAppRoleManager RoleManager { get; }

        Task SaveAsync();
    }
}
