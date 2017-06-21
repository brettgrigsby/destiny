import React, { Component } from 'react';

class SelectableList extends Component {

    renderCard(card) {
        return(
            <div key={card.code}>
                <div className="card" onClick={() => { this.props.updateSelected(card) } } >
                    <div className="image-crop">
                        <img className="card-art" src={card.imagesrc} alt="card art"/>
                    </div>
                    <div className="card-info">
                    <span>{card.name}</span>
                    <span>{card.text}</span>
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