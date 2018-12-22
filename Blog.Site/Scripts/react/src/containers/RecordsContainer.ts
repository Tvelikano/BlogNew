import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as recordActions from "../Actions/RecordActions";
import * as commentActions from "../Actions/CommentActions";
import { IStoreState } from "../Types/Index";
import Blog from "../Components/Blog";

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
    getRecords: async (searchString: string, page: number) =>
      await dispatch(recordActions.GetRecords(searchString, page)),

    getComments: (id: number) => dispatch(commentActions.getComments(id)),

    createComment: (recordId: number, content: string) =>
      dispatch(commentActions.createComment(recordId, content)),

    showComments: (id: number) => dispatch(recordActions.ShowComments(id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog);
