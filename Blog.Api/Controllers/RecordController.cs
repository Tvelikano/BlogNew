using Blog.Api.Models;
using Blog.Services;
using Blog.Services.Interfaces;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Results;

namespace Blog.Api.Controllers
{
    public class RecordController : ApiController
    {
        private readonly IRecordService _recordService;

        public RecordController(IRecordService recordService)
        {
            _recordService = recordService;
        }

        public JsonResult<ListViewModel<ReturnModelDTO<RecordDTO>>> Get([FromUri]SearchQuery searchQuery)
        {
            if (searchQuery.SearchString == null)
            {
                searchQuery.SearchString = "";
            }

            var returnRecords = _recordService.GetAll(
                new GetArgsDTO<RecordDTO>
                {
                    IsAdmin = User.IsInRole("Admin"),
                    IsAuthenticated = User.Identity.IsAuthenticated,
                    SearchString = searchQuery.SearchString,
                    OrderBy = r => r.CreateDate.ToString(),
                    Descending = true,
                    Page = searchQuery.Page,
                    PageSize = searchQuery.PageSize
                });

            var model = new ListViewModel<ReturnModelDTO<RecordDTO>>
            {
                List = returnRecords.List,
                PageInfo = new PagingInfo
                {
                    CurrentPage = searchQuery.Page,
                    ItemsPerPage = searchQuery.PageSize,
                    TotalItems = returnRecords.Count
                },
                SearchString = searchQuery.SearchString
            };

            return Json(model);
        }

        [Authorize]
        public async Task Post([FromUri]RecordDTO record)
        {
            await _recordService.Insert(record);
        }

        [Authorize(Roles = "Admin")]
        public async Task<IHttpActionResult> Put(RecordDTO record)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _recordService.Update(record);

            return Ok();
        }

        [Authorize(Roles = "Admin")]
        public async Task<IHttpActionResult> Delete(int id)
        {
            await _recordService.Delete(id);

            return Ok();
        }
    }
}