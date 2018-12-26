using Blog.Services;
using Blog.Services.Interfaces;

using Microsoft.AspNet.Identity;

using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Results;

namespace Blog.Site.Controllers
{
    public class CommentController : ApiController
    {
        private readonly IRecordService _recordService;

        public CommentController(IRecordService recordService)
        {
            _recordService = recordService;
        }

        public JsonResult<ReturnListDTO<CommentDTO>> Get(int id)
        {
            return Json(_recordService.FindCommentsById(id));
        }

        [System.Web.Mvc.Authorize]
        public async Task Post([FromUri]CommentDTO comment)
        {
            await _recordService.InsertComment(new CommentDTO
            {
                Content = comment.Content,
                UserId = User.Identity.GetUserId<int>(),
                RecordId = comment.RecordId
            });
        }
    }
}