import { RouterState } from "connected-react-router";
import ReturnModelDTO from "./ReturnModelDTO";
import RecordDTO from "./RecordDTO";

export interface IStoreState {
  records: IRecordState;
  router: RouterState;
}

export interface IRecordState {
  data: ListViewModel<ReturnModelDTO<RecordDTO>>;
  isLoading: boolean;
  isCommentsLoading: boolean;
  error: string;
}
