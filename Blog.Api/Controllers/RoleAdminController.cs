using System.Collections.Generic;
using Blog.Services.Identity;
using Blog.Services.Identity.Interfaces;
using Blog.Services.Models;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Results;

namespace Blog.Api.Controllers
{
    [Authorize(Roles = "Admin")]
    public class RoleAdminController : ApiController
    {
        private readonly IUserService<UserDTO, RoleDTO> _userService;

        public RoleAdminController(IUserService<UserDTO, RoleDTO> userService)
        {
            _userService = userService;
        }

        public JsonResult<IEnumerable<RoleDTO>> Get()
        {
            return Json(_userService.GetAllRoles());
        }

        public async Task<IHttpActionResult> Post([Required]string name)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _userService.CreateRole(name);
            
            return AddErrorsFromResult(result);
        }

        public async Task<IHttpActionResult> Delete(int id)
        {
            var result = await _userService.DeleteRoleById(id);

            return AddErrorsFromResult(result);
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