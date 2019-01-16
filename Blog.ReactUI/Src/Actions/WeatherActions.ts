import * as Constants from "Actions/Constants/Weather";
import ClientWeather from "Types/Weather/ClientWeather";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

interface IGetWeatherRequest {
  type: Constants.GET_WEATHER_REQUEST;
}

interface IGetWeatherSuccess {
  type: Constants.GET_WEATHER_SUCCESS;
  data: ClientWeather;
}

interface IGetWeatherFail {
  type: Constants.GET_WEATHER_FAIL;
  data: Error;
}

export type WeatherActions =
  | IGetWeatherRequest
  | IGetWeatherSuccess
  | IGetWeatherFail;

export function GetWeather(): ThunkAction<
  Promise<void>,
  {},
  {},
  WeatherActions
> {
  return async (
    dispatch: ThunkDispatch<{}, {}, WeatherActions>
  ): Promise<void> => {
    dispatch({
      type: Constants.GET_WEATHER_REQUEST,
    });
    fetch("http://localhost:59525/api/weather")
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then(data => {
        dispatch({
          data,
          type: Constants.GET_WEATHER_SUCCESS,
        });
      })
      .catch(ex => {
        dispatch({
          data: new Error(ex),
          type: Constants.GET_WEATHER_FAIL,
        });
      });
  };
}
