using System.Linq;
using Blog.Services.Identity;
using Blog.Site.Models;
using Microsoft.AspNet.Identity.Owin;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using AutoMapper;
using Blog.Services;

namespace Blog.Site.Controllers
{
    [Authorize(Roles = "Admin")]
    public class UserAdminController : Controller
    {
        private IUserService UserService => HttpContext.GetOwinContext().GetUserManager<IUserService>();
        private readonly IMapper _mapper = new MapperConfiguration(cfg => cfg.CreateMap<UserDTO, UserViewModel>()).CreateMapper();

        public ActionResult Index()
        {
            return View(UserService.GetAllUsers());
        }
        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Create(UserViewModel model)
        {
            if (!ModelState.IsValid) return View(model);
            var userDto = _mapper.Map<UserDTO>(model);
            var result = await UserService.CreateUser(userDto);
            MessageFromResult(result);
            if (result.IsSucceed)
                return RedirectToAction("Index");
            return View(model);
        }

        public async Task<ActionResult> Edit(string id)
        {
            var user = await UserService.GetUserById(id);
            if (user != null)
            {
                return View(_mapper.Map<UserViewModel>(user));
            }
            return RedirectToAction("Index");
        }

        [HttpPost]
        public async Task<ActionResult> Edit(UserViewModel model)
        {
            if (!ModelState.IsValid) return View(model);

            var result = await UserService.EditUserById(model.Id, model.UserName, model.Email, model.Password);
            MessageFromResult(result);
            return RedirectToAction(result.IsSucceed ? "Index" : "Edit");
        }
        [HttpPost]
        public async Task<ActionResult> Delete(string id)
        {
            MessageFromResult(await UserService.DeleteUserById(id));
            return RedirectToAction("Index");
        }

        private void MessageFromResult(OperationDetails result)
        {
            if (result.IsSucceed)
                TempData["message"] = result.Message.FirstOrDefault();
            else
                foreach (var mes in result.Message)
                {
                    ModelState.AddModelError("", mes);
                }
        }
    }
}