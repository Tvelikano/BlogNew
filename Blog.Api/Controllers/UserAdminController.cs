using AutoMapper;
using Blog.Api.Models;
using Blog.Services;
using Blog.Services.Identity;
using Blog.Services.Identity.Interfaces;
using Blog.Services.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Results;

namespace Blog.Api.Controllers
{
    [Authorize(Roles = "Admin")]
    public class UserAdminController : ApiController
    {
        private readonly IRuntimeMapper _mapper;
        private readonly IUserService<UserDTO, RoleDTO> _userService;

        public UserAdminController(IUserService<UserDTO, RoleDTO> service, IRuntimeMapper mapper)
        {
            _userService = service;
            _mapper = mapper;
        }

        public JsonResult<ListViewModel<UserViewModel>> Index([FromUri]SearchQuery searchQuery)
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

            return Json(model);
        }

        [HttpPost]
        public async Task<IHttpActionResult> Create(UserViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userDto = _mapper.Map<UserDTO>(model);

            var result = await _userService.CreateUser(userDto);

            return AddErrorsFromResult(result);
        }
        
        public async Task<IHttpActionResult> Edit(UserViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userDto = _mapper.Map<UserDTO>(model);

            var result = await _userService.EditUser(userDto);

            return AddErrorsFromResult(result);
        }
        
        public async Task<IHttpActionResult> Delete(int id)
        {
           return  AddErrorsFromResult(await _userService.DeleteUserById(id));
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