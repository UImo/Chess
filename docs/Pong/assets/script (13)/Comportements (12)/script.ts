/* PROTOTYPE COMPORTEMENT

class ScriptBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    
  }
}
Sup.registerBehavior(ScriptBehavior); 

*/


const VitesseInitialeBalle = 5;
let scoreJ1 = 0;
let scoreJ2 = 0;

class ComportementJ1 extends Sup.Behavior 
{
  awake() 
  {
    
  }

  update() 
  {
    let velociteJ1 = this.actor.arcadeBody2D.getVelocity();
    velociteJ1.y = 0;
    
    if(Sup.Input.isKeyDown("Z") && this.actor.getY() < 720 - 80)
    {
      velociteJ1.y = 10;
    }
    
    if(Sup.Input.isKeyDown("S") && this.actor.getY() > 0 + 80)
    {
      velociteJ1.y = -10;
    }
    
    this.actor.arcadeBody2D.setVelocity(velociteJ1);
  }
}
Sup.registerBehavior(ComportementJ1);

class ComportementJ2 extends Sup.Behavior 
{
  awake() 
  {
    
  }

  update() 
  {
    let velociteJ2 = this.actor.arcadeBody2D.getVelocity();
    velociteJ2.y = 0;
    
    if(Sup.Input.isKeyDown("UP") && this.actor.getY() < 720 - 80)
    {
      velociteJ2.y = 10;
    }
    
    if(Sup.Input.isKeyDown("DOWN") && this.actor.getY() > 0 + 80)
    {
      velociteJ2.y = -10;
    }
    
    this.actor.arcadeBody2D.setVelocity(velociteJ2);
    
  
  }
}
Sup.registerBehavior(ComportementJ2);

class deplacementBalle extends Sup.Behavior {
  
  vitesse = VitesseInitialeBalle;
  DeplacementX = 1;
  DeplacementY = 1;
  
  awake() 
  {
    
  }

  update()
  {
    let VelociteBalle = this.actor.arcadeBody2D.getVelocity();
  
    if(Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D,Sup.ArcadePhysics2D.getAllBodies()))
    {
      this.DeplacementX = this.DeplacementX * -1;
      this.vitesse = VitesseInitialeBalle;
      this.vitesse = this.vitesse + 2;
    }
    
    if(this.actor.getY() > 712 || this.actor.getY() < 8)
    {
      this.DeplacementY = this.DeplacementY * -1;
    }
    
    if(this.actor.getX() > 1272)
    {
      this.actor.arcadeBody2D.warpPosition(new Sup.Math.Vector3(640,360,0));
      scoreJ1 = scoreJ1 + 1;
      this.DeplacementX = this.DeplacementX* -1;
      this.vitesse = VitesseInitialeBalle;
    }
    
    if(this.actor.getX() < 8)
    {
      this.actor.arcadeBody2D.warpPosition(new Sup.Math.Vector3(640,360,0));
      scoreJ2 = scoreJ2 + 1;
      this.DeplacementX = this.DeplacementX* -1;
      this.vitesse = VitesseInitialeBalle;

    }
    
    VelociteBalle.x = this.vitesse* this.DeplacementX;
    VelociteBalle.y = this.vitesse* this.DeplacementY; 
    
    this.actor.arcadeBody2D.setVelocity(VelociteBalle);  
    
   
    
  }
}
Sup.registerBehavior(deplacementBalle);

class AfficherScore extends Sup.Behavior {
  awake() 
  {
    
  }

  update() 
  {
    this.actor.textRenderer.setText("Voici le Score");
   
  }
}
Sup.registerBehavior(AfficherScore); 

class ComportementScore extends Sup.Behavior {
  awake() 
  {
    
  }

  update() 
  {
    this.actor.textRenderer.setText("" + scoreJ1 + " " + ":" + " " +  scoreJ2);
   
  }
}
Sup.registerBehavior(ComportementScore); 





