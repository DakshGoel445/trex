var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstacleGroup,obstacleImage1,obstacleImage2,obstacleImage3,obstacleImage4,obstacleImage5,obstacleImage6;

var cloudGroup,cloudImage;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  obstacleImage1 = loadImage("obstacle1.png"); 
  obstacleImage2 = loadImage("obstacle2.png"); 
  obstacleImage3 = loadImage("obstacle3.png"); 
  obstacleImage4 = loadImage("obstacle4.png"); 
  obstacleImage5 = loadImage("obstacle5.png"); 
  obstacleImage6 = loadImage("obstacle6.png"); 
  
  cloudImage = loadImage("cloud.png")
  
  groundImage = loadImage("ground2.png")
}

function setup() {
  createCanvas(600, 200);
  
  cloudGroup=new Group();
  
  
  obstacleGroup= new Group ();
  
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
}

function draw() {
  background(180);
  
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  spawnClouds();
  spawnObstacles();
  
  trex.collide(invisibleGround);
  drawSprites();
}



function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
        case 1:  obstacle.addImage(obstacleImage1);
                 break;  
        case 2:  obstacle.addImage(obstacleImage2);
                 break;
                 
        case 3:  obstacle.addImage(obstacleImage3);
                 break; 
        case 4:  obstacle.addImage(obstacleImage4);
                 break;
                 
        case 5:  obstacle.addImage(obstacleImage5);
                 break;  
        case 6:  obstacle.addImage(obstacleImage6);
                 break;
                 
        default: break;
        
    }
  
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 110;
    
    obstacleGroup.add(obstacle);
    
  }
}




function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,265,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 210;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudGroup.add(cloud);
  }
  
}