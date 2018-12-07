using AutoMapper;
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

        [ValidateInput(false)]
        public ActionResult Index(string searchString = "", int page = 1)
        {
            const int pageSize = 3;

            var returnRecords = _recordService.GetAll(
                new GetArgsDTO<RecordDTO>()
                {
                    IsAuthenticated = HttpContext.User.Identity.IsAuthenticated,
                    SearchString = searchString,
                    OrderBy = r => r.Name,
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

            return View(model);
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

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> Details(int recordId, string content)
        {
            if (!string.IsNullOrEmpty(content))
            {
                var record = await _recordService.FindById(recordId);

                if (record == null)
                {
                    return HttpNotFound();
                }

                await _recordService.InsertComment(new CommentDTO
                { Content = content, UserId = User.Identity.GetUserId<int>(), RecordId = record.RecordId });
            }

            return RedirectToAction("Details", new RecordDTO { RecordId = recordId });
        }

        public ActionResult CommentSummary(int recordId)
        {
            var comments = _recordService.FindCommentsById(recordId);

            return PartialView(comments);
        }

        [HttpPost]
        public async Task<ActionResult> CommentSummary(int recordId, string content)
        {
            await _recordService.InsertComment(new CommentDTO
            { Content = content, UserId = User.Identity.GetUserId<int>(), RecordId = recordId });
            
            return RedirectToAction("CommentSummary", new { recordId });
        }
    }
}