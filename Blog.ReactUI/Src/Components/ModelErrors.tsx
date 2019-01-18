import * as React from "react";
import ModelState from "Types/ModelState";

interface IProps {
  error: ModelState;
}

export default class ModelErrors extends React.Component<IProps> {
  public render() {
    const { error } = this.props;
    let template = [];

    if (error && error.ModelState) {
      for (var key in error.ModelState) {
        template.push(<p className="text-danger">{error.ModelState[key]}</p>);
      }
    }

    return template;
  }
}
