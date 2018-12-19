declare class RecordDTO {
  public RecordId: number;

  public Name: string;

  public Content: string;

  public CreateDate: string;

  public State: RecordStateDTO;

  public Comments: CommentDTO[];

  public UserId: string;

  public User: UserDTO;
}
