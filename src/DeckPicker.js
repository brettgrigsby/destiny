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

    availableUpgrades() {
        return this.props.upgrades.filter(upgrade => {
            let alignmentMatch = true;
            let colorMatch = true;
            if(this.props.alignment && upgrade.affiliation_code !== "neutral") {
                alignmentMatch = this.props.alignment === upgrade.affiliation_code;
            }
            if(this.props.colors.length > 0 && upgrade.faction_code !== "gray") {
                colorMatch = this.props.colors.includes(upgrade.faction_code);
            }
            return colorMatch && alignmentMatch
        })
    }

    render() {
        return(
            <div>
                <h3> Upgrades: - Events: - Supports: </h3>
                <h3>Upgrades</h3>
                <SelectableList items={this.availableUpgrades()} updateSelected={this.updateUpgrades}/>
            </div>
        )
    }
}

export default DeckPicker;