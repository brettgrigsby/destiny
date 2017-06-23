import React, { Component } from 'react';

class SelectableList extends Component {

    renderCard(card) {
        return(
            <div key={card.code}>
                <div className="selectable-list-option" onClick={() => { this.props.updateSelected(card) } } >
                    <img className="selectable-list-option-art" src={card.imagesrc} alt="card art"/>
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