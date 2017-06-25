import React, { Component } from 'react';
import SelectableList from './SelectableList.js';

class DeckPicker extends Component {

    constructor(props) {
        super(props);
        this.updateUpgrades = this.updateUpgrades.bind(this);
    }

    updateUpgrades(upgrade) {
        console.log(upgrade)
    }

    filterByColorAndAlignment(cards) {
        return cards.filter(card => {
            let alignmentMatch = true;
            let colorMatch = true;
            if(this.props.alignment && card.affiliation_code !== "neutral") {
                alignmentMatch = this.props.alignment === card.affiliation_code;
            }
            if(this.props.colors.length > 0 && card.faction_code !== "gray") {
                colorMatch = this.props.colors.includes(card.faction_code);
            }
            return colorMatch && alignmentMatch
        })
    }

    render() {
        return(
            <div>
                <h3> Upgrades: - Events: - Supports: </h3>
                <h3>Upgrades</h3>
                <SelectableList 
                    items={this.filterByColorAndAlignment(this.props.upgrades)} 
                    updateSelected={this.updateUpgrades} />
                <h3>Events</h3>
                <SelectableList
                    items={this.filterByColorAndAlignment(this.props.events)}
                    updateSelected={this.updateUpgrades} />
                <h3>Supports</h3>
                <SelectableList
                    items={this.filterByColorAndAlignment(this.props.supports)}
                    updateSelected={this.updateUpgrades} />
            </div>
        )
    }
}

export default DeckPicker;