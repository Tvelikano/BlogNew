using System;
using System.Threading.Tasks;

namespace Blog.Data.Identity.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IAppUserManager UserManager { get; }

        IAppRoleManager RoleManager { get; }

        Task SaveAsync();
    }
}
