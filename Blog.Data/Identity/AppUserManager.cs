﻿using Blog.Data.Identity.Interfaces;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Data.Identity
{
    public class AppUserManager : UserManager<User, int>, IAppUserManager
    {
        public AppUserManager(IUserStore<User, int> store) : base(store)
        {
        }

        public static AppUserManager Create(IdentityFactoryOptions<AppUserManager> options, IOwinContext context)
        {
            var manager = new AppUserManager(new UserStore<User, Role, int, UserLogin, UserRole, UserClaim>(context.Get<RecordContext>()));
            // Configure validation logic for usernames
            manager.UserValidator = new UserValidator<User, int>(manager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };
            // Configure validation logic for passwords
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = true,
                RequireDigit = true,
                RequireLowercase = true,
                RequireUppercase = true,
            };
            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                manager.UserTokenProvider = new DataProtectorTokenProvider<User, int>(dataProtectionProvider.Create("ASP.NET Identity"));
            }
            return manager;
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
