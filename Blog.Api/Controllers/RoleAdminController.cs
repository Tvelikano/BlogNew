using Blog.Services.Identity;
using Blog.Services.Identity.Interfaces;
using Blog.Services.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Blog.Api.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/admin/roles")]
    [EnableCors("http://localhost:53695", "*", "*", SupportsCredentials = true)]
    public class RoleAdminController : ApiController
    {
        private readonly IUserService<UserDTO, RoleDTO> _userService;

        public RoleAdminController(IUserService<UserDTO, RoleDTO> userService)
        {
            _userService = userService;
        }

        public IEnumerable<RoleDTO> Get()
        {
            return _userService.GetAllRoles();
        }

        public async Task<IHttpActionResult> Post([FromBody]string name)
        {
            return !ModelState.IsValid ? 
                BadRequest(ModelState) : 
                ReturnResult(await _userService.CreateRole(name));
        }

        public async Task<IHttpActionResult> Delete([FromBody]int id)
        {
            return ReturnResult(await _userService.DeleteRoleById(id));
        }

        private IHttpActionResult ReturnResult(OperationDetails result)
        {
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