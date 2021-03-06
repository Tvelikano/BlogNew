﻿using AutoMapper;
using Blog.Api.Models;
using Blog.Services.Identity;
using Blog.Services.Identity.Interfaces;
using Blog.Services.Models;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Blog.Api.Controllers
{
    [EnableCors("http://localhost:53695", "*", "*", SupportsCredentials = true)]
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

            return Ok(new { message = "Logout successful." });
        }

        private IHttpActionResult GetResult(OperationDetails result)
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