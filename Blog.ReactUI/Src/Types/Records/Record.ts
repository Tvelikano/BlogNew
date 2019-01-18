import RecordState from "Types/Records/RecordState";
import User from "Types/Account/User";
import Comment from "Types/Comments/Comment";

export default class Record {
  public RecordId: number;

  public Name: string;

  public Content: string;

  public CreateDate: Date;

  public State: RecordState;

  public Comments: Comment[];

  public UserId: number;

  public User: User;
}
