import RecordStateDTO from "Types/RecordStateDTO";
import UserDTO from "Types/UserDTO";
import CommentDTO from "Types/CommentDTO";

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
