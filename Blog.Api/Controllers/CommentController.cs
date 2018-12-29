using Blog.Services;
using Blog.Services.Interfaces;
using Microsoft.AspNet.Identity;
using System.Threading.Tasks;
using System.Web.Http;

namespace Blog.Api.Controllers
{
    public class CommentController : ApiController
    {
        private readonly IRecordService _recordService;

        public CommentController(IRecordService recordService)
        {
            _recordService = recordService;
        }

        public ReturnListDTO<CommentDTO> Get(int id)
        {
            return _recordService.FindCommentsById(id);
        }

        [Authorize]
        public async Task Post([FromBody]CommentDTO comment)
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