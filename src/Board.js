import React, { Component } from 'react';
import Squares from "./Squares"
import ScoreBoard from './ScoreBoard'
import ShipStatuses from './ShipStatuses'
import image from './carrier.jpg'
import sunk from './sunk.jpg'
import battle from './battleship.jpeg'
import cruze from './Cruiser.jpg'
import sub from './sub.jpg'

//carrier = 5, battleship = 4, cruiser = 3, sub = 2
export default class Board extends Component {
    
    //initiate state
    constructor(props) {
        super(props)
        this.state = {
            board: Array.apply(null, {length: 100}).map(Number.call, Number),
            background: Array(100).fill('aqua'),
            clicks: 40,
            hits: 0,
            carrier: [],
            battleship: [],
            cruiser: [],
            submarine: [],
            shipLoc: [],
            wins: 0,
            attempts: 0,
            carrierImage: image,
            battleshipImage: battle,
            cruiserImage: cruze,
            subImage: sub,
            carrierSunk: false,
            battleshipSunk: false,
            cruiserSunk: false,
            subSunk: false
        }
    }
    
    //initiates a new game when the page is first opened
    componentDidMount = () => {
        this.newGame()
    }
    
    //determines the location of the carrier ship and whether it will be vertical or horizontal
    setCarrier = () => {
        let carrier = []
        let carVert = Math.floor(Math.random() * 2)
        let carHLoc = Math.floor(Math.random() * 10) * 10 + Math.floor(Math.random() * 6)
        let carVLoc = Math.floor(Math.random() * 6) * 10 + Math.floor(Math.random() * 10)
        
        if(carVert === 0){
            for(let i = carHLoc; i < carHLoc + 5; i++){
                carrier.push(i)
            }
        } else {
            for(let i = carVLoc; i < carVLoc + 50; i += 10){
                carrier.push(i)
            }
        }
        
        return carrier
    }
    
    //determines if the carrier has been sunk after a click
    sinkCarrier = (board) => {
        let carrier = this.state.carrier
        const destroyed = []
        for(let i = 0; i < board.length; i++){
            if(board[i] === 'X'){
                destroyed.push(i)
            }
        }
        return carrier.every(i => destroyed.includes(i))
    }
    
    //determines the location of the battleship and whether it will be vertical or horizontal
    setBattleship = () => {
        let battleship = []
        let batVert = Math.floor(Math.random() * 2)
            
        let batHLoc = Math.floor(Math.random() * 10) * 10 + Math.floor(Math.random() * 7)
        let batVLoc = Math.floor(Math.random() * 7) * 10 + Math.floor(Math.random() * 10)
            
        if(batVert === 0){
            for(let i = batHLoc; i < batHLoc + 4; i++){
            battleship.push(i)
            } 
        } else {
            for(let i = batVLoc; i < batVLoc + 40; i += 10){
            battleship.push(i)
            }
        }
        
        return battleship
    }
    
    //determines if the battleship has been sunk after a click
    sinkBattleship = (board) => {
        let battleship = this.state.battleship
        const destroyed = []
        for(let i = 0; i < board.length; i++){
            if(board[i] === 'X'){
                destroyed.push(i)
            }
        }
        return battleship.every(i => destroyed.includes(i))
    }
    //determines the location of the cruiser ship and whether it will be vertical or horizontal
    setCruiser = () => {
        let cruiser = []
        let cruVert = Math.floor(Math.random() * 2)
            
        let cruHLoc = Math.floor(Math.random() * 10) * 10 + Math.floor(Math.random() * 8)
        let cruVLoc = Math.floor(Math.random() * 8) * 10 + Math.floor(Math.random() * 10)
            
        if(cruVert === 0){
            for(let i = cruHLoc; i < cruHLoc + 3; i++){
            cruiser.push(i)
            } 
        } else {
            for(let i = cruVLoc; i < cruVLoc + 30; i += 10){
            cruiser.push(i)
            }
        }
        
        return cruiser
    }

