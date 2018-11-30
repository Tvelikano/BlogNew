using System;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Threading.Tasks;

namespace Blog.Data.Identity
{
    public class IdentityUnitOfWork : IUnitOfWork
    {
        private readonly AppIdentityDbContext _db;

        public IdentityUnitOfWork()
        {
            _db = new AppIdentityDbContext();
            UserManager = new AppUserManager(new UserStore<User>(_db));
            RoleManager = new AppRoleManager(new RoleStore<Role>(_db));
        }

        public AppUserManager UserManager { get; }
        

        public AppRoleManager RoleManager { get; }

        public async Task SaveAsync()
        {
            await _db.SaveChangesAsync();
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        private bool _disposed;

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
