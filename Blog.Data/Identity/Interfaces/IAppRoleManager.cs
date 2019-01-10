using Blog.Data.Identity.Models;
using Microsoft.AspNet.Identity;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Data.Identity.Interfaces
{
    public interface IAppRoleManager
    {
        void Dispose();
        Task<IdentityResult> CreateAsync(Role role);
        Task<IdentityResult> DeleteAsync(Role role);
        Task<Role> FindByIdAsync(int roleId);
        Task<Role> FindByNameAsync(string roleName);
        IQueryable<Role> Roles { get; }
    }
}