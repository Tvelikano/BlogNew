using Blog.Data.Identity.Interfaces;
using System;
using System.Threading.Tasks;
using Blog.Data.Interfaces;

namespace Blog.Data.Identity
{
    public class IdentityUnitOfWork : IUnitOfWork
    {
        private readonly IRecordContext _db;
        private bool _disposed;

        public IAppUserManager UserManager { get; }

        public IAppRoleManager RoleManager { get; }

        public IdentityUnitOfWork(IRecordContext dbContext, IAppUserManager userManager, IAppRoleManager roleManager)
        {
            _db = dbContext;
            UserManager = userManager;
            RoleManager = roleManager;
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
            if (_disposed)
            {
                return;
            }

            if (disposing)
            {
                UserManager.Dispose();
                RoleManager.Dispose();
            }

            _disposed = true;
        }
    }
}
