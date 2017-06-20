import React, { Component } from 'react';
import SelectableList from './SelectableList.js';

class CharacterPicker extends Component {

    srcForCharacters() {
        if (this.props.currentCharacters.length > 0) {
            return this.props.currentCharacters[0].imagesrc
        }
    }

    render() {
        return(
            <div className="character-picker picker">
                <SelectableList items={this.props.characters}/>
                <div className="selected-character">
                    <div className="character-card-image">
                        <img src={this.srcForCharacters()} alt=""/>
                    </div>
                    <div className="dice-options">
                        <div className="potential-die dice">
                            +
                        </div>
                        <div className="selected-die dice"></div>
                    </div>
                </div>
            </div>
        );
    }
};

export default CharacterPicker;
