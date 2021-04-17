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
      cy.get("[data-cy=weather-type]").should("contain", "Clouds");
    });
  });

  it("is expected to show 7 day forecast when seven days button is clicked", () => {
    cy.get("[data-cy=weather-display]").within(() => {
      cy.get("[data-cy=seven-days-list]").should("not.exist")
      cy.get("[data-cy=seven-days]").click()
      cy.get("[data-cy=seven-days-list]").children().should("have.length", 7)
    })
  })

  it("shows the seven days daily temp", () => {
    cy.get("[data-cy=seven-days-list]").within(() => {
      cy.get("[data-cy=seven-days-list-items]")
      .first()
      .find("[data-cy=daily-temp]")
      .should("contain", "9.51°C")
    })
  })

  it("shows the seven days daily weather type", () => {
    cy.get("[data-cy=seven-days-list]").within(() => {
      cy.get("[data-cy=seven-days-list-items]")
      .first()
      .find("[data-cy=daily-weather]")
      .should("contain", "Clouds")
    })
  })

  
});
