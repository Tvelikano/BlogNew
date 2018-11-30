using Blog.Site.Models;
using System;
using System.Text;
using System.Web.Mvc;

namespace Blog.Site.Helpers
{
    public static class PagingHelper
    {
        public static MvcHtmlString PageLinks(
            this HtmlHelper html,
            PagingInfo pagingInfo,
            Func<int, string> pageUrl)
        {
            var result = new StringBuilder();
            for (var i = 1; i <= pagingInfo.TotalPages; i++)
            {
                var tag = new TagBuilder("a");
                tag.MergeAttribute("href", pageUrl(i));
                tag.InnerHtml = i.ToString();
                tag.AddCssClass("btn");
                if (i == pagingInfo.CurrentPage)
                {
                    tag.AddCssClass("selected");
                    tag.AddCssClass("btn-primary");
                }
                else
                {
                    tag.AddCssClass("btn-dark");
                }
                result.Append(tag);
            }
            return MvcHtmlString.Create(result.ToString());
        }
    }
}