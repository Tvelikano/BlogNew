using AutoMapper;
using Blog.Services;
using Blog.Services.Interfaces;
using Blog.Services.Models;
using Blog.Site.Models;
using Microsoft.Owin.Security;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Blog.Site.Controllers
{
    public class AccountController : Controller
    {
        private IAuthenticationManager AuthManager => HttpContext.GetOwinContext().Authentication;
        private IUserService UserService { get; }

        public AccountController(IUserService service)
        {
            UserService = service;
        }

        public ActionResult Register()
        {
            return View();
        }

        [Authorize]
        public ActionResult Index()
        {
            return View(HttpContext.User);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Register(RegisterViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<RegisterViewModel, UserDTO>().
                ForMember(destinationMember => destinationMember.Id, source => source.Ignore())).CreateMapper();
            
            var userDto = mapper.Map<UserDTO>(model);

            var result = await UserService.CreateUser(userDto);

            if (result.IsSucceed)
            {
                return RedirectToAction("Login", "Account");
            }
               
            AddErrorsFromResult(result);

            return View(model);
        }

        public ActionResult Login(string returnUrl)
        {
            ViewBag.returnUrl = returnUrl;

            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Login(LoginViewModel model, string returnUrl)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<LoginViewModel, UserDTO>()).CreateMapper();

            var userDto = mapper.Map<UserDTO>(model);

            var claim = await UserService.Authenticate(userDto);

            if (claim != null)
            {
                AuthManager.SignOut();

                AuthManager.SignIn(new AuthenticationProperties
                {
                    IsPersistent = true
                }, 
                    claim);

                return Redirect(!string.IsNullOrEmpty(returnUrl) ? returnUrl : "~/");
            }

            ModelState.AddModelError("", "Incorrect Name or Password");

            return View(model);

        }

        [Authorize]
        public ActionResult Logout()
        {
            AuthManager.SignOut();

            return RedirectToAction("Login");
        }

        private void AddErrorsFromResult(OperationDetails result)
        {
            foreach (var message in result.Message)
            {
                ModelState.AddModelError("", message);
            }
        }
    }
}