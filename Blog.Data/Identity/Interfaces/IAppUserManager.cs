using Blog.Data.Identity.Models;

using Microsoft.AspNet.Identity;

using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Blog.Data.Identity.Interfaces
{
    public interface IAppUserManager
    {
        Task<IdentityResult> EditUserAsync(EditUser editUser);

        void Dispose();

        Task<ClaimsIdentity> CreateIdentityAsync(User user, string authenticationType);

        Task<IdentityResult> DeleteAsync(User user);

        Task<User> FindByIdAsync(int userId);

        Task<IdentityResult> CreateAsync(User user, string password);

        Task<User> FindAsync(string userName, string password);

        Task<IdentityResult> AddToRolesAsync(int userId, params string[] roles);

        Task<User> FindByEmailAsync(string email);

        IQueryable<User> Users { get; }
    }
}