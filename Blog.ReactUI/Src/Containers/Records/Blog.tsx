import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as recordActions from "Actions/RecordActions";
import * as commentActions from "Actions/CommentActions";
import { IStoreState } from "Types/Index";
import CommentDTO from "Types/CommentDTO";
import SearchQuery from "Types/SearchQuery";
import Blog from "Components/Records/Blog";

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
