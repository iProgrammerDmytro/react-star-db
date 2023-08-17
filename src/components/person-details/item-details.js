import React, { Component } from "react";

import "./item-details.css";
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";
import ErrorButton from "../error-button";

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{field}</span>
    </li>
  );
};

export {
  Record
}

export default class PersonDetails extends Component {
  swapiService = new SwapiService();

  state = {
    person: null,
    loading: true,
    image: null,
  };

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.setState({ loading: true });
      this.updatePerson();
    }
  }

  onPersonLoaded = (person) => {
    const { getImageUrl } = this.props;

    this.setState({
      person,
      loading: false,
      image: getImageUrl(person),
    });
  };

  updatePerson() {
    const { personId, getData } = this.props;

    if (!personId) {
      return;
    }

    getData(personId).then(this.onPersonLoaded);
  }

  render() {
    const { person, loading, image } = this.state;
    console.log(this.props.children)

    if (!person) {
      return <span>Select a person from a list!</span>;
    }

    const content = loading ? (
      <Spinner />
    ) : (
      <PersonView person={person} image={image} children={this.props.children} />
    );

    return <div className="person-details card">{content}</div>;
  }
}

const PersonView = ({
  person,
  image,
  children
}) => {
  return (
    <React.Fragment>
      <img className="person-image" src={image} alt="character" />

      <div className="card-body">
        <h4>{person.name}</h4>
        <ul className="list-group list-group-flush">
          {
            React.Children.map(children, (child, idx) => {
              return child
            })
          }
        </ul>
        <div className="row mb2 button-row">
          <ErrorButton />
        </div>
      </div>
    </React.Fragment>
  );
};
