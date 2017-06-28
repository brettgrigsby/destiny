import React, { Component } from 'react';
import SelectableListItem from './SelectableListItem.js';

class SelectableList extends Component {

    render() {
        return(
            <div className="selectable-list">
                { this.props.items.map(card => {
                    return(
                        <SelectableListItem 
                            key={card.code}
                            card={card}
                            updateSelected={this.props.updateSelected}
                            remainingPoints={this.props.remainingPoints} />
                    )
                })}
            </div>
        )
    }
};

export default SelectableList;