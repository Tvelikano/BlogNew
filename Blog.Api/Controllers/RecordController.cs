using Blog.Api.Hubs;
using Blog.Api.Models;
using Blog.Services.Enums;
using Blog.Services.Interfaces;
using Blog.Services.Models;

using Microsoft.AspNet.Identity;

using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Blog.Api.Controllers
{
    [EnableCors("http://localhost:53695", "*", "*", SupportsCredentials = true)]
    public class RecordController : ApiController
    {
        private readonly IRecordService _recordService;

        public RecordController(IRecordService recordService)
        {
            _recordService = recordService;
        }

        public async Task<IHttpActionResult> Get(int id)
        {
            var record = await _recordService.GetById(id);

            if (record == null)
            {
                return NotFound();
            }

            switch (record.Model.State)
            {
                case RecordStateDTO.Private:
                    if (User.IsInRole("Admin"))
                    {
                        return Ok(record);
                    }

                    return Unauthorized();

                case RecordStateDTO.Internal:
                    if (User.Identity.IsAuthenticated)
                    {
                        return Ok(record);
                    }

                    return Unauthorized();

                default:
                    return Ok(record);
            }
        }

        public ListViewModel<ReturnModelDTO<RecordDTO>> Get([FromUri]SearchQuery searchQuery)
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

            return model;
        }

        [Authorize]
        public async Task Post([FromBody]RecordDTO record)
        {
            record.UserId = User.Identity.GetUserId<int>();

            var recordId = await _recordService.Insert(record);

            if (recordId != 0)
            {
                RecordHub.NewRecord(recordId);
            }
        }

        [Authorize(Roles = "Admin")]
        public async Task<IHttpActionResult> Put([FromBody]RecordDTO record)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _recordService.Update(record);

            RecordHub.NewRecord(record.RecordId, record.State);

            return Ok();
        }

        [Authorize(Roles = "Admin")]
        public async Task<IHttpActionResult> Delete([FromBody]int id)
        {
            await _recordService.Delete(id);

            return Ok();
        }
    }
}