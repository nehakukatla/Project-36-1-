var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var fedTime, lastFed, feed, addFood;
var foodObj;
var gameState, readState, currentTime;
var bedroomImg, gardenImg, washroomImg;

//preload images
function preload(){
   dogImg=loadImage("dogImg.png");
   dogImg1=loadImage("dogImg1.png");
   bedroomImg=loadImage("images/Bed Room.png");
   gardenImg=loadImage("images/Garden.png");
   washroomImg=loadImage("images/Wash Room.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(500,500);

  //create milk bottle
  foodObj = new Food();

  //fetch value of Food
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  //create dog
  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  //create "Feed the Dog" button
  feed=createButton("Feed the Dog");
  feed.position(600,95);
  feed.mousePressed(feedDog);

  //create "Add Food" button
  addFood=createButton("Add Food");
  addFood.position(500,95);
  addFood.mousePressed(addFoods);

  //read gameState from database
  readState= database.ref('gameState');
  readState.on("value",function(data){
    gameState= data.val();
  });
}

// function to display
function draw() {
  //color the background green
  background(46,139,87);

  //display milk
  foodObj.display();

  //fetch last fed time
  fedTime=database.ref('FeedTime');
  fedTime.on("value", function(data){
  lastFed = data.val();
  });

  // text properties
  fill(255,255,254);
  textSize(15);
  stroke("black");

  //function to create last fed time
  if(lastFed ===0){
    text("Last Feed: 12 AM", 350,30);
  }
  else if(lastFed>12){
    text("Last Feed: "+ lastFed%12 + " PM", 350, 30);
  }
  else if(lastFed ===12){
    text("Last Feed: 12 PM", 350,30);
  }
  else{
    text("Last Feed: "+ lastFed + " AM", 350, 30);
  }

  //display sprites
  drawSprites();
}

//Function to read foodStock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

//add dog's image and update food stock and last fed time
function feedDog(){
  dog.addImage(dogImg1);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

// add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}

//function to add gameState in database
function update(state){
  database.ref('/').update({
      gameState: state
  });
}