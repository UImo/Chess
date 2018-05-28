class PlayerBehavior extends Sup.Behavior {
  awake() {
    Game.setSquares();
    Game.startGame();
  }
  
  // mouse method 
  mouse(action, square){
    if(action == "click"){
      square.spriteRenderer.setAnimation("cross");
    }
  }
  
  gameTurn(){
    turn = "cross";
    Game.checkVictory();
    
    if(turn !== "end"){
      turn = "circle";
      Game.computerTurn();
      Game.checkVictory();
      
      if(turn !== "end"){
          turn = "cross";
      }
    }
  }
  
  update() {
    // Refresh ray casting with mouse position
    ray.setFromCamera(Sup.getActor("Camera").camera, Sup.Input.getMousePosition());
    let array;

    for(array of SQUARES){
      if(ray.intersectActor(array[0], false).length > 0){
        
        if(array[1] == "unHover"){
          // if true : set square to new situation
          array[1] = "isHover";
          this.mouse("isHover", array[0]);
        }
        
        //mouse click
        if(Sup.Input.wasMouseButtonJustPressed(0) && array[1] == "isHover"){
          if(turn == "cross"){
            array[1] = "cross";
            this.mouse("click", array[0]);
            
            turn = "break";
            Sup.setTimeout(600, this.gameTurn);
          }
        }
      }
      
      // Else if ray does not intersect with a previous hovered square, the square change situation
      else if(array[1] == "isHover"){
        // if true, set the square new situation to unHover
        array[1] = "unHover";
        this.mouse("unHover", array[0]);
      }
    }
  }
}
Sup.registerBehavior(PlayerBehavior);



class ScreenBehavior extends Sup.Behavior {  
  
  update() {
    if(Sup.Input.wasMouseButtonJustPressed(0)){
      Sup.getActor("Screen").destroy();
      Game.startGame();
      }
    }
 }
Sup.registerBehavior(ScreenBehavior);