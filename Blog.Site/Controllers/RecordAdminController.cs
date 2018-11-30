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
        private readonly IRecordService _service;

        public RecordAdminController(IRecordService service)
        {
            _service = service;
        }

        public ActionResult Index()
        {
            return View(_service.GetAll());
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

            await _service.Insert(record);

            TempData["message"] = $"\"{record.Name}\" was saved";

            return RedirectToAction("Index");
        }

        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            var record = await _service.FindById(id);

            return View(record);
        }

        [HttpPost]
        public async Task<ActionResult> Edit(RecordDTO record)
        {
            if (!ModelState.IsValid)
            {
                return View(record);
            }

            await _service.Update(record);

            TempData["message"] = $"Changes in \"{record.Name}\" was saved";

            return RedirectToAction("Index");
        }

        [HttpPost]
        public async Task<ActionResult> Delete(int id)
        {
            await _service.Delete(id);

            TempData["message"] = "Record was deleted";

            return RedirectToAction("Index");
        }
    }
}