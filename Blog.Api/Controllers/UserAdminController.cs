using AutoMapper;

using Blog.Api.Models;
using Blog.Services.Identity.Interfaces;
using Blog.Services.Identity.Models;
using Blog.Services.Models;

using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace Blog.Api.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/admin/users")]
    public class UserAdminController : ApiController
    {
        private readonly IRuntimeMapper _mapper;
        private readonly IUserService<UserDTO, RoleDTO> _userService;

        public UserAdminController(IUserService<UserDTO, RoleDTO> service, IRuntimeMapper mapper)
        {
            _userService = service;
            _mapper = mapper;
        }

        [Route("api/admin/users/{id}")]
        public async Task<UserViewModel> Get(int id)
        {
            return _mapper.Map<UserViewModel>(await _userService.GetUserById(id));
        }

        public ListViewModel<UserViewModel> Get([FromUri]SearchQuery searchQuery)
        {
            if (searchQuery.SearchString == null)
            {
                searchQuery.SearchString = "";
            }

            var returnUsers = _userService.GetAllUsers(
                new GetArgsDTO<UserDTO>
                {
                    SearchString = searchQuery.SearchString,
                    OrderBy = r => r.UserName,
                    Page = searchQuery.Page,
                    PageSize = searchQuery.PageSize
                });

            var model = new ListViewModel<UserViewModel>
            {
                List = _mapper.Map<IList<UserViewModel>>(returnUsers.List),
                PageInfo = new PagingInfo
                {
                    CurrentPage = searchQuery.Page,
                    ItemsPerPage = searchQuery.PageSize,
                    TotalItems = returnUsers.Count
                },
                SearchString = searchQuery.SearchString
            };

            return model;
        }

        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody]UserViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userDto = _mapper.Map<UserDTO>(model);

            var result = await _userService.CreateUser(userDto);

            return ReturnResult(result);
        }

        public async Task<IHttpActionResult> Put([FromBody]UserViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userDto = _mapper.Map<UserDTO>(model);

            var result = await _userService.EditUser(userDto);

            return ReturnResult(result);
        }

        public async Task<IHttpActionResult> Delete([FromBody]int id)
        {
            return ReturnResult(await _userService.DeleteUserById(id));
        }

        private IHttpActionResult ReturnResult(OperationDetails result)
        {
            if (result.IsSucceed) return Ok();

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