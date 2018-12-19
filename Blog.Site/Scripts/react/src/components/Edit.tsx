import * as React from "react";

interface IProps {
  model: RecordDTO;
  updateArticle: (data: RecordDTO) => void;
}

export default class Edit extends React.Component<IProps, object> {
  private name = React.createRef<HTMLInputElement>();
  private content = React.createRef<HTMLTextAreaElement>();

  public componentDidMount() {
    this.name.current!.value = this.props.model.Name;
    this.content.current!.value = this.props.model.Content;
  }

  public render() {
    return (
      <form className="add" onSubmit={this.handleSubmit}>
        <input
          required
          id="name"
          type="text"
          ref={this.name}
          className="add__author"
        />
        <textarea
          required
          id="content"
          className="add__text"
          ref={this.content}
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

    const data = new RecordDTO();
    data.Name = name;
    data.Content = content;

    this.props.updateArticle(data);
  };
}
