import React, { Component } from 'react';

class SelectedCharacter extends Component {

    constructor(props) {
        super(props);
        this.promote = this.promote.bind(this);
        this.demote = this.demote.bind(this);
        this._removeCharacter = this._removeCharacter.bind(this);
    }

    promote() {
        this.props.changeEliteStatus(this.props.character.code, true);
    }

    demote() {
        this.props.changeEliteStatus(this.props.character.code, false);
    }

    canBeElite() {
        let nonEliteCost = parseInt(this.props.character.points.split("/")[0], 10);
        let eliteCost = parseInt(this.props.character.points.split("/")[1], 10);
        if(eliteCost) {
            return (eliteCost - nonEliteCost) <= this.props.remainingPoints;
        } else {
            return false;
        }
    }

    _removeCharacter() {
        this.props.removeCharacter(this.props.character.code);
    }

    renderDiceOptions() {
        if(this.canBeElite() && !this.props.character.elite) {
            return(
                <div className="dice-options">
                    <div className="potential-die dice" onClick={this.promote}>
                        +
                    </div>
                    <div className="selected-die dice"></div>
                </div>
            );
        } else if(this.props.character.elite) {
            return(
                <div className="dice-options">
                    <div className="selected-die dice" onClick={this.demote}>
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

    render() {
        return(
            <div className="selected-character">
                <div className="character-card-image" onClick={this._removeCharacter}>
                    <img src={this.props.character.imagesrc} alt=""/>
                </div>
                {this.renderDiceOptions()}
            </div>
        );
    }
};

export default SelectedCharacter;