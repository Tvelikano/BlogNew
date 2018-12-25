import * as React from "react";
import { Link } from "react-router-dom";
import queryString from "querystring";

interface IState {
  SearchString: string;
}

export default class SearchHelper extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = { SearchString: "" };
  }

  private handleChange: React.ReactEventHandler<HTMLInputElement> = ev => {
    this.setState({ SearchString: ev.currentTarget.value });
  };

  public render = () => (
    <div className="input-group">
      <input
        onChange={this.handleChange}
        className="form-control"
        placeholder="Search..."
      />

      <div className="input-group-append">
        <Link
          type="submit"
          className="btn btn-info"
          to={`?${queryString.stringify({SearchString: this.state.SearchString})}`}
        >
          Search
        </Link>
      </div>
    </div>
  );
}
