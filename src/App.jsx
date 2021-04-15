import React, { Component } from "react"
import axios from "axios"

class App extends Component {
  state = {
    geolocation: {},
    location:{}
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(async position => {
      let openCageKey= process.env.REACT_APP_OPEN_CAGE_KEY
      let openWeatherKey= process.env.REACT_APP_OPEN_WEATHER_KEY
      let {latitude, longitude } = position.coords
      let locationResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${openCageKey}`)
      let weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely&appid=${openWeatherKey}`)

      let weatherInfo = {
        city: locationResponse.data.results[0].components.postal_city,
        temp: weatherResponse.data.current.temp
      }
      this.setState({ location: weatherInfo })
      debugger
      this.setState({ geolocation: position.coords })
    })
  }

  render() {
    return(
      <Container>
      <div data-cy="weather-display">
      <h1 data-cy='location'>{this.state.location.city}</h1>
      <h2 data-cy='temp'>{this.state.location.temp}°C</h2>
      </div>
      </Container>
    )
  }
}
export default App;