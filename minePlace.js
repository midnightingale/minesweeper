//this file is obsolete
var mineCount=12
var boardLength=8
var minePlace=[]
for(var i = 0; i < mineCount; i++){
 xval=Math.floor(Math.random()*boardLength)
 yval=Math.floor(Math.random()*boardLength)
 minePlace[i]=[xval, yval]
 //he generate points
 }
 for(var j=0; j<mineCount;j++){
   for( var k = j; k < mineCount; k++){
     if(k != j){
       if(JSON.stringify(minePlace[k])==JSON.stringify(minePlace[j])) {
       minePlace[j] = [Math.floor(Math.random()*boardLength),
       Math.floor(Math.random()*boardLength)]
       
       k=0
       j=0
     }
   }
 }
 }
 //he check that no doubles
