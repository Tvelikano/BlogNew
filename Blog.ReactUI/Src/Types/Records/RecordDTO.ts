import RecordStateDTO from "Types/Records/RecordStateDTO";
import UserDTO from "Types/Account/UserDTO";
import CommentDTO from "Types/Comments/CommentDTO";

export default class RecordDTO {
  public RecordId: number;

  public Name: string;

  public Content: string;

  public CreateDate: Date;

  public State: RecordStateDTO;

  public Comments: CommentDTO[];

  public UserId: number;

  public User: UserDTO;
}
