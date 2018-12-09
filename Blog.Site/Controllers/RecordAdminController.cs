using Blog.Services;
using System.Net;
using System.Threading.Tasks;
using System.Web.Mvc;
using Blog.Services.Interfaces;
using Blog.Site.Models;
using RecordDTO = Blog.Services.RecordDTO;

namespace Blog.Site.Controllers
{
    [Authorize(Roles = "Admin")]
    public class RecordAdminController : Controller
    {
        private readonly IRecordService _recordService;

        public RecordAdminController(IRecordService recordService)
        {
            _recordService = recordService;
        }

        [ValidateInput(false)]
        public ActionResult Index(string searchString = "", int page = 1)
        {
            const int pageSize = 3;

            var returnRecords = _recordService.GetAll(
                new GetArgsDTO<RecordDTO>()
                {
                    IsAdmin = true,
                    IsAuthenticated = HttpContext.User.Identity.IsAuthenticated,
                    SearchString = searchString,
                    OrderBy = r => r.CreateDate.ToString(),
                    Descending = true,
                    Page = page,
                    PageSize = pageSize
                });

            var model = new ListViewModel<ReturnModelDTO<RecordDTO>>()
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

        public ViewResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Create(RecordDTO record)
        {
            if (!ModelState.IsValid)
            {
                return View(record);
            }

            await _recordService.Insert(record);

            TempData["message"] = $"\"{record.Name}\" was saved";

            return RedirectToAction("Index");
        }

        public async Task<ActionResult> Edit(int id)
        {
            if (id == 0)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            var record = await _recordService.FindById(id);

            return View(record);
        }

        [HttpPost]
        public async Task<ActionResult> Edit(RecordDTO record)
        {
            if (!ModelState.IsValid)
            {
                return View(record);
            }

            await _recordService.Update(record);

            TempData["message"] = $"Changes in \"{record.Name}\" was saved";

            return RedirectToAction("Index");
        }

        [HttpPost]
        public async Task<ActionResult> Delete(int id)
        {
            await _recordService.Delete(id);

            TempData["message"] = "Record was deleted";

            return RedirectToAction("Index");
        }
    }
}