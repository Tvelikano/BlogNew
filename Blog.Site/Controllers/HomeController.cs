﻿using AutoMapper;
using Blog.Services;
using Blog.Services.Interfaces;
using Blog.Site.Models;
using Microsoft.AspNet.Identity;
using System.Net;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Blog.Site.Controllers
{
    public class HomeController : Controller
    {
        private readonly IRecordService _recordService;
        private readonly IRuntimeMapper _mapper;

        public HomeController(IRecordService recordService, IRuntimeMapper mapper)
        {
            _recordService = recordService;
            _mapper = mapper;
        }

        public ActionResult Index()
        {
            return View();
        }

        [ValidateInput(false)]
        public ActionResult GetRecords(string searchString = "", int page = 1)
        {
            const int pageSize = 3;

            var returnRecords = _recordService.GetAll(
                new GetArgsDTO<RecordDTO>()
                {
                    IsAuthenticated = HttpContext.User.Identity.IsAuthenticated,
                    SearchString = searchString,
                    OrderBy = r => r.CreateDate.ToString(),
                    Descending = true,
                    Page = page,
                    PageSize = pageSize
                });

            var model = new ListViewModel<ReturnModelDTO<RecordDTO>>
            {
                List = returnRecords.List,
                PageInfo = new PagingInfo
                {
                    CurrentPage = page,
                    ItemsPerPage = pageSize,
                    TotalItems = returnRecords.Count
                },
                SearchString = searchString
            };

            return Json(model, JsonRequestBehavior.AllowGet);
        }

        [Authorize]
        public ViewResult Create()
        {
            return View();
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> Create(RecordDTO record)
        {
            if (!ModelState.IsValid)
            {
                return View(record);
            }

            await _recordService.Insert(record);

            TempData["message"] = "Your post has been sent for moderation.";

            return RedirectToAction("Index");
        }

        public async Task<ActionResult> Details(RecordDTO model)
        {
            if (model.RecordId == 0)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            var record = await _recordService.FindById(model.RecordId);

            if (record == null)
            {
                return HttpNotFound();
            }


            return View(_mapper.Map(record, model));
        }

        public ActionResult GetComments(int recordId)
        {
            var comments = _recordService.FindCommentsById(recordId);

            return Json(comments, JsonRequestBehavior.AllowGet);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> CommentSummary(int recordId, string content)
        {
            await _recordService.InsertComment(new CommentDTO
            {
                Content = content,
                UserId = User.Identity.GetUserId<int>(),
                RecordId = recordId
            });

            return RedirectToAction("CommentSummary", new { recordId });
        }
    }
}