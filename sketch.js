var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  if(gameState !== "hungry"){
    feed.hide();
    add.hide();
    dog.remove();
  }
  else{
    feed.show();
    add.show();
    dog.addImage(dogimg1);
  }


  currenttime = hour();
  if(currenttime === (Lastfeed + 1)){
    update("playing");
    foodobject.garden();
  }
  else if(currenttime === (Lastfeed + 2)){
    update("sleeping");
    foodobject.bedroom();
  }
  else if(currenttime > (Lastfeed + 2) && currenttime <= (Lastfeed + 4)){
    update("bathing");
    foodobject.washRoom();
  }
  else{
    update("hungry")
  foodObj.display();
  }
  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(pos){
  if(pos>0){
    pos=pos-1
  }
  else{
    pos=0
  }
  database.ref('/').set({
    'Food': pos
  })

}
function AddFood(){
position++
database.ref('/').update({
  Food:position
}

)
}
function FeedDog(){

dog.addImage(dogimg2)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour()
 })
}

function update(state){
  database.ref('/').update({
    gameState: state
  });
}
