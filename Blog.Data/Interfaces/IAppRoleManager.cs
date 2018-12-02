using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;

namespace Blog.Data.Interfaces
{
    public interface IAppRoleManager
    {
        void Dispose();
        Task<IdentityResult> CreateAsync(Role role);
        Task<IdentityResult> UpdateAsync(Role role);
        Task<IdentityResult> DeleteAsync(Role role);
        Task<bool> RoleExistsAsync(string roleName);
        Task<Role> FindByIdAsync(string roleId);
        Task<Role> FindByNameAsync(string roleName);
        IIdentityValidator<Role> RoleValidator { get; set; }
        IQueryable<Role> Roles { get; }
    }
}