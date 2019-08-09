import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Board from './Board'

class App extends Component {
    render(){
        
        // Render the title and call the Board component
        return (
            <div>
                <h2 className = "Header" >Battle for the Seas</h2>
                <div className="App">
                    <Board />
                </div>
            </div>
        );
    }
}

export default App;
