import React, { Component } from 'react';

class SelectableList extends Component {

    constructor(props) {
        super(props);
        this.followMouse = this.followMouse.bind(this);
        this.unfollowMouse = this.unfollowMouse.bind(this);
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



    followMouse() {
        document.addEventListener('mousemove', this.showFullArt);
    }

    unfollowMouse() {
        document.removeEventListener('mousemove', this.showFullArt);
    }

    showFullArt(e) {
        console.log("X:", e.pageX, "Y:", e.pageY);
    }


    renderCard(card) {
        return(
            <div className="selectable-list-option-container" key={card.code}>
                <div 
                    className="selectable-list-option" 
                    onClick={() => { this.props.updateSelected(card) } }
                    onMouseEnter={this.followMouse}
                    onMouseLeave={this.unfollowMouse} >
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