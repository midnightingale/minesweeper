//---------------GLOBAL VARIABLES---------------
var boardLength = 10;
var mineCount = 100;
var flagsLeft = 10;
var minesMarked = 0;
var gameOn = false;

var board = []; //2d array of Space objects
var minePlace = []; //2d array of mine coords

//timer vars
var t, hours, minutes, seconds; 


class Space {
	constructor(x, y){
		this.px = x;
		this.py = y;
		this.isFlagged = false;
		this.isRevealed = false;
	}
}

//---------------INIT---------------
function init(){
for(var y=0; y<boardLength; y++){
	$('#space-container').append('<div>');
	if (!board[y]) board[y] = new Array (boardLength);
	for(var x=0; x<boardLength; x++){
		if (!board[y][x]) board[y][x] = new Space(x,y);
		$('#space-container').append(`<img src=${unrevealed} class="space" onclick=sweep(${x},${y})>`);
		}
	$('#space-container').append('</div>');
	}
}

//---------------START GAME---------------
$('#newgame').click(function(){ 
gameOn = !gameOn; 
if(!gameOn){death();}
else{
timeStart(); 
//-----------minegen-----------
for(var i = 0; i < mineCount; i++){
 xval = Math.floor(Math.random()*boardLength);
 yval = Math.floor(Math.random()*boardLength);
 minePlace[i] = [xval, yval]; //he generate points
}
for(var j=0; j<mineCount; j++){ //he check that no doubles 
  for(var k = j; k < mineCount; k++){
    if(k != j && JSON.stringify(minePlace[k])==JSON.stringify(minePlace[j])){
      minePlace[j] = [Math.floor(Math.random()*boardLength),
      Math.floor(Math.random()*boardLength)];
      k=0;
     	j=0;
		}
	}
} 

} 
}) 

//---------------TIMER CODE---------------
function timeStart(){
var temp = Date.now(); //saves start time

t = setInterval(addOneSecond, 1000);

function addOneSecond(){
hours = Math.floor((Date.now() - temp)/1000/3600);
minutes = Math.floor((Date.now() - temp)/1000/60 - hours*60);
seconds = Math.floor((Date.now() - temp)/1000 - minutes*60);

//code below displays the time in a consistent format
if(hours==0 && seconds<10){$('#timer').html("Time: " + minutes + ":0" + seconds);}
else if(hours==0){$('#timer').html("Time: " + minutes + ":" + seconds);}
else {$('#timer').html("Time: " + hours + ":" + minutes + ":" + seconds);}
}
} 

//---------------ON LEFTCLICK CODE---------------
function sweep(x, y){
	sweptSpace = board[y][x];

	if(gameOn && sweptSpace.isRevealed == false){
  	if(isMined(sweptSpace) == true){
  	death(image);
		}
		else if(sweptSpace.isFlagged == false){
		parse(sweptSpace);
		}
	}
}


function isMined(space){
  for(var i=0; i<minePlace.length; i++){
    if(space.px == minePlace[i][0] && space.py == minePlace[i][1]){
      return true;
    }
  }
  return false;
}

function parse(space){
  return 5;
  if (space.isMined == true || space.isFlagged==true || space.isQuestion==true){
    return false;
  }
  else{ 
    reveal(space);
    if(space.px != 0 && space.py != 0){parse(board[space.py-1][space.px-1])} //NW block
    if(space.py != 0){parse(board[space.py-1][space.px])} //N block
    if(space.px != boardLength-1 && space.py != 0){parse(board[space.py-1][space.px+1])} //NE block
		if(space.px != 0){parse(board[space.py][space.px-1])} //W 
		if(space.px != boardLength-1){parse(board[space.py][space.px+1])} //E block
		if(space.px != 0 && space.py != boardLength-1){parse(board[space.py+1][space.px-1])} //SW block
		if(space.py != boardLength-1){parse(board[space.py+1][space.px])} //S block
		if(space.px != boardLength-1 && space.py != boardLength-1){parse(board[space.py+1][space.px+1])} //SE block
  }
}

function reveal(space){
  var numDisplay=0;
  for(var i=-1;i<2;i++){
    for(var j=-1;j<2;j++){
      for(var f=0;f<minePlace.length;f++)
      if(space.px + i == JSON.stringify(minePlace[f][0]) && space.py + j == JSON.stringify(minePlace[f][1])){
      numDisplay++;
			
    }
   }
  }
}

//------------------------DEATH CODE -----------------------------------
function death(){
//timer death
clearInterval(t);
hours = 0;
minutes = 0;
seconds = 0;

//display bombs

$(image).src = deathSpace;
}
//------------------------BOARD STATES (PICTURES) -----------------------------------
var unrevealed = "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Fspring-color%2F200%2F14-256.png&f=1&nofb=1"
/*var revealedblank =
var flagged =
var one = 
var two = 
var three = 
var four = 
var five = 
var six = 
var seven = 
var eight = 
*/
var deathSpace = "https://cdn0.iconfinder.com/data/icons/meal-icons/1536/meal_07-256.png"
