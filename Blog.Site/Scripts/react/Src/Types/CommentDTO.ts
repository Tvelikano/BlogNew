import RecordDTO from "types/RecordDTO";
import UserDTO from "types/UserDTO";

export default class CommentDTO {
  public CommentId: number;

  public Content: string;

  public CreateDate: string;

  public RecordId: number;

  public Record: RecordDTO;

  public UserId: number;

  public User: UserDTO;
}
