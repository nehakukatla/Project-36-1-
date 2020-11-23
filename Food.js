class Food{
    //create variables and preload images along with creating the Food class object
    constructor(){
    this.foodStock=0;
    this.lastFed;
    this.image=loadImage('Milk.png');
   }

   //update food stock
   updateFoodStock(foodStock){
    this.foodStock=foodStock;
   }

   //get the last fed time
   getFedTime(lastFed){
    this.lastFed=lastFed;  
   }

   //removing milk bottles
   deductFoodStock(){
    if(this.foodStock>0){
        this.foodStock=this.foodStock-1;
    }
   }

   //food stock
   getFoodStock(){
    return this.foodStock;
   }

   //functions for respective backgrounds
   bedroom(){
    background(bedroomImg, 500,500);
   }
   garden(){
    background(gardenImg, 500,500);
   }
   washroom(){
    background(washroomImg, 500,500);
   }

   //display
   display(){
       var x=45, y=50;

       imageMode(CENTER);
       image(this.image, 720, 220, 70, 70);

       if(this.foodStock !== 0){
           for(var i=0; i<this.foodStock; i++){
               if(i%5 === 0){
                   x=45;
                   y=y+50;
               }
               image(this.image,x,y,50,50);
               x=x+30;
           }
       }
       
       //condition for gameState
       if(gameState != "Hungry"){
        feed.hide();
        addFood.hide();
        dog.remove(); 
      }
      else{
        feed.show();
        addFood.show();
        dog.addImage(sadDog);
      }

       //update gameState and backround
       currentTime= hour();
       if(currentTime===(lastfed+1)){
           update("Playing");
           foodObj.garden();
       }
       else if(currentTime==(lastfed+2)){
           update("Sleeping");
           foodObj.bedroom();
       }
       else if(currentTime>(lastFed+2)&& currentTime<=(lastFed+4)){
        update("Bathing");
        foodObj.washroom();
       }
       else{
        update("Hungry");
        foodObj.display();
      }
   }
}