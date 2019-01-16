import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as recordActions from "Actions/RecordActions";
import * as commentActions from "Actions/CommentActions";
import { IStoreState } from "Types/Store/Index";
import CommentDTO from "Types/Comments/CommentDTO";
import SearchQuery from "Types/SearchQuery";
import Main from "Components/Main";

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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
