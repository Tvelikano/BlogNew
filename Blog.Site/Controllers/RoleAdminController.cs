using Blog.Services.Identity.Interfaces;
using Blog.Services.Models;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using System.Web.Mvc;
using Blog.Services.Identity;

namespace Blog.Site.Controllers
{
    [Authorize(Roles = "Admin")]
    public class RoleAdminController : Controller
    {
        private readonly IUserService<UserDTO, RoleDTO> _userService;

        public RoleAdminController(IUserService<UserDTO, RoleDTO> userService)
        {
            _userService = userService;
        }

        public ActionResult Index()
        {
            return View(_userService.GetAllRoles());
        }

        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Create([Required]string name)
        {
            if (!ModelState.IsValid)
            {
                return View();
            }

            var result = await _userService.CreateRole(name);

            if (result.IsSucceed)
            {
                return RedirectToAction("Index");
            }
                
            AddErrorsFromResult(result);

            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _userService.DeleteRoleById(id);

            if (result.IsSucceed)
            {
                return RedirectToAction("Index");
            }

            AddErrorsFromResult(result);

            return RedirectToAction("Index");
        }

        private void AddErrorsFromResult(OperationDetails result)
        {
            foreach (var mes in result.Message)
            {
                ModelState.AddModelError("", mes);
            }
        }
    }
}