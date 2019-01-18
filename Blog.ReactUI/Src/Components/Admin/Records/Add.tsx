import Record from "Types/Records/Record";
import React from "react";
import { Link } from "react-router-dom";
import RecordState from "Types/Records/RecordState";
import ModelErrors from "Components/ModelErrors";
import ModelState from "Types/ModelState";
const { FilePond, registerPlugin } = require("react-filepond");
import "filepond/dist/filepond.min.css";
const FilePondPluginImageExifOrientation = require("filepond-plugin-image-exif-orientation");
const FilePondPluginImagePreview = require("filepond-plugin-image-preview");
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

interface IProps {
  error: ModelState;
  AddRecord: (data: Record) => void;
}

export default class Add extends React.PureComponent<IProps> {
  private name = React.createRef<HTMLInputElement>();
  private content = React.createRef<HTMLTextAreaElement>();
  private recordState = React.createRef<HTMLSelectElement>();

  private handleSubmit: React.ReactEventHandler<HTMLFormElement> = ev => {
    ev.preventDefault();

    const data = new Record();
    data.Name = this.name.current!.value;
    data.Content = this.content.current!.value;

    this.props.AddRecord(data);
  };

  public render() {
    const { error } = this.props;

    const server = {
      process: {
        url: "http://localhost:59525/api/Upload",
        method: "POST" as "GET" | "POST" | "PUT" | "DELETE",
        withCredentials: true,
        onload: (response: any) => {
          this.content.current!.value = `${
            this.content.current!.value
          }\n<img width="100%" src=${response}>`;
        },
      },
      revert: "./revert",
      restore: "./restore/",
      load: "./load/",
      fetch: "./fetch/",
    };

    return (
      <div className="container pt-2">
        <h4>Новая запись</h4>
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
              cols={50}
              ref={this.content}
            />

            <small id="recordContentHelp" className="form-text text-muted">
              Основная часть не должна быть больше 10000 символов
            </small>
          </div>

          <div className="form-group">
            <FilePond allowMultiple={true} maxFiles={3} server={server} />
          </div>

          <div className="form-group">
            <label htmlFor="recordState">Кому видна</label>

            <select
              id="recordState"
              aria-describedby="recordStateHelp"
              placeholder="Введите имя"
              ref={this.recordState}
              className="form-control"
              defaultValue={RecordState[0]}
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
            <input type="submit" value="Создать" className="btn btn-primary" />
          </div>

          <div className="form-group">
            <Link to="/Admin/Records" className="btn btn-danger">
              Отмена
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