    //determines if the cruiser has been sunk after a click
    sinkCruiser = (board) => {
        let cruiser = this.state.cruiser
        const destroyed = []
        for(let i = 0; i < board.length; i++){
            if(board[i] === 'X'){
                destroyed.push(i)
            }
        }
        return cruiser.every(i => destroyed.includes(i))
    }
    
    //determines the location of the submarine and whether it will be vertical or horizontal
    setSubmarine = () => {
        let submarine = []
        let subVert = Math.floor(Math.random() * 2)
            
        let subHLoc = Math.floor(Math.random() * 10) * 10 + Math.floor(Math.random() * 9)
        let subVLoc = Math.floor(Math.random() * 9) * 10 + Math.floor(Math.random() * 10)
            
        if(subVert === 0){
            for(let i = subHLoc; i < subHLoc + 2; i++){
            submarine.push(i)
            } 
        } else {
            for(let i = subVLoc; i < subVLoc + 20; i += 10){
            submarine.push(i)
            }
        }
        
        return submarine
    }
    
    //determines if the submarine has been sunk after a click
    sinkSub = (board) => {
        let submarine = this.state.submarine
        const destroyed = []
        for(let i = 1; i < board.length; i++){
            if(board[i] === 'X'){
                destroyed.push(i)
            }
        }
        return submarine.every(i => destroyed.includes(i))
    }

    //method that calls the squares component, to be used in in map function in return of this component.
    renderSquare = (i) => {
        return <Squares
                    value = {this.state.board[i]}
                    background = {this.state.background[i]}
                    index = {i}
                    handleClick = {this.handleClick}
                />
    }
    
    //method to determine if a player has won the game after correctly clicking a square hiding a ship
    winner = (board) => {
        const winningCom = board.filter((value, index) => value === 'X')
        if(winningCom.length === this.state.shipLoc.length){
            return true
        }
        return null
    }

    //method to be passed as props that holds the primary logic of the game.  Determines how to transform a square that has been clicked and whether or not the game has been won.  The game will end if there are more ship locations left than there are torpedoes left to shoot.  If the player loses, the locations of the ships spots that have still not been hit will be revealed. Updates State.
    handleClick = (i) => {
        let board = this.state.board.slice()
        let background = this.state.background
        let clicks = this.state.clicks
        const shipLoc = this.state.shipLoc
        let hits = this.state.hits
        let wins = this.state.wins
        let attempts = this.state.attempts
        let carrierImage = this.state.carrierImage
        let battleshipImage = this.state.battleshipImage
        let cruiserImage = this.state.cruiserImage
        let subImage = this.state.subImage
        let carrierSunk = this.state.carrierSunk
        let battleshipSunk = this.state.battleshipSunk
        let cruiserSunk = this.state.cruiserSunk
        let subSunk = this.state.subSunk
        
        if(clicks >= (14 - hits)){
            if(typeof board[i] === 'number' && shipLoc.includes(i)) {
                clicks--
                hits++
                board[i] = 'X'
                background[i] = 'red'
                if(this.sinkCarrier(board) && !carrierSunk){
                    carrierImage = sunk
                    carrierSunk = true
                    setTimeout(function() {alert("The carrier is sunk!")}, 250)
                }
                if(this.sinkBattleship(board) && !battleshipSunk){
                    battleshipImage = sunk
                    battleshipSunk = true
                    setTimeout(function() {alert("The battleship is sunk!")}, 250)
                }
                if(this.sinkCruiser(board) && !cruiserSunk){
                    cruiserImage = sunk
                    cruiserSunk = true
                    setTimeout(function() {alert("The cruiser is sunk!")}, 250)
                }
                if(this.sinkSub(board) && !subSunk){
                    subImage = sunk
                    subSunk = true
                    setTimeout(function() {alert("The submarine is sunk!")}, 250)
                }
                if(this.winner(board)){
                    wins++
                    attempts++
                    setTimeout(function() {alert("You win!")}, 250)
                } else if(clicks < (14 - hits)){
                    for(let j = 0; j < shipLoc.length; j++){
                        if(typeof board[shipLoc[j]] === 'number'){
                            board[shipLoc[j]] = 'S'
                            background[shipLoc[j]] = 'orange'
                        }
                    }
                    setTimeout(function() {alert("Not enough torpedoes.. you lose!!  Click reset to try again..")}, 250)
                    attempts++
                }
            } else if(typeof board[i] === 'number'){
                clicks --
                board[i] = 'O'
                background[i] = 'blue'
                if(clicks < (14 - hits)) {
                    for(let j = 0; j < shipLoc.length; j++){
                        if(typeof board[shipLoc[j]] === 'number'){
                            board[shipLoc[j]] = 'S'
                            background[shipLoc[j]] = 'orange'
                        }
                    }
                    attempts++
                    setTimeout(function() {alert("Not enough torpedoes.. you lose!!  Click reset to try again..")}, 250)
                }
            }
        }
        this.setState({board, background, clicks, hits, wins, attempts, carrierImage, battleshipImage, cruiserImage, subImage, carrierSunk, battleshipSunk, cruiserSunk, subSunk})
    }
    
