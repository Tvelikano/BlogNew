﻿using System.Diagnostics;
using AutoMapper;
using Blog.Services;
using Blog.Services.Interfaces;
using Blog.Services.Models;
using Blog.Site.Models;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using Ninject;

namespace Blog.Site.Controllers
{
    [Authorize(Roles = "Admin")]
    public class UserAdminController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IUserService _userService;

        public UserAdminController(IUserService service, IMapper mapper)
        {
            _userService = service;
            _mapper = mapper;
        }

        public async Task<ActionResult> Index()
        {
            return View(await _userService.GetAllUsers());
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
        public async Task<ActionResult> Edit(UserViewModel model, string[] rolesToAdd)
        {
            if (!ModelState.IsValid)
            {
                ViewBag.Roles = _userService.GetAllRoles();
                return View(model);
            }

            var userDto = _mapper.Map<UserDTO>(model);

            var result = await _userService.EditUser(userDto, rolesToAdd);

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