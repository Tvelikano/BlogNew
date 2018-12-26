using AutoMapper;
using Blog.Api.Models;
using Blog.Services.Identity;
using Blog.Services.Identity.Interfaces;
using Blog.Services.Models;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using System.Threading.Tasks;
using System.Web.Http;

namespace Blog.Api.Controllers
{
    [RoutePrefix("api/user")]
    public class AccountController : ApiController
    {
        private readonly IUserService<UserDTO, RoleDTO> _userService;
        private readonly IRuntimeMapper _mapper;
        private readonly IAuthenticationManager _authManager;

        public AccountController(IUserService<UserDTO, RoleDTO> service, IRuntimeMapper mapper, IAuthenticationManager authManager)
        {
            _userService = service;
            _mapper = mapper;
            _authManager = authManager;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IHttpActionResult> Register(RegisterViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userDto = _mapper.Map<UserDTO>(model);

            var result = await _userService.CreateUser(userDto);

            if (!result.IsSucceed)
            {
                return AddErrorsFromResult(result);
            }

            // Auto login after register (successful user registration should return access_token)
            var loginResult = Login(new LoginViewModel()
            {
                UserName = model.UserName,
                Password = model.Password
            });

            return await loginResult;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IHttpActionResult> Login(LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
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


                return Ok();

            }

            ModelState.AddModelError("", "Incorrect Name or Password");

            return BadRequest(ModelState);
        }

        [Authorize]
        [HttpPost]
        [Route("logout")]
        public IHttpActionResult Logout()
        {
            _authManager.SignOut(CookieAuthenticationDefaults.AuthenticationType);

            return Ok(new { message = "Logout successful." });
        }

        private IHttpActionResult AddErrorsFromResult(OperationDetails result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (result.IsSucceed) return Ok();

            if (result.Message != null)
            {
                foreach (var error in result.Message)
                {
                    ModelState.AddModelError("", error);
                }
            }

            if (ModelState.IsValid)
            {
                return BadRequest();
            }

            return BadRequest(ModelState);
        }
    }
}