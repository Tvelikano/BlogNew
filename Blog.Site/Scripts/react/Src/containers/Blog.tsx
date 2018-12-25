import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as recordActions from "actions/RecordActions";
import * as commentActions from "actions/CommentActions";
import { IStoreState } from "types/Index";
import ListViewModel from "types/ListViewModel";
import ReturnModelDTO from "types/ReturnModelDTO";
import RecordDTO from "types/RecordDTO";
import React from "react";
import queryString from "querystring"
import { Link } from "react-router-dom";
import SearchHelper from "components/helpers/SearchHelper";
import PagingHelper from "components/helpers/PagingHelper";
import Record from "components/records/Record"
import CommentDTO from "types/CommentDTO";
import SearchQuery from "types/SearchQuery";

interface IProps {
  data: ListViewModel<ReturnModelDTO<RecordDTO>>;
  isLoading: boolean;
  isCommentsLoading: boolean;
  location: {
    search: string;
  };
  getRecords: (searchQuery: SearchQuery) => void;
  getComments: (id: number) => void;
  createComment: (data: CommentDTO) => void;
  showComments: (id: number) => void;
}

class Blog extends React.Component<IProps> {
  public componentDidMount() {
    const { location, getRecords } = this.props;

    let search = Object.assign(new SearchQuery(), (queryString.parse(
      location.search.replace("?", "")
    ) as any) as SearchQuery) 

    getRecords(search);
  }

  public componentDidUpdate() {
    const { data, location, isLoading, getRecords } = this.props;

    let search = Object.assign(new SearchQuery(), (queryString.parse(
      location.search.replace("?", "")
    ) as any) as SearchQuery) 

    if (
      !isLoading &&
      ((search.Page != data.PageInfo.CurrentPage) ||
        (search.SearchString != data.SearchString))
    ) {
      getRecords(search);
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
            createComment={(data: CommentDTO) =>
              createComment(data)
            }
          />
        ))}
        <PagingHelper query={location.search} pagingInfo={data.PageInfo} />
      </>
    );
  }
}

function mapStateToProps({ records }: IStoreState) {
  return {
    data: records.data,
    error: records.error,
    isLoading: records.isLoading,
    isCommentsLoading: records.isCommentsLoading
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<
    {},
    {},
    recordActions.RecordActions | commentActions.CommentActions
  >
) {
  return {
    getRecords: async (searchQuery: SearchQuery) =>
      await dispatch(recordActions.GetRecords(searchQuery)),

    getComments: (id: number) => dispatch(commentActions.getComments(id)),

    createComment: (data: CommentDTO) =>
      dispatch(commentActions.createComment(data)),

    showComments: (id: number) => dispatch(recordActions.ShowComments(id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog);
