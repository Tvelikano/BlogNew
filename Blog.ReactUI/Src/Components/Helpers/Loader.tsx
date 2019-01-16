import * as React from "react";

export default class Loader extends React.Component<any> {
  public render() {
    return (
      <div id="loader-wrapper">
        <div id="loader" />

        <div className="loader-section section-left" />
        <div className="loader-section section-right" />
      </div>
    );
  }
}
