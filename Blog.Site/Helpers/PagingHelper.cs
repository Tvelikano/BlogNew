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
            if (pagingInfo.TotalPages < 2)
            {
                return MvcHtmlString.Empty;
            }

            var result = new StringBuilder();

            if (pagingInfo.CurrentPage != 1)
            {
                var tag = Build(pagingInfo.CurrentPage, pageUrl(pagingInfo.CurrentPage - 1), "<");
                result.Append(tag);
            }

            var tagBegin = Build(pagingInfo.CurrentPage, pageUrl(1), 1.ToString(), 1);
            result.Append(tagBegin);

            for (var i = 2; i <= pagingInfo.TotalPages - 1; i++)
            {
                if (Math.Abs(i - pagingInfo.CurrentPage) < 2)
                {
                    var tag = Build(pagingInfo.CurrentPage, pageUrl(i), i.ToString(), i);
                    result.Append(tag);
                }
            }

            var tagEnd = Build(pagingInfo.CurrentPage, pageUrl(pagingInfo.TotalPages), pagingInfo.TotalPages.ToString(), pagingInfo.TotalPages);
            result.Append(tagEnd);

            if (pagingInfo.CurrentPage != pagingInfo.TotalItems)
            {
                var tag = Build(pagingInfo.CurrentPage, pageUrl(pagingInfo.CurrentPage + 1), ">");
                result.Append(tag);
            }

            return MvcHtmlString.Create(result.ToString());
        }

        public static TagBuilder Build(int currentPage, string href, string html, int page = 0)
        {
            var tag = new TagBuilder("a");

            tag.MergeAttribute("href", href);
            tag.InnerHtml = html;
            tag.AddCssClass("btn");

            if (page == currentPage)
            {
                tag.AddCssClass("selected");
                tag.AddCssClass("btn-primary");
            }
            else
            {
                tag.AddCssClass("btn-dark");
            }

            return tag;
        }
    }
}