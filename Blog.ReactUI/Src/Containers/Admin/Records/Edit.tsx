import { connect } from "react-redux";
import * as actions from "Actions/RecordActions";
import { ThunkDispatch } from "redux-thunk";
import RecordDTO from "Types/RecordDTO";
import { IStoreState } from "Types/Index";
import { allowOnlyAdmin } from "Hocs/AllowOnlyAdmin";
import Edit from "Components/Admin/Records/Edit";

function mapStateToProps({ records }: IStoreState) {
  return {
    record:
      !records.isLoading && records.data.List
        ? records.data.List[0].Model
        : new RecordDTO(),
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
