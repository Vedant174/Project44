var playerImg;
var obstacleImg,obstacle2Img,obstacle3Img,obstacle4Img;
var platformImg;
var groundImg;
var gameOverImg;
var restartImg;
var life,lifeImg;
var obstacleGroup,platformGroup;
var bool=false;
// var boolPlatform=false;
var platform;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var playerLife = 2;
var check=0;
function preload(){
  playerImg = loadImage("sprites/Player.png");
  obstacleImg = loadImage("sprites/Obstacle.png");
  platformImg = loadImage("sprites/Platform.png");
  gameOverImg = loadImage("sprites/GameOver.png");
  restartImg = loadImage("sprites/Restart.png");
  obstacle2Img = loadImage("sprites/Obstacle2.png");
  obstacle3Img = loadImage("sprites/Obstacle3.png");
  obstacle4Img = loadImage("sprites/Obstacle4.png");
  lifeImg = loadImage("sprites/Life.png");
  groundImg = loadImage("sprites/Ground.png");

}

function setup() {
  createCanvas(1200,600);
  ground = createSprite(600, 570, 1300, 50);
  ground.addImage(groundImg);
  

  player = createSprite(200, 519, 40, 40);
  player.addImage(playerImg);
  player.debug=true
  player.scale = 0.1;
  gameOver = createSprite(600, 200, 100, 50);
  gameOver.addImage(gameOverImg);
  restart = createSprite(600, 400, 100, 50);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  obstacleGroup = createGroup();
  platformGroup = createGroup();
}

function draw() {
  background("blue");  

  if(gameState === PLAY){

    player.visible = true;
    gameOver.visible = false;
    restart.visible = false;

    // console.log(player.y);

    player.collide(ground);

    // player.velocityX = 9;
    ground.velocityX = -10;
  
    if(ground.x < 600){
      ground.x = ground.width/2;
    }
  
    if(keyDown("space") && player.y >= 500){
      player.velocityY = -13 ;
    }
      player.velocityY = player.velocityY + 0.8;
    
  
    if(player.x > 600){
      player.velocityX = 0;
    }
    
    if(obstacleGroup.isTouching(player)){
      
      if(playerLife === 0){
        gameState = END;
      }else{
        playerLife -= 1;
        player.velocityY = -16 ;
      }
    }

    spawnObstacles();
    if(bool){
      if(player.isTouching(life)){
        console.log("touching")
        life.destroy();
        playerLife++;
      }
    }
   
      // collision on top
      if(platformGroup.isTouching(player)){
        for(var i = 0; i<platformGroup.length; i++){
          if(platformGroup.get(i).y-player.y<= platformGroup.get(i).height/2+player.height/2){
            player.bounceOff(platformGroup.get(i));
            gameState = END;
            console.log("on platform");
          }
        }
      }
          

  }else if (gameState === END){
    player.collide(obstacleGroup);
    player.visible = false;
    gameOver.visible = true;
    restart.visible = true;
    player.velocityY=0;

  }

  if(mousePressedOver(restart)){
    reset();
  }

  stroke("red");
  textSize(30);
  text("Life - " + playerLife, 1000, 30);
 
  
  drawSprites();
}

//platform.y-player.y === platform.height/2+player.height/2


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    check++;
    var obstacle = createSprite(1200,510,10,40);
    obstacle.velocityX = -(10);
    //obstacle.debug=true
    //generate random obstacles
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.1;    
    obstacle.lifetime = 120;
     //checkpoint 1
    if(check >= 5){
     obstacle.addImage(obstacle2Img);
     if(check === 7){
       spawnLife();
     }
    }
    //checkpoint 2
    else if(check>=10){
      obstacle.addImage(obstacle3Img);
      if(check === 12){
        spawnLife();
      }
    }
    //checkpoint 3
    else if(check>=15){
      obstacle.addImage(obstacle4Img);
       spawnPlatform();
    }
    obstacleGroup.add(obstacle); 
  }
}

function reset(){
  check=0;
  count = 0;
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  player.visible = true;
  playerLife = 2;
  obstacleGroup.destroyEach();
}

function spawnLife(){
  bool=true;
  life = createSprite(1200,390,40,40);
  life.velocityX = -10;
   life.addImage(lifeImg);
   life.debug=true
  //  life.setCollider("rectangle",0,0,100,100);
  life.scale = 0.1;
  life.lifetime = 120;
}

function spawnPlatform(){
  // boolPlatform=true;
   platform = createSprite(1200,460,100,100);
    platform.velocityX = -10;
    platform.debug=true
     platform.setCollider("rectangle",0,0,100,100);
    //generate random obstacles
    platform.addImage(platformImg);
    platform.scale = 0.1; 
    platform.lifetime = 120;
    platformGroup.add(platform);
}
