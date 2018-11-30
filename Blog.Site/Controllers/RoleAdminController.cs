﻿using Blog.Services.Interfaces;
using Blog.Services.Models;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Blog.Site.Controllers
{
    [Authorize(Roles = "Admin")]
    public class RoleAdminController : Controller
    {
        private IUserService UserService { get; }

        public RoleAdminController(IUserService service)
        {
            UserService = service;
        }

        public ActionResult Index()
        {
            return View(UserService.GetAllRoles());
        }

        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Create([Required]string name)
        {
            if (!ModelState.IsValid)
            {
                return View(name);
            }

            var result = await UserService.CreateRole(name);

            if (result.IsSucceed)
            {
                return RedirectToAction("Index");
            }
                
            AddErrorsFromResult(result);

            return View(name);
        }

        [HttpPost]
        public async Task<ActionResult> Delete(string id)
        {
            var result = await UserService.DeleteRoleById(id);

            if (result.IsSucceed)
            {
                return RedirectToAction("Index");
            }

            AddErrorsFromResult(result);

            return RedirectToAction("Index");
        }

        private void AddErrorsFromResult(OperationDetails result)
        {
            foreach (var mes in result.Message)
            {
                ModelState.AddModelError("", mes);
            }
        }
    }
}