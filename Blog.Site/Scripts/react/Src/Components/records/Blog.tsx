import * as React from "react";
import Record from "components/records/Record";
import PagingHelper from "components/helpers/PagingHelper";
import queryString from "querystring";
import SearchHelper from "components/helpers/SearchHelper";
import { Link } from "react-router-dom";
import ReturnModelDTO from "types/ReturnModelDTO";
import RecordDTO from "types/RecordDTO";
import ListViewModel from "types/ListViewModel";

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
  public componentDidMount() {
    const { location, getRecords } = this.props;

    let search = (queryString.parse(
      location.search.replace("?", "")
    ) as any) as {
      searchString: string;
      page: number;
    };

    getRecords(search.searchString, search.page);
  }

  public componentDidUpdate() {
    const { data, location, isLoading, getRecords } = this.props;

    let search = (queryString.parse(
      location.search.replace("?", "")
    ) as any) as {
      searchString: string;
      page: number;
    };

    if (
      !isLoading &&
      ((search.page && search.page != data.PageInfo.CurrentPage) ||
        (search.searchString && search.searchString != data.SearchString))
    ) {
      getRecords(search.searchString, search.page);
    }
  }

  public render() {
    const {
      location,
      data,
      getComments,
      createComment,
      showComments
    } = this.props;

    return (
      <>
        <Link className="btn btn-primary" to="/Add">
          Create New Record
        </Link>
        <SearchHelper
          query={
            (queryString.parse(location.search.replace("?", "")) as any) as {
              searchString: string;
              page: number;
            }
          }
        />
        {data.List.map(item => (
          <Record
            key={item.Model.RecordId}
            model={item}
            showComments={() => {
              showComments(item.Model.RecordId),
                getComments(item.Model.RecordId);
            }}
            createComment={(recordId: number, content: string) =>
              createComment(recordId, content)
            }
          />
        ))}
        <PagingHelper query={location.search} pagingInfo={data.PageInfo} />
      </>
    );
  }
}
