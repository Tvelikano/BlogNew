using System;
using System.Threading.Tasks;
using Blog.Data.Interfaces;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Blog.Data
{
    public class IdentityUnitOfWork : IUnitOfWork
    {
        private readonly AppIdentityDbContext _db;
        private bool _disposed;

        public IAppUserManager UserManager { get; }

        public IAppRoleManager RoleManager { get; }

        public IdentityUnitOfWork(IAppUserManager userManager)
        {
            _db = new AppIdentityDbContext();

            UserManager = new AppUserManager(new UserStore<User>(_db));

            RoleManager = new AppRoleManager(new RoleStore<Role>(_db));
        }
        
        public async Task SaveAsync()
        {
            await _db.SaveChangesAsync();
        }

        public void Dispose()
        {
            Dispose(true);

            GC.SuppressFinalize(this);
        }

        public virtual void Dispose(bool disposing)
        {
            if (_disposed) return;
            if (disposing)
            {
                UserManager.Dispose();

                RoleManager.Dispose();
            }
            _disposed = true;
        }
    }
}
