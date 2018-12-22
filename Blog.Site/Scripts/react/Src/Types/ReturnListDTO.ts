export default class ReturnListDTO<T> {
  public List: T[] = new Array<T>();

  public Count: number;

  public Info: any;
}
