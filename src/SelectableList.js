import React, { Component } from 'react';

class SelectableList extends Component {

    eliteCost(card) {

    }

    renderAvailableDice(card) {
        if(this.props.remainingPoints) {
            let eliteCost = card.points.split("/")[1];
            if(eliteCost && parseInt(eliteCost, 10) <= this.props.remainingPoints) {
                return(
                    <div className="available-dice-container">
                        <div className="available-dice"></div>
                        <div className="available-dice"></div>
                    </div>
                )
            } else {
                return(
                    <div className="available-dice-container">
                        <div className="available-dice"></div>
                    </div>
                )
            }
        }
    }

    renderCard(card) {
        return(
            <div key={card.code}>
                <div className="selectable-list-option" onClick={() => { this.props.updateSelected(card) } } >
                    <img className="selectable-list-option-art" src={card.imagesrc} alt="card art"/>
                </div>
                {this.renderAvailableDice(card)}
            </div>
        );
    }

    render() {
        return(
            <div className="selectable-list">
                { this.props.items.map(card => {
                    return this.renderCard(card);
                })}
            </div>
        )
    }
};

export default SelectableList;