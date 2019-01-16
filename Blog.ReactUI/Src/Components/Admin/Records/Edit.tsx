import RecordDTO from "Types/Records/RecordDTO";
import React from "react";
import { Link } from "react-router-dom";
import RecordStateDTO from "Types/Records/RecordStateDTO";

interface IProps {
  record: RecordDTO;
  match: {
    params: {
      id: number;
    };
  };
  isLoading: boolean;
  GetRecord: (id: number) => void;
  UpdateRecord: (data: RecordDTO) => void;
}

export default class Edit extends React.PureComponent<IProps> {
  private name = React.createRef<HTMLInputElement>();
  private content = React.createRef<HTMLTextAreaElement>();
  private recordState = React.createRef<HTMLSelectElement>();

  private handleSubmit: React.ReactEventHandler<HTMLFormElement> = ev => {
    ev.preventDefault();

    const { record, UpdateRecord } = this.props;

    record.RecordId = this.props.match.params.id;
    record.Name = this.name.current!.value;
    record.Content = this.content.current!.value;
    record.State =
      RecordStateDTO[
        this.recordState.current!.value as keyof typeof RecordStateDTO
      ];

    UpdateRecord(record);
  };

  public componentDidMount() {
    this.props.GetRecord(this.props.match.params.id);
  }

  public render() {
    const { record, isLoading } = this.props;
    return !isLoading && record ? (
      <div className="container">
        <h4>Редактировать запись</h4>

        <form className="add" onSubmit={this.handleSubmit}>
          <div className="form-group">
            Заголовок:
            <div className="col-md-10">
              <input
                required
                className="form-control"
                ref={this.name}
                defaultValue={record.Name}
              />
            </div>
          </div>

          <div className="form-group">
            Основная часть:
            <div className="col-md-10">
              <textarea
                required
                className="form-control"
                ref={this.content}
                defaultValue={record.Content}
              />
            </div>
          </div>

          <div className="form-group">
            Кому видна:
            <select
              name="State"
              ref={this.recordState}
              defaultValue={RecordStateDTO[record.State]}
            >
              {Object.keys(RecordStateDTO)
                .filter(x => isNaN(Number(x)))
                .map(item => (
                  <option key={item}>{item}</option>
                ))}
            </select>
          </div>

          <div className="form-group">
            <div className="col-md-10">
              <input
                type="submit"
                value="Изменить"
                className="btn btn-primary"
              />
            </div>
          </div>
        </form>

        <Link to="/Admin/Records" className="btn btn-danger">
          Отмена
        </Link>
      </div>
    ) : null;
  }
}
