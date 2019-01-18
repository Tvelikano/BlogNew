import * as React from "react";
import ClientWeather from "Types/Weather/ClientWeather";

interface IProps {
  isLoading: boolean;
  error: string;
  data: ClientWeather;
  GetWeather: () => void;
}

export default class Weather extends React.PureComponent<IProps> {
  componentDidMount() {
    this.props.GetWeather();
  }

  public render() {
    const { isLoading, data, GetWeather } = this.props;

    return !isLoading && data ? (
      <div className="panel panel-default text-light">
        <span className="align-middle h4 mr-1">
          {data.Temperature >= 0 ? `+${data.Temperature}` : data.Temperature}
        </span>
        <span className="align-bottom font-weight-light text-capitalize">
          {` ${data.Description}`}
        </span>

        <button onClick={GetWeather} className="btn btn-primary-outline">
          <i className="fa fa-sync-alt text-light" aria-hidden="true" />
        </button>
      </div>
    ) : null;
  }
}
