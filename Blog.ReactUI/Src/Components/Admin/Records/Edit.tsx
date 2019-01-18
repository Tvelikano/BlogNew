import Record from "Types/Records/Record";
import React from "react";
import { Link } from "react-router-dom";
import RecordState from "Types/Records/RecordState";
import ModelErrors from "Components/ModelErrors";
import ModelState from "Types/ModelState";

interface IProps {
  record: Record;
  match: {
    params: {
      id: number;
    };
  };
  isLoading: boolean;
  error: ModelState;
  GetRecord: (id: number) => void;
  UpdateRecord: (data: Record) => void;
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
      RecordState[
        this.recordState.current!.value as keyof typeof RecordState
      ];

    UpdateRecord(record);
  };

  public componentDidMount() {
    this.props.GetRecord(this.props.match.params.id);
  }

  public render() {
    const { record, error, isLoading } = this.props;

    return !isLoading && record ? (
      <div className="container pt-2">
        <h4>Редактировать запись</h4>
        <hr />
        <ModelErrors error={error} />

        <form className="add" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="recordName">Заголовок</label>

            <input
              required
              id="recordName"
              aria-describedby="recordNameHelp"
              placeholder="Введите заголовок"
              className="form-control"
              ref={this.name}
              defaultValue={record.Name}
            />

            <small id="recordNameHelp" className="form-text text-muted">
              Краткое описание новости
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="recordContent">Оснавная часть</label>

            <textarea
              required
              id="recordContent"
              aria-describedby="recordContentHelp"
              placeholder="Введите основную часть"
              className="form-control"
              ref={this.content}
              defaultValue={record.Content}
            />

            <small id="recordContentHelp" className="form-text text-muted">
              Основная часть не должна быть больше 10000 символов
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="recordState">Кому видна</label>

            <select
              id="recordState"
              aria-describedby="recordStateHelp"
              placeholder="Введите имя"
              ref={this.recordState}
              className="form-control"
              defaultValue={RecordState[record.State]}
            >
              {Object.keys(RecordState)
                .filter(x => isNaN(Number(x)))
                .map(item => (
                  <option key={item}>{item}</option>
                ))}
            </select>

            <small id="recordStateHelp" className="form-text text-muted">
              - Private - Запись видна только Администратору
              <br /> - Internal - Запись видна только Зарегестрированным
              пользователям
              <br /> - Private - Запись видна всем
            </small>
          </div>

          <div className="form-group">
            <input type="submit" value="Изменить" className="btn btn-primary" />
          </div>
        </form>

        <div className="form-group">
          <Link to="/Admin/Records" className="btn btn-danger">
            Отмена
          </Link>
        </div>
      </div>
    ) : null;
  }
}
