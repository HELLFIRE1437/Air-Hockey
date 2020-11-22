var wall1, wall2, wall3, wall4, wall5, wall6, wall7, wall8;
var ball, cpad, ppad;
var pgoal, cgoal;
var pscore = 0;
var cscore = 0;
var gameState = "serve";

function setup() {
  createCanvas(500, 500);
  wall1 = createSprite(250, 20, 460, 2);
  wall2 = createSprite(250, 480, 460, 2);
  wall3 = createSprite(20, 250, 2, 460);
  wall4 = createSprite(480, 250, 2, 460);
  wall5 = createSprite(250, 175, 450, 2)
  wall6 = createSprite(250, 325, 450, 2)
  wall1.shapeColor = "black";
  wall2.shapeColor = "black";
  wall3.shapeColor = "black";
  wall4.shapeColor = "black";
  wall5.shapeColor = "black";
  wall6.shapeColor = "black";
  ball = createSprite(250, 250, 20, 20);
  ball.shapeColor = rgb(255, 100, 100);
  cpad = createSprite(250, 70, 70, 20);
  cpad.shapeColor = "green";
  ppad = createSprite(250, 430, 70, 20);
  ppad.shapeColor = "green";
  pgoal = createSprite(250, 475, 130, 20);
  cgoal = createSprite(250, 25, 130, 20);
  pgoal.shapeColor = "yellow";
  cgoal.shapeColor = "yellow";
  edges = createEdgeSprites();
}

function draw() {
  background("lightblue");

  scoring();
  
  if(ball.x < 20 || ball.x > 480){
    gameState = "serve";
  }
  if(ball.y < 20 || ball.y > 480){
    gameState = "serve";
  }
  
  if (gameState === "serve") {
    ball.x = 250;
    ball.y = 250;
    ball.velocityX  = 0
    ball.velocityY = 0;
    ppad.x = 250;
    ppad.y = 430;
    cpad.x = 250;
    cpad.y = 70;
    ball.visible = true;
    textSize(20)
    text("Press Space to serve", 165, 225);
    if (keyDown("space")) {
      ball.velocityX = -10;
      ball.velocityY = 8;
      gameState = "play";
    }
  }
  if (gameState === "play") {
    bounces();
    controls();   
    cpad.x = ball.x; 
    cpad.bounceOff(wall3);
    cpad.bounceOff(wall4);
  }
  if (gameState == "end") {
    ppad.x = 250;
    ppad.y = 430;
    cpad.x = 250;
    cpad.y = 70;
    ball.visible = false;
    textSize(20);
    text("Game Over !!", 190, 240);
    text("Press 'R' to restart", 170, 270);
    if (keyDown("r")) {
      cscore = 0;
      pscore = 0;
      gameState = "serve";
    }
  }

  /*text("X : " + mouseX + "Y : " + mouseY , mouseX , mouseY);*/

  drawSprites();
}

function bounces() {
  ball.bounceOff(wall1);
  ball.bounceOff(wall2);
  ball.bounceOff(wall3);
  ball.bounceOff(wall4);
  ball.bounceOff(ppad);
  ball.bounceOff(cpad);
  ppad.bounceOff(wall2);
  ppad.bounceOff(wall3);
  ppad.bounceOff(wall4);
  ppad.bounceOff(pgoal);

}

function controls() {
  if (keyDown("left")) {
    ppad.x -= 10;
  }
  if (keyDown("right")) {
    ppad.x += 10;
  }
  if (keyDown("up")) {
    ppad.y -= 10;
  }
  if (keyDown("down")) {
    ppad.y += 10;
  }
  if (ppad.y <= 325) {
    ppad.y = 325;
  }
}

function scoring() {

  fill("black");
  textSize(15);
  text(pscore, 440, 280);
  text(cscore, 440, 220);

  if (ball.isTouching(pgoal) && cscore != 4) {
    cscore++;
    ball.x = 250;
    ball.y = 250;
    ball.velocityX = 0;
    ball.velocityY = 0;
    gameState = "serve";
  }
  if (ball.isTouching(pgoal) && cscore === 4) {
    ball.x = 250;
    ball.y = 250;
    ball.velocityX = 0;
    ball.velocityY = 0;
    cscore++;
    gameState = "end";
  }
  if (ball.isTouching(cgoal)) {
    ball.x = 250;
    ball.y = 250;
    ball.velocityX = 0;
    ball.velocityY = 0;
    pscore++;
    gameState = "serve";
  }
}