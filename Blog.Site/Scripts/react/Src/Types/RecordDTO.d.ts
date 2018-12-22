import RecordStateDTO from "./RecordStateDTO";
import UserDTO from "./UserDTO";
import { CommentDTO } from "./CommentDTO";

export default class RecordDTO {
  public RecordId: number;

  public Name: string;

  public Content: string;

  public CreateDate: string;

  public State: RecordStateDTO;

  public Comments: CommentDTO[];

  public UserId: string;

  public User: UserDTO;
}
