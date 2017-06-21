import React, { Component } from 'react';
import SelectableList from './SelectableList.js';

class CharacterPicker extends Component {

    constructor(props) {
        super(props);
        this.updateCharacters = this.updateCharacters.bind(this);
        this.state = {
            points: 0
        }
    }

    srcForCharacters() {
        if (this.props.currentCharacters.length > 0) {
            return this.props.currentCharacters[0].imagesrc
        }
    }

    characterCanBeElite(character) {
        return !!character.points.split("/")[1];
    }

    promoteCharacter(card) {
        let newChar = Object.assign({}, card);
        newChar.elite = true;
        this.updateCharacters(newChar);
    }

    renderDiceOptions(card) {
        if(this.characterCanBeElite(card)) {
            return(
                <div className="dice-options">
                    <div className="potential-die dice" onClick={() => this.promoteCharacter(card)}>
                        +
                    </div>
                    <div className="selected-die dice"></div>
                </div>
            );
        } else {
            return(
                <div className="dice-options">
                    <div className="selected-die dice"></div>
                </div>
            );
        }
    }

    renderCharacter(card) {
        return(
            <div className="selected-character">
                <div className="character-card-image">
                    <img src={card.imagesrc} alt=""/>
                </div>
                {this.renderDiceOptions(card)}
            </div>
        );
    }

    pointsForCharacter(character) {
        let pointsOptions = character.points.split("/").map(pointVal => { return parseInt(pointVal, 10) });
        if(character.elite) {
            return pointsOptions[1];
         } else { 
            return pointsOptions[0];
        }
    }

    getPointTotalForCharacters(characters) {
        let total = 0;
        characters.forEach(character => {
            total += this.pointsForCharacter(character)
        });
        return total;
    }

    updateCharacters(character) {
        let newCharacters = Object.assign([], this.props.currentCharacters);
        newCharacters.push(character);
        let points = this.getPointTotalForCharacters(newCharacters);
        this.setState({points});
        this.props.setCharacters(newCharacters);
    }

    render() {
        return(
            <div>
                <h3>Points: {this.state.points}</h3>
                <div className="character-picker picker">
                    <SelectableList items={this.props.characters} updateSelected={this.updateCharacters}/>
                    {this.props.currentCharacters.map(card => {
                        return this.renderCharacter(card);
                    })}
                </div>
            </div>
        );
    }
};

export default CharacterPicker;
