import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as actions from "../actions/RecordActions";
import { IStoreState } from "../types";
import Blog from "../components/Blog";

function mapStateToProps({ records }: IStoreState) {
  return {
    data: records.data,
    error: records.error,
    isLoading: records.isLoading
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<{}, {}, any>) {
  return {
    deleteRecord: (id: number) => dispatch(actions.deleteRecord(id)),
    editRecord: (id: number) => dispatch(actions.editRecord(id)),
    getRecords: async (searchString: string, page: number) =>
      await dispatch(actions.getRecords(searchString, page)),
    showComments: (id: number) => dispatch(actions.showComments(id)),
    updateRecord: (id: number, data: RecordDTO) =>
      dispatch(actions.updateRecord(id, data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog);
