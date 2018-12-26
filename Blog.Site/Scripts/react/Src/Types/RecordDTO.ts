import RecordStateDTO from "types/RecordStateDTO";
import UserDTO from "types/UserDTO";
import CommentDTO from "types/CommentDTO";

export default class RecordDTO {
  public RecordId: number;

  public Name: string;

  public Content: string;

  public CreateDate: Date;

  public State: RecordStateDTO;

  public Comments: CommentDTO[];

  public UserId: string;

  public User: UserDTO;
}
