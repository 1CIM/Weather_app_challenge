import React from "react";
import { Grid, Header } from "semantic-ui-react";

const Hourlyweather = ({ hourlyWeather }) => {
  const hourlyWeatherList = [];
  for (let i = 0; i < hourlyWeather.length - 24; i++) {
    const hoursList = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
    ];
    hourlyWeatherList.push(
      <Grid.Column data-cy="twenty-four-list-items" key={i} textAlign="center">
        <Header.Content data-cy="hour">
          {hoursList[new Date(hourlyWeather[i].dt * 1000).getHours()]}
        </Header.Content>
        <Header.Content data-cy="hourly-weather">
          {hourlyWeather[i].weather[0].description}
        </Header.Content>
        <Header.Content data-cy="hourly-temp">
          {hourlyWeather[i].temp}°C
        </Header.Content>
      </Grid.Column>
    );
  }

  return (
    <div>
      <Grid divided="vertically" celled columns={12}>
        <Grid.Row id="opaci" color="black" inverted data-cy="twenty-four-list">
          {hourlyWeatherList}
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Hourlyweather;
