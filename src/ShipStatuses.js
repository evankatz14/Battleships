import React, { Component } from 'react';

export default class ScoreBoard extends Component {
    
    handleChange = () => {
        this.props.handleClick(this.props.carrierImage)
    }
    
    render(){
        const { carrierImage, battleshipImage, cruiserImage, subImage } = this.props
        
        return (
            <div className = "ShipStatus">
                <div className = "Ship" onClick = {this.handleClick}>
                    <img src = {carrierImage} alt = "Carrier"/> 
                    <h3>The Carrier</h3>
                </div>
                <div className = "Ship" onClick = {this.handleClick}>
                    <img src = {battleshipImage} alt = "Battleship" />
                    <h3>The Battleship</h3>
                </div>
                <div className = "Ship" onClick = {this.handleClick}>
                    <img src = {cruiserImage} alt = "Cruiser" />
                    <h3>The Cruiser</h3>
                </div>
                <div className = "Ship" onClick = {this.handleClick}>
                    <img src = {subImage} alt = "Submarine" />
                    <h3>The Submarine</h3>
                </div>
            </div>
        );
    }
}
