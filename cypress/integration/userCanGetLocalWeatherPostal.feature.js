describe("weather info for user's location", () => {
    
  beforeEach(() => {
    cy.intercept("https://api.openweathermap.org/data/2.5/**", {
      fixture: "weather_response.json",
    });
    cy.intercept("https://api.opencagedata.com/geocode/v1/json/**", {
      fixture: "location_response.json",
    });
  });
  it("is expected to be displayed on initial render", () => {
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

    cy.get("[data-cy=weather-display]").within(() => {
      cy.get("[data-cy=temp]").should("contain", "17°C");
      cy.get("[data-cy=location]").should("contain", "Virum");
      cy.get("[data-cy=timezone]").should("contain", "CEST" )
      cy.get("[data-cy=today]").should("contain", "Today");
      cy.get("[data-cy=weather-type]").should("contain", "overcast clouds");
    });
  });
  
});
