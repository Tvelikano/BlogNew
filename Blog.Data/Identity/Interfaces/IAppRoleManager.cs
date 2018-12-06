using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;

namespace Blog.Data.Identity.Interfaces
{
    public interface IAppRoleManager
    {
        void Dispose();
        Task<IdentityResult> CreateAsync(Role role);
        Task<IdentityResult> DeleteAsync(Role role);
        Task<Role> FindByIdAsync(string roleId);
        Task<Role> FindByNameAsync(string roleName);
        IQueryable<Role> Roles { get; }
    }
}