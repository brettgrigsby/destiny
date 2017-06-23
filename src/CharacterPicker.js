import React, { Component } from 'react';
import SelectableList from './SelectableList.js';

class CharacterPicker extends Component {

    constructor(props) {
        super(props);
        this.updateCharacters = this.updateCharacters.bind(this);
        this.state = {
            pointTotal: 30
        }
    }

    srcForCharacters() {
        if (this.props.currentCharacters.length > 0) {
            return this.props.currentCharacters[0].imagesrc
        }
    }

    currentAlignment() {
        let selectedChar = this.props.currentCharacters[0];
        if(selectedChar) {
            return selectedChar.affiliation_code;
        }
    }

    characterCanBeElite(character) {
        return !!character.points.split("/")[1];
    }

    changeEliteStatus(card, elite) {
        let characters = Object.assign([], this.props.currentCharacters);
        let promotedCharacter = characters.find(char => {
            return char.code === card.code;
        })
        promotedCharacter.elite = elite;
        this.props.setCharacters(characters);
    }

    demoteCharacter(card) {

    }

    renderDiceOptions(card) {
        if(this.characterCanBeElite(card) && !card.elite) {
            return(
                <div className="dice-options">
                    <div className="potential-die dice" onClick={() => this.changeEliteStatus(card, true)}>
                        +
                    </div>
                    <div className="selected-die dice"></div>
                </div>
            );
        } else if(this.characterCanBeElite(card) && card.elite) {
            return(
                <div className="dice-options">
                    <div className="selected-die dice" onClick={() => this.changeEliteStatus(card, false)}>
                        -
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

    pointsForCharacters() {
        let total = 0;
        this.props.currentCharacters.forEach(character => {
            total += this.pointsForCharacter(character)
        });
        return total;
    }

    updateCharacters(character) {
        let newCharacters = Object.assign([], this.props.currentCharacters);
        newCharacters.push(character);
        this.props.setCharacters(newCharacters);
    }

    availableCharacters() {
        let availablePoints = this.state.pointTotal - this.pointsForCharacters();
        let alignment = this.currentAlignment();
        return this.props.characters.filter(char => {
            let allowedByPoints = this.pointsForCharacter(char) <= availablePoints;
            let aligned = true;
            if(alignment) {aligned = char.affiliation_code === alignment}
            return allowedByPoints && aligned;
        })
    }

    render() {
        return(
            <div>
                <h3>Points: {this.pointsForCharacters()}</h3>
                <div className="character-picker picker">
                    <SelectableList items={this.availableCharacters()} updateSelected={this.updateCharacters}/>
                    {this.props.currentCharacters.map(card => {
                        return this.renderCharacter(card);
                    })}
                </div>
            </div>
        );
    }
};

export default CharacterPicker;
