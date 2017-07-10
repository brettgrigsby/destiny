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
        this.handleAlignmentChange = this.handleAlignmentChange.bind(this);
        this.updateTextFilter = this.updateTextFilter.bind(this);
        this.state = {
            pointTotal: 30,
            alignment: null,
            textFilter: ""
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
        document.getElementById('character-picker').scrollTop = 0;
        let newCharacters = this.props.currentCharacters.map(char => {
            return Object.assign({}, char);
        });
        newCharacters.push(Object.assign({}, character));
        this.props.setCharacters(newCharacters);
    }

    removeCharacter(code) {
        // let newCharacters = Object.assign([], this.props.currentCharacters);
        let newCharacters = this.props.currentCharacters.map(char => {
            return Object.assign({}, char);
        });
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
        let availableCharacters = this.props.characters.filter(char => {
            let allowedByPoints = this.pointsForCharacter(char) <= availablePoints;
            let aligned = true;
            let nonIncludedUnique = !currentUniques.includes(char.code)
            if(alignment) {aligned = char.affiliation_code === alignment}
            return allowedByPoints && aligned && nonIncludedUnique;
        })
        return availableCharacters.sort((a, b) => {
            let aPoints = a.points.split("/").map(val => { return parseInt(val, 10)});
            let bPoints = b.points.split("/").map(val => { return parseInt(val, 10)});
            let maxA, maxB;
            if (aPoints[1] && aPoints[1] <= availablePoints) {
                maxA = aPoints[1]
            } else {
                maxA = aPoints[0]
            }
            if (bPoints[1] && bPoints[1] <= availablePoints) {
                maxB = bPoints[1]
            } else {
                maxB = bPoints[0]
            }
            return maxB - maxA;
        });
    }

    updatePointTotal(event) {
        let pointTotal = parseInt(event.target.value, 10);
        if(pointTotal) { this.setState({pointTotal}); } else { this.setState({pointTotal: 0})}
    }

    updateTextFilter(event) {
        let textFilter = event.target.value;
        this.setState({textFilter});
    }

    handleAlignmentChange(event) {
        if(event.target.value === "all") {
            this.setState({alignment: null});
        } else {
            this.setState({alignment: event.target.value});
        }
    }

    renderCharacterList(availableCharacters) {
        if(availableCharacters.length) {
            return(
                <div className="character-list-container" id="character-picker">
                    <SelectableList 
                        items={this.availableCharacters()} 
                        updateSelected={this.updateCharacters}
                        remainingPoints={this.state.pointTotal - this.pointsForCharacters()}
                        textFilter={this.state.textFilter} />
                </div>
            );
        }
    }

    // _onWheel(e) {
    //     let element = document.getElementById('character-picker');
    //     let change = e.nativeEvent.deltaY;
    //     element.scrollTop += change;
    //     e.preventDefault();

    // }

    render() {
        let availableCharacters = this.availableCharacters();
        return(
            <div>
                <h3>Points: {this.pointsForCharacters()} - Remaining: {this.state.pointTotal - this.pointsForCharacters()}</h3>
                <label>
                    Point Total:
                    <input type="text" value={this.state.pointTotal} onChange={this.updatePointTotal}/>
                </label>
                <label>
                    Search:
                    <input type="text" value={this.state.textFilter} onChange={this.updateTextFilter}/>
                </label>
                <label>
                    <input type="radio" value="all" onChange={this.handleAlignmentChange} checked={this.currentAlignment() === null} />
                    All
                </label>
                <label>
                    <input type="radio" value="villain" onChange={this.handleAlignmentChange} checked={this.currentAlignment() === "villain"} />
                    Villain
                </label>
                <label>
                    <input type="radio" value="hero" onChange={this.handleAlignmentChange} checked={this.currentAlignment() === "hero"}/>                    
                    Hero
                </label>
                
                <div className="character-picker picker">
                    {this.renderCharacterList(availableCharacters)}
                    <div className="selected-characters-section">
                        <h2>Selected Characters</h2>
                        <div className="selected-characters-container">
                            {this.props.currentCharacters.map((card, index) => {
                                return(
                                    <SelectedCharacter
                                        character={card}
                                        key={index}
                                        changeEliteStatus={this.changeEliteStatus}
                                        removeCharacter={this.removeCharacter}
                                        remainingPoints={this.state.pointTotal - this.pointsForCharacters()} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default CharacterPicker;
