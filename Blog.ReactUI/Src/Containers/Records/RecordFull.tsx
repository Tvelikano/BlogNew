import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as recordActions from "Actions/RecordActions";
import * as commentActions from "Actions/CommentActions";
import { IStoreState } from "Types/Index";
import CommentDTO from "Types/CommentDTO";
import RecordFull from "Components/Records/RecordFull";

function mapStateToProps({ records, account }: IStoreState) {
  return {
    isAuthenticated: account.isAuthenticated,
    currentRecord: records.currentRecord,
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
    GetRecord: async (id: number) =>
      await dispatch(recordActions.GetRecord(id)),

    GetComments: (id: number) => dispatch(commentActions.getComments(id)),

    CreateComment: (data: CommentDTO) =>
      dispatch(commentActions.createComment(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordFull);
