using Blog.Services;
using Blog.Services.Interfaces;
using Blog.Site.Models;
using System.Net;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Blog.Site.Controllers
{
    public class HomeController : Controller
    {
        private readonly IRecordService _service;

        public HomeController(IRecordService service)
        {
            _service = service;
        }

        [ValidateInput(false)]
        public ActionResult Index(string searchString = "", int page = 1)
        {
            const int pageSize = 1;

            var records = _service.GetAll(HttpContext.User.Identity.IsAuthenticated, searchString, page, pageSize, out var count);

            var model = new RecordListViewModel()
            {
                Records = records,
                PageInfo = new PagingInfo
                {
                    CurrentPage = page,
                    ItemsPerPage = pageSize,
                    TotalItems = count
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

            await _service.Insert(record);

            TempData["message"] = "Your post has been sent for moderation.";

            return RedirectToAction("Index");
        }
        
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            var product = await _service.FindById(id);

            if (product == null)
            {
                return HttpNotFound();
            }

            return View(product);
        }
    }
}