    //Method to start a new game
    newGame = () => {
        let board = Array.apply(null, {length: 100}).map(Number.call, Number)
        let background = Array(100).fill('aqua')
        let clicks = 40
        let carrierImage = image
        let battleshipImage = battle
        let cruiserImage = cruze
        let subImage = sub
        let carrierSunk = false
        let battleshipSunk = false
        let cruiserSunk = false
        let subSunk = false
        
        let carrier = this.setCarrier()
        let battleship = []
        let cruiser = []
        let submarine = []
        let batcheck = true
        let crucheck1 = true
        let crucheck2 = true
        let subcheck1 = true
        let subcheck2 = true
        let subcheck3 = true
        
        battleship = this.setBattleship()
        batcheck = carrier.some(n => battleship.includes(n))

        cruiser = this.setCruiser()
        crucheck1 = carrier.some(n => cruiser.includes(n)) 
        crucheck2 = battleship.some(n => cruiser.includes(n))
        
        submarine = this.setSubmarine()
        subcheck1 = carrier.some(n => submarine.includes(n))
        subcheck2 = battleship.some(n => submarine.includes(n))
        subcheck3 = cruiser.some(n => submarine.includes(n))
        
        if(batcheck === true || crucheck1 === true || crucheck2 === true || subcheck1 === true || subcheck2 === true || subcheck3 === true){
            return this.newGame()
        }
        
        let shipLoc = carrier.concat(battleship, cruiser, submarine)
        let hits = 0

        this.setState({board, background, clicks, hits, carrier, battleship, cruiser, submarine, shipLoc, carrierImage, battleshipImage, cruiserImage, subImage, carrierSunk, battleshipSunk, cruiserSunk, subSunk})
    }

    render(){
        
        //deconstruct state variables to be passed as props
        const {board, clicks, hits, wins, attempts, carrierImage, battleshipImage, cruiserImage, subImage} = this.state
        
        //map through board and call renderSquare to display game board. Call Scoreboard and Shipstatuses. Display torpedos remaining, number of hits so far, and a new game button.
        return (
            <div>
                <div className = "Board">
                    {board.map((value, index)=>{
                    return <div className = "Squares">
                                {this.renderSquare(index)}
                           </div>
                    })}
                </div>
                <ScoreBoard 
                    wins = {wins}
                    attempts = {attempts}
                />
                <ShipStatuses
                    carrierImage = {carrierImage}
                    battleshipImage = {battleshipImage}
                    cruiserImage = {cruiserImage}
                    subImage = {subImage}
                    handleClick = {this.handleClick}
                />
                <h2 className = "status">Torpedoes Remaining: {clicks}</h2>
                <h2 className = "status">Number of Hits: {hits}/14</h2>
                <button className = "NewGame" onClick = {this.newGame}>New Game!</button>
            </div>
        );
    }
}
