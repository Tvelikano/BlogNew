import * as React from "react";
import { Link } from "react-router-dom";
import queryString from "querystring";

interface IProps {
  query: { searchString: string; page: number };
}

interface IState {
  search: string;
}

export default class SearchHelper extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { search: "" };
  }

  private handleChange: React.ReactEventHandler<HTMLInputElement> = ev => {
    this.setState({ search: ev.currentTarget.value });
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
          to={`?${queryString.stringify({
            searchString: this.state.search,
            page: 1
          })}`}
        >
          Search
        </Link>
      </div>
    </div>
  );
}
