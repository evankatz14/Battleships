import React, { Component } from 'react';


export default class ScoreBoard extends Component {
    
    render(){
        
        //render scoreboard with wins and total attempts
        return (
            <div className = " ScoreBoard">
                <h2
                    className = "Tracker">
                    Wins: {this.props.wins} 
                </h2>
                <h2
                    className = "Tracker">
                    Attempts: {this.props.attempts}
                </h2>
            </div>
        );
    }
}
