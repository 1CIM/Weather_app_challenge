import React, { Component } from "react";
import axios from "axios";
import { Container, Image, Header, Segment, Grid, Icon } from "semantic-ui-react";
import Weeklyweather from "./components/Weeklyweather.jsx";
import Hourlyweather from './components/Hourlyweather.jsx'

class App extends Component {
  state = {
    geolocation: {},
    location: {},
    dailyWeather: {},
    hourlyWeather: {},
  };

  getGeolocation = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  async componentDidMount() {
    let geoloc = await this.getGeolocation;
    let openCageKey = process.env.REACT_APP_OPEN_CAGE_KEY;
    let openWeatherKey = process.env.REACT_APP_OPEN_WEATHER_KEY;
    let { latitude, longitude } = geoloc.coords;
    let locationResponse = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${openCageKey}`
    );
    let weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely&appid=${openWeatherKey}`
    );
    // debugger;
    let weatherInfo = {
      city: locationResponse.data.results[0].components.postal_city
        ? locationResponse.data.results[0].components.postal_city
        : locationResponse.data.results[0].components.city,
      temp: weatherResponse.data.current.temp,
      weather: weatherResponse.data.current.weather[0].description,
      timezone:
        locationResponse.data.results[0].annotations.timezone.short_name,
    };
    this.setState({ 
    location: weatherInfo,
    dailyWeather: weatherResponse.data.daily,
    hourlyWeather: weatherResponse.data.hourly,
    geolocation: geoloc.coords });
  }

  render() {
    const { dailyWeather, hourlyWeather } = this.state;
    const{city, temp, weather, timezone} = this.state.location;
    return (
      <>
        <Container data-cy="weather-display" fluid>
          <Header as="h1" textAlign="center" style_id="head" >
            <Header.Content data-cy="location"><Icon size="large" name="building outline"/>
              {city}
            </Header.Content>
          </Header>
          <Segment float id="opaci" >
            <Grid verticalAlign="middle" columns={4} centered textAlign="left">
              <Grid.Row>
                <Grid.Column>
                  <Header textAlign="center" data-cy="temp"><Icon size="large" name="thermometer full"/>{temp}°C</Header>
                </Grid.Column>
                <Grid.Column>
                  <Header textAlign="center" data-cy="today" >Today</Header>
                  <br />
                  <Header textAlign="center" data-cy="timezone" ><Icon size="large" name="world"/>Time Zone: {timezone}</Header>
                </Grid.Column>
                <Grid.Column>
                  <Header textAlign="center" data-cy="weather-type">{weather}</Header>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <Container>
              <Weeklyweather dailyWeather={dailyWeather} />
              <Hourlyweather hourlyWeather={hourlyWeather} />
          </Container>
        </Container>
      </>
    );
  }
}
export default App;
