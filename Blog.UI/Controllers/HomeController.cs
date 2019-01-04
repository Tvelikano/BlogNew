using System.IO;
using System.Web.Mvc;

namespace Blog.UI.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            string solutiondir = Directory.GetParent(
                Directory.GetCurrentDirectory()).Parent.FullName;
            // may need to go one directory higher for solution directory
            //return XDocument.Load(solutiondir + "\\" + "Blog.ReactUI" + "\\Mock\\myDoc.html");

            return new FilePathResult(solutiondir + "\\" + "Blog.ReactUI" + "\\index.html", "text/plain");
        }
    }
}