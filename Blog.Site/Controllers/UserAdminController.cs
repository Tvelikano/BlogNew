using AutoMapper;
using Blog.Services.Identity;
using Blog.Services.Identity.Interfaces;
using Blog.Services.Models;
using Blog.Site.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Blog.Site.Controllers
{
    [Authorize(Roles = "Admin")]
    public class UserAdminController : Controller
    {
        private readonly IRuntimeMapper _mapper;
        private readonly IUserService _userService;

        public UserAdminController(IUserService service, IRuntimeMapper mapper)
        {
            _userService = service;
            _mapper = mapper;
        }

        public ActionResult Index(string searchString = "", int page = 1)
        {
            const int pageSize = 1;

            var returnUsers = _userService.GetAllUsers(
                new GetAllUsersArgsDTO
                {
                    SearchString = searchString,
                    OrderBy = r => r.UserName,
                    Page = page,
                    PageSize = pageSize
                });

            var model = new UserListViewModel()
            {
                Users = _mapper.Map<IEnumerable<UserViewModel>>(returnUsers.Users),
                PageInfo = new PagingInfo
                {
                    CurrentPage = page,
                    ItemsPerPage = pageSize,
                    TotalItems = returnUsers.Count
                },
                SearchString = searchString
            };

            return View(model);
        }

        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Create(UserViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var userDto = _mapper.Map<UserDTO>(model);

            var result = await _userService.CreateUser(userDto);

            MessageFromResult(result);

            if (result.IsSucceed)
            {
                return RedirectToAction("Index");
            }

            return View(model);
        }

        public async Task<ActionResult> Edit(string id)
        {
            var user = await _userService.GetUserById(id);

            if (user == null)
            {
                return RedirectToAction("Index");
            }

            ViewBag.Roles = _userService.GetAllRoles();

            return View(_mapper.Map<UserViewModel>(user));
        }

        [HttpPost]
        public async Task<ActionResult> Edit(UserViewModel model)
        {
            ViewBag.Roles = _userService.GetAllRoles();

            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var userDto = _mapper.Map<UserDTO>(model);

            var result = await _userService.EditUser(userDto);

            MessageFromResult(result);

            return RedirectToAction(result.IsSucceed ? "Index" : "Edit");
        }

        [HttpPost]
        public async Task<ActionResult> Delete(string id)
        {
            MessageFromResult(await _userService.DeleteUserById(id));

            return RedirectToAction("Index");
        }

        private void MessageFromResult(OperationDetails result)
        {
            if (result.IsSucceed)
            {
                TempData["message"] = result.Message.FirstOrDefault();
            }
            else
            {
                foreach (var message in result.Message)
                {
                    ModelState.AddModelError("", message);
                }
            }
        }
    }
}