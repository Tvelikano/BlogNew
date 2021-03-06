import RecordDTO from "types/RecordDTO";
import UserDTO from "types/UserDTO";

export default class CommentDTO {
  public CommentId: number;

  public Content: string;

  public CreateDate: Date;

  public RecordId: number;

  public Record: RecordDTO;

  public UserId: number;

  public User: UserDTO;
}
