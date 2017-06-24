import React, { Component } from 'react';

class SelectedCharacter extends Component {

    constructor(props) {
        super(props);
        this.promote = this.promote.bind(this);
        this.demote = this.demote.bind(this);
        this._removeCharacter = this._removeCharacter.bind(this);
    }

    promote() {
        this.props.changeEliteStatus(this.props.code, true);
    }

    demote() {
        this.props.changeEliteStatus(this.props.code, false);
    }

    _removeCharacter() {
        this.props.removeCharacter(this.props.code);
    }

    renderDiceOptions() {
        if(this.props.canBeElite && !this.props.elite) {
            return(
                <div className="dice-options">
                    <div className="potential-die dice" onClick={this.promote}>
                        +
                    </div>
                    <div className="selected-die dice"></div>
                </div>
            );
        } else if(this.props.canBeElite && this.props.elite) {
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
                    <img src={this.props.image} alt=""/>
                </div>
                {this.renderDiceOptions()}
            </div>
        );
    }
};

export default SelectedCharacter;