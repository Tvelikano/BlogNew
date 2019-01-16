import { connect } from "react-redux";
import * as actions from "Actions/WeatherActions";
import { ThunkDispatch } from "redux-thunk";
import { IStoreState } from "Types/Store/Index";
import Weather from "Components/Weather/Weather";

function mapStateToProps({ weather }: IStoreState) {
  return {
    isLoading: weather.isLoading,
    data: weather.data,
    error: weather.error,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, actions.WeatherActions>
) {
  return {
    GetWeather: () => dispatch(actions.GetWeather()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Weather);
