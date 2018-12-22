import { RouterState } from "connected-react-router";
import ReturnModelDTO from "types/ReturnModelDTO";
import RecordDTO from "types/RecordDTO";
import ListViewModel from "types/ListViewModel";

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
