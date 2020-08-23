var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var ground, ground_running, ob;

var body, body_running;
var ls, rs;
var ObstaclesGroup, EnemiesGroup, Enemies2Group, count, count2;

function preload(){ 
 ground_running = loadImage("road.png");
  body_running = loadImage("car3.png");
  ob1 = loadImage("car1.png");
  ob2 = loadImage("car2.png");
  ob3 = loadImage("car4.png");
} 

function setup() { 
  createCanvas(400, 400); 
 
  ground = createSprite(220,200,200,800);
 //ground.visible = false;
  ground.velocityY =3;
  ground.y = ground.height /2;
  ground.addImage(ground_running);
  ground.scale = 1.84;
  
   body = createSprite(250,350,20,20);
  body.addImage(body_running);
  body.scale = 0.7;
  
ls = createSprite(100,200,10,400);
 ls.visible = false;
 rs = createSprite(300,200,10,400);
 rs.visible = false;
  
ObstaclesGroup = createGroup();
EnemiesGroup = createGroup();
  count = 0;
  count2 = 0;
 
} 

function draw() { 
  background("white"); 
  text("Score: "+count,310,30);
  if(gamestate === PLAY){
  count = count2/100
  count2 = count2 + Math.round(World.frameRate/60);
  
   if (ground.y>400){
     ground.y = 100;
   }
  
  if(keyDown(LEFT_ARROW)){
    body.x = body.x-10;
  }
   if(keyDown(RIGHT_ARROW)){
    body.x = body.x+10;
  }
   
   body.collide(ls);
  body.collide(rs);
  
  
  spawnEnemies();
  }
  if(EnemiesGroup.isTouching(body)){
    gamestate = END;
   
    
  }
  if(gamestate === END){
     EnemiesGroup.destroyEach();
    body.visible = false;
    ground.visible = false;
    text("GAME OVER",200,200);
    text("PRESS SPACE TO RESTART",180,220);
  }
  if(keyDown("space")&&gamestate ===END){
    count = 0;
    count2 = 0;
    gamestate=PLAY;
    body.visible = true;
    ground.visible = true;
  }
 
  drawSprites(); 
}


function spawnEnemies(){
  if (World.frameCount % 70 === 0) {
  var rand2 = random(130,270);   
   var enemy = createSprite(rand2,0,20,40);
   enemy.velocityY = (3 + 1*count/200);
   enemy.scale = 0.7;
   var rand = random(1,3);
  enemy.addImage(ob2);
  // enemy.lifetime = 160;
   //enemy.scale = 0.7;
   
   EnemiesGroup.add(enemy);
   }
     
 } 

