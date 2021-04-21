import React, { Component } from "react"
import axios from "axios"
import { Line } from "react-chartjs-2"
import { Divider, Icon, Segment, Header, Grid } from "semantic-ui-react"
// Extra challenge 4
class App extends Component {
  state = {
    geolocation: {},
    location:{}
  }

  getGeolocation = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })

  async componentDidMount() {
      let geoloc = await this.getGeolocation
      this.setState({ geolocation: geoloc.coords })
      let {latitude, longitude } = geoloc.coords
      let openCageKey= process.env.REACT_APP_OPEN_CAGE_KEY
      let openWeatherKey= process.env.REACT_APP_OPEN_WEATHER_KEY
      let locationResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${openCageKey}`)
      let weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely&appid=${openWeatherKey}`)

      let weatherInfo = {
        city: locationResponse.data.results[0].components.postal_city ? locationResponse.data.results[0].components.postal_city : locationResponse.data.results[0].components.city,
        temp: weatherResponse.data.current.temp,
        weather: weatherResponse.data.current.weather[0].main
      }
      this.setState({ location: weatherInfo })
  }

  render() {
    const { location, dailyTemp } = this.state;
    let labels = []
    let dataItems = []
    let data
    if (dailyTemp) {
      dailyTemp.forEach(day => {
        labels.push(new Date(day.dt * 1000).toLocaleDateString())
        dataItems.push(day.temp.day)
      })
      data = { labels: labels, datasets: [{ label: "Dayly Temp", data: dataItems }] }
    } 
    return(
      <Container data-cy="weather-display" fluid>
        {/* <Image class="background" src="https://images.unsplash.com/photo-1508020963102-c6c723be5764?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3450&q=80" fluid alt="clouds"/> */}
      <h1 data-cy="location">{this.state.location.city}</h1>
      <h2 data-cy="temp">{this.state.location.temp}°C</h2>
      <h2 data-cy="weather-type">{this.state.location.weather}°C</h2>
      </Container>
    )

      <div className="main-container" data-cy="weather-display">
        <Header size="huge" textAlign="center">Your Location</Header>
        <Segment className="main-segment" placeholder>
          <Grid columns={2} stackable textAlign="center">
            <Divider vertical />
            <Grid.Row>
              <Grid.Column>
                <Header data-cy="data" icon>
                  <Icon name="world" />
                  Your location: {location.location}
                  <br/>
                  The temperature: {location.temperature}°C
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header data-cy="weather" icon>
                  <Icon name="snowflake" />
                  Weather:
                  <p>{location.weather && (location.weather[0].main)}</p>
                </Header>
              </Grid.Column>
            </Grid.Row>
            {dailyTemp && <Line data={data} />}
          </Grid>
        </Segment>
      </div>
      // <Container data-cy="weather-display" fluid>
      //   {/* <Image class="background" src="https://images.unsplash.com/photo-1508020963102-c6c723be5764?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3450&q=80" fluid alt="clouds"/> */}
      // <h1 data-cy="location">{this.state.location.city}</h1>
      // <h2 data-cy="temp">{this.state.location.temp}°C</h2>
      // <h2 data-cy="weather-type">{this.state.location.weather}</h2>
      // </Container>
    );

  }
}
export default App;