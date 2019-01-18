using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Http;

namespace Blog.Api.Controllers
{
    public class UploadController : ApiController
    {
        [Authorize]
        public IHttpActionResult Post()
        {
            try
            {
                var httpRequest = HttpContext.Current.Request;

                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];

                    if (postedFile == null || postedFile.ContentLength <= 0)
                    {
                        continue;
                    }

                    const int maxContentLength = 1024 * 1024 * 1; //Size = 1 MB  

                    var allowedFileExtensions = new List<string> { ".jpg", ".gif", ".png" };
                    var extension = postedFile.FileName.Substring(postedFile.FileName.LastIndexOf('.')).ToLower();

                    if (!allowedFileExtensions.Contains(extension))
                    {
                        return BadRequest("Please Upload image of type .jpg,.gif,.png.");
                    }

                    if (postedFile.ContentLength > maxContentLength)
                    {
                        return BadRequest("Please Upload a file up to 1 mb.");
                    }

                    var filePath = $"/Content/UserImages/{Guid.NewGuid()}{extension}";

                    postedFile.SaveAs(HttpContext.Current.Server.MapPath($"~{filePath}"));

                    return Ok($"{Request.RequestUri.AbsoluteUri.Replace(Request.RequestUri.AbsolutePath, "")}{filePath}");
                }

                return BadRequest("Please Upload a image.");
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }
    }
}
