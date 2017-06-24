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

    render() {
        return(
            <div>
                <h3> Upgrades: - Events: - Supports: </h3>
                <h3>Upgrades</h3>
                <SelectableList items={this.props.upgrades} updateSelected={this.updateUpgrades}/>
            </div>
        )
    }
}

export default DeckPicker;