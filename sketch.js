var bird,birdimg;
var coin,coinimg;
var rock,rockimg;
var sky,skyimg;
var CoinCollection=0;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;


function preload(){
    birdimg=loadImage("babybluebirdcode.png")
    coinimg=loadImage("goldcoincode.png");
    rockimg=loadImage("rockcode.png");
    skyimg=loadImage("skycode.png");
}

function setup(){
    createCanvas(WindowWidth,WindowHeight);
sky=createSprite(width/2,200);
sky.addImage(skyimg);
 sky.velocityX=-5;
    
bird=CreateSprite(70,150);
bird.addImage(birdimg);
bird.scale=0.7;

bird.setCollider("rectangle",0,0,40,40);

gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;

rockG= new Group();
coinG= new Group();

}


function draw() {

  if(gameState===PLAY){
    background(0);
    distance = distance + Math.round(getFrameRate()/50);
    sky.velocityX = -(6 + 2*distance/150);
   
    bird.y = World.mouseY;
   
    edges= createEdgeSprites();
    bird .collide(edges);
   
   if(path.x < 0 ){
     sky.x = width/2;
   }

   createRocks();
   createCoins();

   if(coinG.isTouching(bird)){
     coinG.destroyEach();
     CoinCollection=CoinCollection+1;
   }else{
     if(rockG.isTouching(bird)){
       gameState=END;
       

       coinG.setVelocityYEach(0);
       rockG.setVelocityYEach(0);

       coinG.destroyEach();
       rockG.destroyEach();
       coinG.setLifetimeEach(-1);
       rockG.setLifetimeEach(-1);

       gameOver.visible=true;
       text("Press Up Arrow to Restart the Game");

       if(mousePressedOver(UpArrow)){
         reset();
       }
      


     }
   }
   drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  text("Coins"+CoinCollection,5,30);


   
  }
}

function createCoins(){
  if (World.frameCount % 200 == 0) {
    var coin  = createSprite(Math.round(random(50,width-50),40, 10, 10));
    coin.addImage(coinimg);
    coin.scale=0.12;
    coin.velocityY = 3;
    coin.lifetime = 150;
    coinG.add(coin);
    }

}

function createRocks(){
  if (World.frameCount % 530 == 0) {
    var rock = createSprite(Math.round(300,40, 10, 10));
    rock.addImage(rockimg);
    rock.scale=0.1;
    rock.velocityY = 3;
    rock.lifetime = 150;
    rockG.add(rock);
    }

}


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  bird.addImage(bird);

  distance=0;

}
