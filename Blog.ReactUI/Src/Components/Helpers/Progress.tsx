import * as React from "react";

export default class Progress extends React.Component<any> {
  public render() {
    return (
      <div id="progress" className="progress d-none">
        <div
          className="w-100 progress-bar progress-bar-striped active progress-bar-animated"
          role="progressbar"
          aria-valuenow={75}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    );
  }
}
