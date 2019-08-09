Battleship!! The classic game in React!

In this version of battleship you are playing against yourself.  The goal is to find all of the hidden battleships in 40 moves or less.  

This app utilizes React states to allow the player to click on a square, the state of the square will then be updated based on logic in the Board.js component.  If the square is hiding a ship, the square will turn red and the index number will be replaced with an "X".  If the square is a miss, the square will turn blue and the index color will turn into an "O".  There are 4 different ships of different lengths.  They are randomly located in either vertical or horizontal positions.  The ships will not overlap or share any squares, if they do, the locations of the ships is "reshuffled".

App.js: Renders the app, calls Board.js

Board.js: The "brain" of the app.  This app holds state, calls all of the other components, and contains all of the logic that determines the functionality of the game.

Squares.js:  This component renders the individual squares of the game board.  The Board component maps through the 'board' array, passing each index and it's value to the Square component.  The square component then displays the color and value of each square.

ScoreBoard.js: This component displays the score of the game.  It is passed "wins" and "attempts" as props and then displays the number of games the user has won vs. the number of games they have attempted.  

ShipStatus.js: This is a component that lets the player know whether they have destroyed a ship already or not.  It is passed 4 image variables as props from Board.js, one image variable for each ship.  If the ship is destroyed, the image changes to a picture of a sinking ship.