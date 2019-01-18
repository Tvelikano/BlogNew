import * as Constants from "Actions/Constants/Weather";
import { IWeatherState } from "Types/Store/Index";
import { WeatherActions } from "Actions/WeatherActions";

const initialState: IWeatherState = {
  data: null,
  isLoading: false,
  error: "",
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
        isLoading: false,
      };
    }

    case Constants.GET_WEATHER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.data.message,
      };

    default:
      return state;
  }
}
