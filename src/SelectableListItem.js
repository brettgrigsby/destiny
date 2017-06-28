import React, { Component } from 'react';

class SelectableListItem extends Component {

    constructor(props) {
        super(props);
        this.followMouse = this.followMouse.bind(this);
        this.unfollowMouse = this.unfollowMouse.bind(this);
        this.showFullArt = this.showFullArt.bind(this);
        this._updateSelected = this._updateSelected.bind(this);
        this.state = {
            fullArtDisplay: 'none',
            x: null,
            y: null
        }
    }

    _updateSelected(card) {
        this.unfollowMouse();
        this.props.updateSelected(this.props.card);
    }

    followMouse() {
        document.addEventListener('mousemove', this.showFullArt);
    }

    unfollowMouse() {
        this.setState({
            fullArtDisplay: 'none',
            x: null,
            y: null
        })
        document.removeEventListener('mousemove', this.showFullArt);
    }

    showFullArt(e) {
        this.setState({
            fullArtDisplay: 'inline',
            x: e.pageX + 10,
            y: e.pageY - 175
        });
    }

    renderAvailableDice() {
        if(this.props.remainingPoints) {
            let nonEliteCost = this.props.card.points.split("/")[0];
            let eliteCost = this.props.card.points.split("/")[1];
            if(eliteCost && parseInt(eliteCost, 10) <= this.props.remainingPoints) {
                return(
                    <div className="available-dice-container">
                        <div className="available-dice">{nonEliteCost}</div>
                        <div className="available-dice">{eliteCost}</div>
                    </div>
                )
            } else {
                return(
                    <div className="available-dice-container">
                        <div className="available-dice">{nonEliteCost}</div>
                    </div>
                )
            }
        }
    }

    render() {
        return(
            <div className="selectable-list-option-container">
                <div 
                    className="selectable-list-option" 
                    onClick={this._updateSelected}
                    onMouseEnter={this.followMouse}
                    onMouseLeave={this.unfollowMouse} >
                    <div className="selectable-list-option-art-container">
                        <img className="selectable-list-option-art" src={this.props.card.imagesrc} alt="card art"/>
                    </div>
                    <div className={"selectable-list-option-faction-container " + this.props.card.faction_code}>
                        {this.renderAvailableDice()}
                    </div>
                    <div className="selectable-list-option-text-container">
                        <span className="slo-text-title">{this.props.card.name}</span>
                        <span className="slo-text-subtitle">{this.props.card.subtitle}</span>
                        <span dangerouslySetInnerHTML={{__html: this.props.card.text}}className="slo-text-card-text"></span>
                    </div>
                </div>
                <div 
                    className="option-full-art"
                    style={{display: this.state.fullArtDisplay, top: this.state.y, left: this.state.x}}>
                    <img src={this.props.card.imagesrc} alt="full card art"/>
                </div>
            </div>
        );
    }
};

export default SelectableListItem;