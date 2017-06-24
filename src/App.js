import React, { Component } from 'react';
import './App.css';
import CharacterPicker from './CharacterPicker.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.logCards = this.logCards.bind(this);
    this.setCharacters = this.setCharacters.bind(this);
    this.state = {
      characters: [],
      currentCharacters: [],
      upgrades: [],
      currentUpgrades: [],
      supports: [],
      currentSupports: [],
      events: [],
      currentEvents: []
    }
  }

  processCards(cards) {
    let characters = this.pullTypeFromCards(cards, "character");
    let supports = this.pullTypeFromCards(cards, "support");
    let events = this.pullTypeFromCards(cards, "event");
    let upgrades = this.pullTypeFromCards(cards, "upgrade");
    this.setState({characters, supports, events, upgrades});
  }

  pullTypeFromCards(cards, type) {
    return cards.filter(card => {
      return card.type_code === type;
    });
  }

  componentDidMount() {
    fetch("https://swdestinydb.com/api/public/cards/")
    .then((response) => response.json())
      .then((cards) => {
        this.processCards(cards);
      })
      .catch((error) => {
        console.error(error);
      });

  }

  renderCard(card) {
    return(
      <div className="card" key={card.code}>
        <img className="card-art" src={card.imagesrc} alt="card art"/>
        <div className="card-info">
          <span>{card.name}</span>
          <span>{card.text}</span>
        </div>
      </div>
    );
  }

  logCards() {
    console.log(this.state.currentCharacters);
  }

  setCharacters(currentCharacters) {
    this.setState({currentCharacters});
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2 onClick={this.logCards}>Destiny Deck Builder</h2>
        </div>
        <div className="app-body">
          <div>
            <h1>Character(s)</h1>
            <CharacterPicker 
              characters={this.state.characters}
              currentCharacters={this.state.currentCharacters}
              setCharacters={this.setCharacters} />
          </div>
          <div className="deck-picker">
            <h1>Cards</h1>
          </div>
          <div className="battlefield-picker">
            <h1>Battlefield</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
