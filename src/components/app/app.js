import React, { Component } from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorButton from "../error-button";
import ErrorIndicator from "../error-indicator";
import PeoplePage from "../people-page";
import ItemList from "../item-list/item-list";
import PersonDetails from "../person-details/item-details";

import "./app.css";
import SwapiService from "../../services/swapi-service";
import Row from "../row/row";

export default class App extends Component {
  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false,
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet,
      };
    });
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    const { getPerson, getStarship, getPersonImage, getStarshipImage } = this.swapiService

    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

    const personDetails = (
      <PersonDetails getData={getPerson} getImageUrl={getPersonImage} personId={11} />
    );

    const starshipDetails = (
      <PersonDetails getData={getStarship} personId={5} getImageUrl={getStarshipImage} />
    );

    return (
      <div className="stardb-app">
        <Header />
        {/* {planet}

        <div className="row mb2 button-row">
          <button
            className="toggle-planet btn btn-warning btn-lg"
            onClick={this.toggleRandomPlanet}
          >
            Toggle Random Planet
          </button>
          <ErrorButton />
        </div>

        <PeoplePage /> */}
        <Row left={personDetails} right={starshipDetails} />
      </div>
    );
  }
}
