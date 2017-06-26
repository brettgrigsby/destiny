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
                    <div className="selectable-list-option-art-container">
                        <img className="selectable-list-option-art" src={card.imagesrc} alt="card art"/>
                    </div>
                    <div className={"selectable-list-option-faction-container " + card.faction_code}>
                        {this.renderAvailableDice(card)}
                    </div>
                    <div className="selectable-list-option-text-container">
                        <span className="slo-text-title">{card.name}</span>
                        <span className="slo-text-subtitle">{card.subtitle}</span>
                        <span dangerouslySetInnerHTML={{__html: card.text}}className="slo-text-card-text"></span>
                    </div>
                </div>
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