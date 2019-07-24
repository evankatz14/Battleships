import React, { Component } from 'react';


export default class Squares extends Component {
    
    handleChange = () => {
        this.props.handleClick(this.props.index)
    }

    render(){
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
