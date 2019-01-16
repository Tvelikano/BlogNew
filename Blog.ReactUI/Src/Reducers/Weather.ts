import * as Constants from "Actions/Constants/Weather";
import { IWeatherState } from "Types/Store/Index";
import ClientWeather from "Types/Weather/ClientWeather";
import { WeatherActions } from "Actions/WeatherActions";

const initialState: IWeatherState = {
  data: new ClientWeather(),
  error: "",
  isLoading: false,
};

export default function weatherReducer(
  state: IWeatherState = initialState,
  action: WeatherActions
) {
  switch (action.type) {
    case Constants.GET_WEATHER_REQUEST:
      return { ...state, isLoading: true, error: "" };

    case Constants.GET_WEATHER_SUCCESS: {
      return {
        ...state,
        data: action.data,
        error: "",
        isLoading: false,
      };
    }

    case Constants.GET_WEATHER_FAIL:
      return {
        ...state,
        error: action.data.message,
        isLoading: false,
      };

    default:
      return state;
  }
}
