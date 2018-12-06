using Blog.Services;
using System.Net;
using System.Threading.Tasks;
using System.Web.Mvc;
using Blog.Services.Interfaces;

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

        public ActionResult Index()
        {
            return View(_recordService.GetAll(new GetAllArgsDTO{IsAdmin = true}).Records);
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

        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
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