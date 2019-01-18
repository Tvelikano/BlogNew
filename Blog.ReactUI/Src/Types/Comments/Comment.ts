import Record from "Types/Records/Record";
import User from "Types/Account/User";

export default class Comment {
  public CommentId: number;

  public Content: string;

  public CreateDate: Date;

  public RecordId: number;

  public Record: Record;

  public UserId: number;

  public User: User;
}
