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
  isAuthenticated: boolean;
  data: ListViewModel<ReturnModelDTO<RecordDTO>>;
  isLoading: boolean;
  isCommentsLoading: boolean;
  location: {
    search: string;
  };
  GetRecords: (searchQuery: SearchQuery) => void;
  GetComments: (id: number) => void;
  CreateComment: (data: CommentDTO) => void;
  ShowComments: (id: number) => void;
}

class Blog extends React.Component<IProps> {
  public componentDidMount() {
    const { location, GetRecords } = this.props;

    let search = Object.assign(new SearchQuery(), (queryString.parse(
      location.search.replace("?", "")
    ) as any) as SearchQuery);

    GetRecords(search);
  }

  public componentDidUpdate(prevProps: IProps) {
    const {
      data,
      location,
      isLoading,
      GetRecords,
      isAuthenticated,
    } = this.props;

    let search = Object.assign(new SearchQuery(), (queryString.parse(
      location.search.replace("?", "")
    ) as any) as SearchQuery);

    if (
      isAuthenticated !== prevProps.isAuthenticated ||
      (!isLoading &&
        (search.Page != data.PageInfo.CurrentPage ||
          search.SearchString != data.SearchString))
    ) {
      GetRecords(search);
    }
  }

  public render() {
    const {
      isAuthenticated,
      location,
      data,
      GetComments,
      CreateComment,
      ShowComments,
    } = this.props;

    return (
      <>
        <Link className="btn btn-primary" to="/Add">
          Create New Record
        </Link>

        <SearchHelper />

        {data.List.map(item => (
          <Record
            isAuthenticated={isAuthenticated}
            key={item.Model.RecordId}
            model={item}
            ShowComments={() => {
              ShowComments(item.Model.RecordId),
                GetComments(item.Model.RecordId);
            }}
            CreateComment={(data: CommentDTO) => CreateComment(data)}
          />
        ))}

        <PagingHelper query={location.search} pagingInfo={data.PageInfo} />
      </>
    );
  }
}

function mapStateToProps({ records, account }: IStoreState) {
  return {
    isAuthenticated: account.isAuthenticated,
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
    GetRecords: async (searchQuery: SearchQuery) =>
      await dispatch(recordActions.GetRecords(searchQuery)),

    GetComments: (id: number) => dispatch(commentActions.getComments(id)),

    CreateComment: (data: CommentDTO) =>
      dispatch(commentActions.createComment(data)),

    ShowComments: (id: number) => dispatch(recordActions.ShowComments(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog);
