var score=0;

function preload(){
  krishnaimg=loadAnimation("images/run1.png","images/run2.png");
  bgImg=loadImage("images/bg3.jpg");
  potImg=loadImage("images/butter.png");
  bakasuraImg=loadImage("images/bakasura.png");
  //asura2Img=loadImage("images/");
  asura4Img=loadImage("images/asura4 copy.jpg");
  asura3Img=loadImage("images/asura3.png");
  krishna3Img=loadAnimation("images/krishna3.png");

}


function setup() {
  createCanvas(windowWidth,windowHeight);

bgSprite=createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
bgSprite.scale=0.5;

krishsprite=createSprite(200,380,40,40);
krishsprite.addAnimation("run",  krishnaimg)

invisibleg=createSprite(200,530,50*windowWidth,10);
 butterpotGroup=new Group()

krishsprite.velocityX=8;
//console.log(windowHeight);
  asuraGroup=createGroup();
}

function draw() {
  background("white");
  bgSprite.addImage(bgImg);
  
  camera.position.x=krishsprite.x+350;
  buttorpos=camera.position.x 
  bakasurapos=camera.position.x 
  

  camera.position.y=400;
  if(keyDown("space")){
    krishsprite.velocityY=-20;
    krishsprite.addAnimation("run2",  krishna3Img);
    console.log(krishsprite.y);
  }
  krishsprite.velocityY=krishsprite.velocityY+2;
  if(krishsprite.y>=366){
    krishsprite.changeAnimation("run",krishnaimg);

  }
  krishsprite.collide(invisibleg);
  spawnObstacles();
  spawnButterpot();
  if(krishsprite.isTouching(butterpotGroup)){
    butterpotGroup.destroyEach();
    score=score+10;
  }
  drawSprites();
  textSize(50);
  fill("green");
  text("SCORE :"+score,camera.position.x,windowHeight/2-150);
}

function spawnButterpot(){
  if(frameCount % 200 === 0){
    var Butterpot = createSprite(buttorpos+300,350,30,30);
    Butterpot.addImage(potImg);
    Butterpot.velocityX=-5;
    Butterpot.scale=0.7;
    butterpotGroup.add(Butterpot)
  }
}

function spawnObstacles(){
  if(frameCount % 280 === 0){
    var asura = createSprite(bakasurapos+280,330,30,30);
    var rand=Math.round(random(1,3));
    switch(rand){
      case 1: asura.addImage(bakasuraImg);
      asura.setCollider("rectangle",0,0,50,asura.height);

      break;
      case 2: asura.addImage(asura4Img);
      asura.y=370;
      asura.scale=2.5;
      asura.setCollider("rectangle",0,0,50,asura.height);
      break;
      case 3: asura.addImage(asura3Img);
      asura.velocityY=2;
      break;
    }
    asuraGroup.add(asura);
    asura.velocityX=-5;
    asura.scale=2.0;
    asura.debug=true;
  }
  if(krishsprite.isTouching(asuraGroup)){
    asuraGroup.destroyEach();
  }
}