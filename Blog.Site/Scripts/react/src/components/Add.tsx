import * as React from "react";

interface IProps {
  addRecord: (data: RecordDTO) => void;
}

export default class Add extends React.Component<IProps, object> {
  private name = React.createRef<HTMLInputElement>();
  private content = React.createRef<HTMLTextAreaElement>();

  public render() {
    return (
      <form className="add" onSubmit={this.handleSubmit}>
        <input
          required
          id="author"
          type="text"
          ref={this.name}
          className="add__author"
          placeholder="Ваше имя"
        />
        <textarea
          required
          id="text"
          className="add__text"
          ref={this.content}
          placeholder="Заголовок новости"
        />
        <label className="add__checkrule">
          <input required type="checkbox" />Я согласен с правилами
        </label>
        <button className="add__btn">Добавить новость</button>
      </form>
    );
  }

  private handleSubmit: React.ReactEventHandler<HTMLFormElement> = ev => {
    ev.preventDefault();

    const name = this.name.current!.value;
    const content = this.content.current!.value;

    const data = {
      Name: name,
      Content: content,
      State: RecordStateDTO.Private
    };

    this.props.addRecord(data as RecordDTO);
  };
}
