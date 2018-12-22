import PagingInfo from "types/PagingInfo";

export default class ListViewModel<T> {
  public List: T[] = new Array<T>();

  public PageInfo: PagingInfo = new PagingInfo();

  public SearchString: string;
}
