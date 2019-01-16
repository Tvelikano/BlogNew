using AutoMapper;

using Blog.Api.Models;
using Blog.Services.Identity.Interfaces;
using Blog.Services.Identity.Models;
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

        [Authorize]
        [Route("getuserinfo")]
        public UserDTO GetUserInfo()
        {
            var user =
            User.IsInRole("Admin")
                ? new UserDTO { UserName = User.Identity.Name, Roles = new[] { "Admin" } }
                : new UserDTO { UserName = User.Identity.Name };

            return user;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IHttpActionResult> Register([FromBody]RegisterViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userDto = _mapper.Map<UserDTO>(model);

            var result = await _userService.CreateUser(userDto);

            return GetResult(result);
        }

        [Authorize]
        [HttpPost]
        [Route("logout")]
        public IHttpActionResult Logout()
        {
            _authManager.SignOut(CookieAuthenticationDefaults.AuthenticationType);

            return Ok();
        }

        private IHttpActionResult GetResult(OperationDetails result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (result.IsSucceed)
            {
                return Ok();
            }

            if (result.Errors != null)
            {
                foreach (var error in result.Errors)
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