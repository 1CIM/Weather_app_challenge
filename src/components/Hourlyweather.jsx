import React from "react";
import { Line } from "react-chartjs-2";
// import { Grid, Header } from "semantic-ui-react";

const Hourlyweather = ({ hourlyWeather }) => {
  let data;
  let hours = []
  let dataItems = []
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
    hours.push(hoursList[new Date(hourlyWeather[i].dt * 1000).getHours()])
    dataItems.push(hourlyWeather[i].temp)
  }
  data = {
    datasets: [
      {
        label: "Daily Temperature",
        data: dataItems,
        borderColor: "#ffffff",
        backgroundColor: "#000000",
        opacity: "0.5"
      },
    ],
    labels: hours
  }

  return (
    <div>
      <Line
        data={data}
        width={100}
        height={250}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
};

export default Hourlyweather;
