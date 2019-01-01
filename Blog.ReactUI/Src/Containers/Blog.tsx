import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as recordActions from "Actions/RecordActions";
import * as commentActions from "Actions/CommentActions";
import { IStoreState } from "Types/Index";
import ListViewModel from "Types/ListViewModel";
import ReturnModelDTO from "Types/ReturnModelDTO";
import RecordDTO from "Types/RecordDTO";
import React from "react";
import queryString from "querystring";
import { Link } from "react-router-dom";
import SearchHelper from "Components/Helpers/SearchHelper";
import PagingHelper from "Components/Helpers/PagingHelper";
import Record from "Components/records/Record";
import CommentDTO from "Types/CommentDTO";
import SearchQuery from "Types/SearchQuery";

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
    ) as any) as SearchQuery);

    getRecords(search);
  }

  public componentDidUpdate() {
    const { data, location, isLoading, getRecords } = this.props;

    let search = Object.assign(new SearchQuery(), (queryString.parse(
      location.search.replace("?", "")
    ) as any) as SearchQuery);

    if (
      !isLoading &&
      (search.Page != data.PageInfo.CurrentPage ||
        search.SearchString != data.SearchString)
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
      showComments,
    } = this.props;

    return (
      <>
        <Link className="btn btn-primary" to="/Add">
          Create New Record
        </Link>

        <SearchHelper />

        {data.List.map(item => (
          <Record
            key={item.Model.RecordId}
            model={item}
            showComments={() => {
              showComments(item.Model.RecordId),
                getComments(item.Model.RecordId);
            }}
            createComment={(data: CommentDTO) => createComment(data)}
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
    isCommentsLoading: records.isCommentsLoading,
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

    showComments: (id: number) => dispatch(recordActions.ShowComments(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog);
