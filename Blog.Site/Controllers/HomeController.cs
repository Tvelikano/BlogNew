using Blog.Services;
using Blog.Services.Interfaces;
using Blog.Site.Models;
using Microsoft.AspNet.Identity;
using System.Threading.Tasks;
using System.Web.Http.Results;
using System.Web.Mvc;

namespace Blog.Site.Controllers
{
    public class HomeController : Controller
    {
        private readonly IRecordService _recordService;

        public HomeController(IRecordService recordService)
        {
            _recordService = recordService;
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
        [HttpPost]
        public async Task Create(RecordDTO record)
        {
            await _recordService.Insert(record);
        }

        public ActionResult GetComments(int recordId)
        {
            var comments = _recordService.FindCommentsById(recordId);
            return Json(comments, JsonRequestBehavior.AllowGet);
        }

        [Authorize]
        [HttpPost]
        public async Task CreateComment(int recordId, string content)
        {
            await _recordService.InsertComment(new CommentDTO
            {
                Content = content,
                UserId = User.Identity.GetUserId<int>(),
                RecordId = recordId
            });
        }
    }
}