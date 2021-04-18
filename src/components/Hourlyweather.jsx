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
      <Grid.Column key={i} textAlign="center">
        <Header.Content>
          {hoursList[new Date(hourlyWeather[i].dt * 1000).getHours()]}
        </Header.Content>
        <Header.Content>{hourlyWeather[i].weather[0].main}</Header.Content>
        <Header.Content>{hourlyWeather[i].temp}°C</Header.Content>
      </Grid.Column>
    );
  }

  return (
      <Grid columns="12" id="hou" divided>
        <Grid.Row data-cy="twenty-four-list" className="ro"><Grid.Row ></Grid.Row>
        {hourlyWeatherList}</Grid.Row>
      </Grid>

  );
};

export default Hourlyweather;
