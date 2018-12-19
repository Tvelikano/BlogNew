import * as React from "react";

interface IProps {
  pagingInfo: PagingInfo;
  getRecords: (page: number) => void;
}

export default class PagingHelper extends React.Component<IProps, object> {
  public render() {
    const pagingInfo = this.props.pagingInfo;

    if (pagingInfo.TotalPages < 2) {
      return null;
    }

    return (
      <div>
        {pagingInfo.CurrentPage !== 1
          ? this.Build(pagingInfo.CurrentPage, "<", pagingInfo.CurrentPage - 1)
          : ""}

        {this.Build(pagingInfo.CurrentPage, "1", 1)}

        {Array.from({ length: pagingInfo.TotalPages - 2 }, (v, i) => {
          return Math.abs(i + 2 - pagingInfo.CurrentPage) < 2
            ? this.Build(pagingInfo.CurrentPage, (i + 2).toString(), i + 2)
            : "";
        })}

        {this.Build(
          pagingInfo.CurrentPage,
          pagingInfo.TotalPages.toString(),
          pagingInfo.TotalPages
        )}

        {pagingInfo.CurrentPage != pagingInfo.TotalPages
          ? this.Build(pagingInfo.CurrentPage, ">", pagingInfo.CurrentPage + 1)
          : ""}
      </div>
    );
  }

  public Build(currentPage: number, html: string, page: number) {
    return (
      <a
        key={html}
        onClick={() => {
          this.props.getRecords(page);
        }}
        className={`btn ${
          page === currentPage ? "selected btn-primary" : "btn-dark"
        }`}
      >
        {html}
      </a>
    );
  }
}
