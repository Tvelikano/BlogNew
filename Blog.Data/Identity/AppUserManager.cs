using Blog.Data.Identity.Interfaces;

using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;

using System.Linq;
using System.Threading.Tasks;

namespace Blog.Data.Identity
{
    public class AppUserManager : UserManager<User, int>, IAppUserManager
    {
        public AppUserManager(IUserStore<User, int> store) : base(store)
        {
            // Configure validation logic for usernames
            UserValidator = new UserValidator<User, int>(this)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };
            // Configure validation logic for passwords
            PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = true,
                RequireDigit = true,
                RequireLowercase = true,
                RequireUppercase = true,
            };
            var dataProtectionProvider = new IdentityFactoryOptions<AppUserManager>().DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                UserTokenProvider = new DataProtectorTokenProvider<User, int>(dataProtectionProvider.Create("ASP.NET Identity"));
            }
        }

        public async Task<IdentityResult> EditUserAsync(EditUser editUser)
        {
            var user = await FindByIdAsync(editUser.Id);

            if (user == null)
            {
                return new IdentityResult("User not found");
            }

            var isEmailValid = await UserValidator.ValidateAsync(user);

            if (!isEmailValid.Succeeded)
            {
                return isEmailValid;
            }

            var isPasswordValid = await PasswordValidator.ValidateAsync(editUser.Password);

            if (!isPasswordValid.Succeeded)
            {
                return isPasswordValid;
            }

            user.PasswordHash = PasswordHasher.HashPassword(editUser.Password);

            var updateUserResult = await UpdateAsync(user);

            var removeFromRolesResult = await RemoveFromRolesAsync(user.Id, (await GetRolesAsync(user.Id)).ToArray());

            if (!removeFromRolesResult.Succeeded)
            {
                return removeFromRolesResult;
            }

            if (editUser.Roles != null)
            {
                foreach (var role in editUser.Roles)
                {
                    var addToRoleResult = await AddToRoleAsync(user.Id, role);

                    if (!addToRoleResult.Succeeded)
                    {
                        return addToRoleResult;
                    }
                }
            }

            return updateUserResult;
        }
    }
}
