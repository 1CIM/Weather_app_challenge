describe("Shows 24h forecast", () => {
    
  beforeEach(() => {
    cy.intercept("https://api.openweathermap.org/data/2.5/**", {
      fixture: "weather_response.json",
    });
    cy.intercept("https://api.opencagedata.com/geocode/v1/json/**", {
      fixture: "location_response.json",
    });
  });
  it("loads fake data", () => {
    cy.visit("/", {
      onBeforeLoad(window) {
        const stubLocation = {
          coords: {
            latitude: 55.7842,
            longitude: 12.4518,
          },
        };
        cy.stub(window.navigator.geolocation, "getCurrentPosition").callsFake(
          (callback) => {
            return callback(stubLocation);
          }
        );
      },
    });
  });
  it("is expected to show 24h forecast when hourly button is clicked", () => {
    cy.get("[data-cy=weather-display]").within(() => {
      cy.get("[data-cy=twenty-four-list]").children().should("have.length", 24)
    })
  })

  it("shows hourly temp", () => {
    cy.get("[data-cy=twenty-four-list]").within(() => {
      cy.get("[data-cy=twenty-four-list-items]")
      .first()
      .find("[data-cy=hour]")
      .should("contain", "13")
    })
  })

  it("shows hourly temp", () => {
    cy.get("[data-cy=twenty-four-list]").within(() => {
      cy.get("[data-cy=twenty-four-list-items]")
      .first()
      .find("[data-cy=hourly-temp]")
      .should("contain", "9.38°C")
    })
  })

  it("shows the seven days daily weather type", () => {
    cy.get("[data-cy=twenty-four-list]").within(() => {
      cy.get("[data-cy=twenty-four-list-items]")
      .first()
      .find("[data-cy=hourly-weather]")
      .should("contain", "overcast clouds")
    })
  })
});