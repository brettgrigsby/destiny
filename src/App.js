import React, { Component } from 'react';
import './App.css';
import CharacterPicker from './CharacterPicker.js';
import DeckPicker from './DeckPicker.js';
import SelectableList from './SelectableList.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.logCards = this.logCards.bind(this);
    this.setCharacters = this.setCharacters.bind(this);
    this.updateBattlefield = this.updateBattlefield.bind(this);
    this.state = {
      alignment: null,
      colors: [],
      characters: [],
      currentCharacters: [],
      upgrades: [],
      currentUpgrades: [],
      supports: [],
      currentSupports: [],
      events: [],
      currentEvents: [],
      battlefields: [],
      currentBattlefield: []
    }
  }

  processCards(cards) {
    let characters = this.pullTypeFromCards(cards, "character");
    let supports = this.pullTypeFromCards(cards, "support");
    let events = this.pullTypeFromCards(cards, "event"); 
    let upgrades = this.pullTypeFromCards(cards, "upgrade");
    let battlefields = this.pullTypeFromCards(cards, "battlefield");
    this.setState({characters, supports, events, upgrades, battlefields});
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
    if(currentCharacters.length > 0) {
      this.setState({
        alignment: currentCharacters[0].affiliation_code,
        colors: currentCharacters.reduce((acc, char) => {
          if(acc.indexOf(char.faction_code) === -1) {
            acc.push(char.faction_code);
          }
          return acc;
        }, [])
      })

    } else {
      this.setState({
        alignment: null,
        colors: []
      })
    }
    this.setState({currentCharacters});
  }

  setAlignment(alignment) {
    if(alignment === "all") {
      this.setState({alignment: null});
    } else {
      this.setState({alignment});
    }
  }

  updateBattlefield(battlefield) {
    console.log(battlefield);
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
              setCharacters={this.setCharacters}
              alignment={this.state.alignment}
              setAlignment={this.setAlignment} />
          </div>
          <div className="deck-picker">
            <h1>Cards</h1>
            <DeckPicker
              supports={this.state.supports}
              events={this.state.events}
              upgrades={this.state.upgrades}
              setAlignment={this.setAlignment}
              alignment={this.state.alignment}
              colors={this.state.colors} />
          </div>
          <div className="battlefield-picker">
            <h1>Battlefield</h1>
            <SelectableList
              items={this.state.battlefields}
              updateSelected={this.updateBattlefield} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
