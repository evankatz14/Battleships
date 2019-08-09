import React, { Component } from 'react';


export default class Squares extends Component {
    
    //method used to call handleClick, a method passed down in props form Board.js, with the index of the clicked square as the argument.  Allows the correct square to be updated by the logic in handleClick in Board.js
    handleChange = () => {
        this.props.handleClick(this.props.index)
    }

    render(){
        
        //render individual squares of the board with correct background color and value
        return (
            <a
                className = "Button"
                style={{backgroundColor: this.props.background}}
                onClick = {this.handleChange}>
                {this.props.value}
            </a>
        );
    }
}
