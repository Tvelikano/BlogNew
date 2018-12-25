import * as React from "react";
import { Link } from "react-router-dom";
import queryString from "querystring";
import PagingInfo from "types/PagingInfo";

interface IProps {
  pagingInfo: PagingInfo;
  query: string;
}

export default class PagingHelper extends React.Component<IProps> {
  private Build(html: string, page: number) {
    const { query, pagingInfo } = this.props;

    return (
      <Link
        to={`?${queryString.stringify({
          ...queryString.parse(query.replace("?", "")),
          Page: page
        })}`}
        key={html}
        className={`btn ${
          page === pagingInfo.CurrentPage ? "selected btn-primary" : "btn-dark"
        }`}
      >
        {html}
      </Link>
    );
  }

  public render() {
    const pagingInfo = this.props.pagingInfo;

    if (pagingInfo.TotalPages < 2) {
      return null;
    }

    return (
      <>
        {pagingInfo.CurrentPage !== 1 &&
          this.Build("<", pagingInfo.CurrentPage - 1)}

        {this.Build("1", 1)}

        {Array.from({ length: pagingInfo.TotalPages - 2 }, (v, i) => {
          return (
            Math.abs(i + 2 - pagingInfo.CurrentPage) < 2 &&
            this.Build((i + 2).toString(), i + 2)
          );
        })}

        {this.Build(pagingInfo.TotalPages.toString(), pagingInfo.TotalPages)}

        {pagingInfo.CurrentPage != pagingInfo.TotalPages &&
          this.Build(">", pagingInfo.CurrentPage + 1)}
      </>
    );
  }
}
