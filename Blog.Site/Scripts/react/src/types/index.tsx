import { RouterState } from "connected-react-router";

export interface IStoreState {
  records: IRecordState;
  comments: ICommentState;
  router: RouterState;
}

export interface IRecordState {
  data: ListViewModel<ReturnModelDTO<RecordDTO>>;
  isLoading: boolean;
  error: string;
}

export interface ICommentState {
  data: ReturnListDTO<CommentDTO>;
  isLoading: boolean;
  error: string;
}
