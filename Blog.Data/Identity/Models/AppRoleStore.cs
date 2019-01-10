using Blog.Data.Interfaces;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

namespace Blog.Data.Identity.Models
{
    public class AppRoleStore : RoleStore<Role, int, UserRole>
    {
        public AppRoleStore(IRecordContext db) : base((DbContext)db)
        {

        }
    }
}
