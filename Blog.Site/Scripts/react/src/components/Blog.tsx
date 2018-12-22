import * as React from "react";
import Record from "./Record";
import PagingHelper from "./Helpers/PagingHelper";
import queryString from "querystring";
import SearchHelper from "./Helpers/SearchHelper";
import { Link } from "react-router-dom";

interface IProps {
  data: ListViewModel<ReturnModelDTO<RecordDTO>>;
  isLoading: boolean;
  isCommentsLoading: boolean;
  location: {
    search: string;
  };
  getRecords: (searchString: string, page: number) => void;
  getComments: (id: number) => void;
  createComment: (recordId: number, content: string) => void;
  showComments: (id: number) => void;
}

export default class Blog extends React.Component<IProps, object> {
  public componentDidUpdate() {
    let search = (queryString.parse(
      this.props.location.search.replace("?", "")
    ) as any) as {
      searchString: string;
      page: number;
    };

    if (
      !this.props.isLoading &&
      ((search.page && search.page != this.props.data.PageInfo.CurrentPage) ||
        (search.searchString &&
          search.searchString != this.props.data.SearchString))
    ) {
      this.props.getRecords(search.searchString, search.page);
    }
  }

  public componentDidMount = () => {
    let search = (queryString.parse(
      this.props.location.search.replace("?", "")
    ) as any) as {
      searchString: string;
      page: number;
    };

    this.props.getRecords(search.searchString, search.page);
  };

  public render = () => (
    <>
      <Link className="btn btn-primary" to="/Add">
        Create New Record
      </Link>
      <SearchHelper
        query={
          (queryString.parse(
            this.props.location.search.replace("?", "")
          ) as any) as {
            searchString: string;
            page: number;
          }
        }
      />
      {this.renderTemplate()}
    </>
  );

  private renderTemplate() {
    const {
      isLoading,
      data,
      getComments,
      createComment,
      showComments
    } = this.props;
    let template;

    // if (isLoading) {
    //   template = <p>Загрузка...</p>;
    // } else {
    if (data.List.length) {
      template = (
        <>
          {data.List.map(item => (
            <div key={item.Model.RecordId}>
              <Record
                model={item}
                showComments={() => {
                  showComments(item.Model.RecordId),
                    getComments(item.Model.RecordId);
                }}
                createComment={(recordId: number, content: string) =>
                  createComment(recordId, content)
                }
              />
            </div>
          ))}
          <PagingHelper
            query={this.props.location.search}
            pagingInfo={this.props.data.PageInfo}
          />
        </>
      );
    } else {
      template = <p> No Records Yet </p>;
      // }
    }

    return template;
  }
}
