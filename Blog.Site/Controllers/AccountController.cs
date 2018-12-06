using AutoMapper;
using Blog.Services;
using Blog.Services.Interfaces;
using Blog.Services.Models;
using Blog.Site.Models;
using Microsoft.Owin.Security;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Blog.Site.Controllers
{
    public class AccountController : Controller
    {
        private readonly IUserService _userService;
        private readonly IRuntimeMapper _mapper;
        private readonly IAuthenticationManager _authManager;

        public AccountController(IUserService service, IRuntimeMapper mapper, IAuthenticationManager authManager)
        {
            _userService = service;
            _mapper = mapper;
            _authManager = authManager;
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
            
            var userDto = _mapper.Map<UserDTO>(model);

            var result = await _userService.CreateUser(userDto);

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

            var userDto = _mapper.Map<UserDTO>(model);

            var claim = await _userService.Authenticate(userDto);

            if (claim != null)
            {
                _authManager.SignOut();

                _authManager.SignIn(new AuthenticationProperties
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
            _authManager.SignOut();

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