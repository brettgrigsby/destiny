import React, { Component } from 'react';
import SelectableList from './SelectableList.js';
import SelectedCharacter from './SelectedCharacter.js';

class CharacterPicker extends Component {

    constructor(props) {
        super(props);
        this.updateCharacters = this.updateCharacters.bind(this);
        this.changeEliteStatus = this.changeEliteStatus.bind(this);
        this.removeCharacter = this.removeCharacter.bind(this);
        this.updatePointTotal = this.updatePointTotal.bind(this);
        this.state = {
            pointTotal: 30,
            alignment: null
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
        } else {
            return this.state.alignment;
        }
    }

    characterCanBeElite(character) {
        return !!character.points.split("/")[1];
    }

    changeEliteStatus(code, elite) {
        let characters = Object.assign([], this.props.currentCharacters);
        let promotedCharacter = characters.find(char => {
            return char.code === code;
        })
        promotedCharacter.elite = elite;
        this.props.setCharacters(characters);
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

    removeCharacter(code) {
        let newCharacters = Object.assign([], this.props.currentCharacters);
        let characterForRemoval = newCharacters.find(char => {
            return char.code === code;
        });
        let indexForRemoval = newCharacters.indexOf(characterForRemoval);
        newCharacters.splice(indexForRemoval, 1);
        this.props.setCharacters(newCharacters);
    }

    availableCharacters() {
        let availablePoints = this.state.pointTotal - this.pointsForCharacters();
        let alignment = this.currentAlignment();
        let currentUniques = this.props.currentCharacters.reduce((acc, char) => {
                if(char.is_unique) { acc.push(char.code); }
                return acc;
            }, []);
        return this.props.characters.filter(char => {
            let allowedByPoints = this.pointsForCharacter(char) <= availablePoints;
            let aligned = true;
            let nonIncludedUnique = !currentUniques.includes(char.code)
            if(alignment) {aligned = char.affiliation_code === alignment}
            return allowedByPoints && aligned && nonIncludedUnique;
        })
    }

    updatePointTotal(event) {
        let pointTotal = parseInt(event.target.value);
        if(pointTotal) { this.setState({pointTotal}); } else { this.setState({pointTotal: 0})}
    }

    render() {
        return(
            <div>
                <h3>Points: {this.pointsForCharacters()} - Remaining: {this.state.pointTotal - this.pointsForCharacters()}</h3>
                <input type="text" value={this.state.pointTotal} onChange={this.updatePointTotal}/>
                <div className="character-picker picker">
                    <SelectableList items={this.availableCharacters()} updateSelected={this.updateCharacters}/>
                    {this.props.currentCharacters.map(card => {
                        return(
                            <SelectedCharacter
                                image={card.imagesrc}
                                canBeElite={this.characterCanBeElite(card)}
                                elite={card.elite}
                                code={card.code}
                                changeEliteStatus={this.changeEliteStatus}
                                removeCharacter={this.removeCharacter} />
                        )
                    })}
                </div>
            </div>
        );
    }
};

export default CharacterPicker;
