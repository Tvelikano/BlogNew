import { connect } from "react-redux";
import * as actions from "Actions/RecordActions";
import { ThunkDispatch } from "redux-thunk";
import RecordDTO from "Types/Records/RecordDTO";
import { IStoreState } from "Types/Store/Index";
import { allowOnlyAdmin } from "Hocs/AllowOnlyAdmin";
import Edit from "Components/Admin/Records/Edit";

function mapStateToProps({ records }: IStoreState) {
  return {
    record: records.currentRecord.Model,
    error: records.error,
    isLoading: records.isLoading,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, actions.RecordActions>
) {
  return {
    GetRecord: async (id: number) => await dispatch(actions.GetRecord(id)),

    UpdateRecord: async (data: RecordDTO) =>
      await dispatch(actions.UpdateRecord(data)),
  };
}

export default allowOnlyAdmin(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Edit)
);
