import React from "react";
import { Link } from "react-router-dom";

interface CardProps {
  id: number;
}

export default class Popup extends React.Component<
  CardProps,
  { open: boolean }
> {
  constructor(props: CardProps) {
    super(props);
    this.state = { open: false };
  }

  public show() {
    this.setState({ open: true });
    setTimeout(() => this.setState({ open: false }), 5000);
  }

  public render() {
    return this.state.open ? (
      <div className="card">
        <div className="header">{this.props.id} id </div>
        <Link to={`/Record/${this.props.id}`} className="content">
          Новая запись
        </Link>
      </div>
    ) : null;
  }
}
