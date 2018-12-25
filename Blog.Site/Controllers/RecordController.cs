using Blog.Services;
using Blog.Services.Interfaces;
using Blog.Site.Models;

using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Results;

namespace Blog.Site.Controllers
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
                new GetArgsDTO<RecordDTO>()
                {
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

        [System.Web.Http.Authorize]
        public async Task Post([FromUri]RecordDTO record)
        {
            await _recordService.Insert(record);
        }
    }
}