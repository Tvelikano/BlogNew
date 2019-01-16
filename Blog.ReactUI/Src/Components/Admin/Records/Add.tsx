import RecordDTO from "Types/Records/RecordDTO";
import React from "react";
import { Link } from "react-router-dom";
import RecordStateDTO from "Types/Records/RecordStateDTO";

interface IProps {
  AddRecord: (data: RecordDTO) => void;
}

export default class Add extends React.PureComponent<IProps> {
  private name = React.createRef<HTMLInputElement>();
  private content = React.createRef<HTMLTextAreaElement>();
  private recordState = React.createRef<HTMLSelectElement>();

  private handleSubmit: React.ReactEventHandler<HTMLFormElement> = ev => {
    ev.preventDefault();

    const data = new RecordDTO();
    data.Name = this.name.current!.value;
    data.Content = this.content.current!.value;

    this.props.AddRecord(data);
  };

  public render = () => (
    <div className="container">
      <h4>Новая запись</h4>

      <form className="add" onSubmit={this.handleSubmit}>
        <div className="form-group">
          Заголовок:
          <div className="col-md-10">
            <input required className="form-control" ref={this.name} />
          </div>
        </div>

        <div className="form-group">
          Оснавная часть:
          <div className="col-md-10">
            <textarea required className="form-control" ref={this.content} />
          </div>
        </div>

        <div className="form-group">
          Кому видна:
          <select
            name="State"
            ref={this.recordState}
            defaultValue={RecordStateDTO[0]}
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
            <input type="submit" value="Создать" className="btn btn-primary" />
          </div>
        </div>
      </form>

      <Link to="/Admin/Records" className="btn btn-danger">
        Отмена
      </Link>
    </div>
  );
}
