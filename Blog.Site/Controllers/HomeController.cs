using Blog.Site.Models;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Mvc;
using Blog.Services;

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
        public ActionResult Index(string searchString = null, int page = 1)
        {
            const int pageSize = 3;
            var records = _service.GetAll();
            records = HttpContext.User.Identity.IsAuthenticated ?
                records.Where(rec => rec.State != RecordStateDTO.Private) :
                records.Where(rec => rec.State == RecordStateDTO.Public);
            if (searchString != null)
            {
                searchString = Server.HtmlEncode(searchString);
                records = records.Where(prod => prod.Name.Contains(searchString));
            }
            if (!records.Any())
            {
                return Content("No records");
            }
            var model = new RecordListViewModel()
            {
                Records = records
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize),
                PageInfo = new PagingInfo
                {
                    CurrentPage = page,
                    ItemsPerPage = pageSize,
                    TotalItems = records.Count()
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
            if (!ModelState.IsValid) return View(record);

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