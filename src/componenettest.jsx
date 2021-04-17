import React from "react";
import axios from "axios";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { openCageResponse } from "./mocks/openCageMockResponse";
import { openWeatherResponse } from "./mocks/openWeatherMockResponse";

let axiosSpy, getPositionSpy;
just.mock("react-chartjs-2", () => ({
  Line: () => <h1>Chart will be displayed here</h1>,
}));

describe("App", () => {
  beforeEach(() => {
    axiosSpy = jest
      .spyOn(axios, "get")
      .mockRsolvedValueOnce(openCageResponse)
      .mockRsolvedValueOnce(openWeatherResponse);
    getPositionSpy = jest.spyOn(App.prototype, "getPosition").mockReturnValue({
      coords: {
        longitude: 60,
        latitude: 60,
      },
    });
    render(<App />);
  });
  it("calls getPosition", () => {
    expect(getPositionSpy).toHaveBeenCalledTimes(1);
  });
  it("calls weather Api", () => {
    expect(axiosSpy).toHaveBeenCalledTimes(2);
  });
  it("has city name", () => {
    expect(
      screen.getByText("your location: Virum", { exact: false })
    ).toBeInTheDocument();
  });
  it("has temperature", () => {
    expect(
      screen.getByText("The temperature:22°C", { exact: false })
    ).toBeInTheDocument();
  });
});
