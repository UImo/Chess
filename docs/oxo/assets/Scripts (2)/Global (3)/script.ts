

const SQUARES = new Array;
var ray = new Sup.Math.Ray();
var turn : string;  //cross == player || circle == computer

// Victory possibilities
const VICTORIES = [
  // Row
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
// Column
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
// Diagonal
  [0, 4, 8],
  [2, 4, 6],
];

namespace Game{

  export function setSquares(){

    // define a local addSquare function
    function addSquare(index){
      // get the name of current square
      let name = "Square" + index.toString();

      // get the actor from the Game scene
      let square = Sup.getActor("Board").getChild(name);

      // push the square array in SQUARES array to the next index
      SQUARES.push([square, "unHover"]);
    }
    
    for(let i = 0; i < 9; i++){
      addSquare(i);
    }
  }

  

  function checkBoard(){
    let crossCount : number = 0;
    let circleCount : number = 0;
    let freeSquare;
    let line; let index;
    let win;
    let block;

    
    for(line of VICTORIES){
      for(index of line){

        if(SQUARES[index][1] == "cross"){
          crossCount++
        }
        else if(SQUARES[index][1] == "circle"){
          circleCount++
        }
        else{
          freeSquare = SQUARES[index];
        }
      }
      
      // Check if win
      if(circleCount == 2 && crossCount == 0){ //computer
        win = ["Win", freeSquare];
      }
      
      if(crossCount == 2 && circleCount == 0){ //player
        block = ["Block", freeSquare];
      }
      
    crossCount = 0;
    circleCount = 0;
    }
    
    if(win){
      return win;
    }
    else if(block){
      return block;
    }
    else{
      return ["Play", undefined];
    }
  }

  
  
  export function computerTurn(){

    let check = checkBoard();
    if(check[0] == "Win"){
      playSquare(check[1]);
    }

    else if(check[0] == "Block"){
      playSquare(check[1]);
    }

    else if(check[0] == "Play"){

      if(SQUARES[4][1] !== "cross" && SQUARES[4][1] !== "circle"){
        playSquare(SQUARES[4]);
      }

      else if(
              SQUARES[0][1] !== "cross" && SQUARES[0][1] !== "circle" ||
              SQUARES[2][1] !== "cross" && SQUARES[2][1] !== "circle" ||
              SQUARES[6][1] !== "cross" && SQUARES[6][1] !== "circle" ||
              SQUARES[8][1] !== "cross" && SQUARES[8][1] !== "circle"
             ){
        playSquare(getSquare([0, 2, 6, 8]));
      }

      else if(
              SQUARES[1][1] !== "cross" && SQUARES[1][1] !== "circle" ||
              SQUARES[3][1] !== "cross" && SQUARES[3][1] !== "circle" ||
              SQUARES[5][1] !== "cross" && SQUARES[5][1] !== "circle" ||
              SQUARES[7][1] !== "cross" && SQUARES[7][1] !== "circle"
             ){
        playSquare(getSquare([1, 3, 5, 7]));
      }

      else{
        Sup.log("Game Over")
      }
    }
  }

  
  // Free square
  function getSquare(array){
    let index;
    let freeSquares = new Array;

    /*
    Check array index
    if the square is free add to the array freeSquares
    */

    for(index of array){
      if(SQUARES[index][1] !== "cross" && SQUARES[index][1] !== "circle"){
        freeSquares.push(SQUARES[index]);
      }
    }
    // then take randomly one the square from freeSquares and return it
    let randomIndex = Math.floor(Math.random() * freeSquares.length);
    return freeSquares[randomIndex];
  }

  
  
  function playSquare(square){
    square[0].spriteRenderer.setAnimation("circle");
    square[1] = "circle";
  }

  export function checkVictory(){
    let countCross: number = 0;
    let countCircle: number = 0;
    let countFreeSquares: number = 0; //if draw
    let line: number[];
    let index: number;


    for(line of VICTORIES){
      for(index of line){
        if(SQUARES[index][1] == "cross"){
          countCross++
        }
        else if(SQUARES[index][1] == "circle"){
          countCircle++
        }
        else{
          countFreeSquares++
        }
      }
      if(countCross == 3){
        displayScreen();
      }
      if(countCircle == 3){
        displayScreen();
      }
      countCross = 0;
      countCircle = 0;
    }
   
   if(countFreeSquares == 0){
        turn = "tie"; 
        displayScreen();
    }
  }

  
  
  function displayScreen(){
    let Screen = new Sup.Actor("Screen");
    new Sup.SpriteRenderer(Screen, "Sprites/Screens");
    Screen.spriteRenderer.setAnimation(turn);
    Screen.addBehavior(ScreenBehavior);
    var WIN= 0;
    if (turn == "cross"){
       WIN = 1;
    }

    Screen.setPosition(0, 0, -2);
    turn = "end";

    function displayFrame(){
      Screen.setPosition(0, 0, 4);
    }
    Sup.setTimeout(1000, displayFrame);
  }
  
  

  export function startGame(){
    let square;

    // initiat squares
    for(square of SQUARES){
      square[0].spriteRenderer.setAnimation("unHover");
      square[1] = "unHover";
    }

    randomStart();
  }

  function randomStart(){
    //random to see who starts
    if(Math.floor(Math.random() * 2)){
      // random between the 9 squares and play this square to start
      let randomIndex = Math.floor(Math.random() * 9);
      playSquare(SQUARES[randomIndex]);
    }
    
    turn = "cross";
  }
}
