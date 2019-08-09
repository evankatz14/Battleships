import React, { Component } from 'react';

export default class ScoreBoard extends Component {
    
    //method to calls handleClick, a method passed down as props from Board.js, to change the ship images at the right time.
    handleChange = () => {
        this.props.handleClick(this.props.carrierImage)
    }
    
    render(){
        
        //deconstructed variable passed as props from Board.js
        const { carrierImage, battleshipImage, cruiserImage, subImage } = this.props
        
        //displays the images of the 4 ships and their titles
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
