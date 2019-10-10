//---------------GLOBAL VARIABLES---------------
var boardLength = 10;
var mineCount = boardLength*boardLength/10+3;
var flagsLeft = mineCount;
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
		$('#space-container').append(`<img id=${x},${y} src=${unrevealed} class="space" onclick=sweep(${x},${y})>`);
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

for (var i = 0; i < boardLength; i++) {
  for (var j = 0; j < boardLength; j++) {
    document.getElementById(i+','+j).src = unrevealed; 
  }
}

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
  	death();
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
  if (isMined(space) == false && space.isFlagged==false && space.isRevealed == false){
    reveal(space);
    space.isRevealed = true;
    if(reveal(space)>0) return;
    if(space.px > 0 && space.py > 0){parse(board[space.py-1][space.px-1])} //NW block
    if(space.py > 0){parse(board[space.py-1][space.px])} //N block
    if(space.px < boardLength-1 && space.py > 0){parse(board[space.py-1][space.px+1])} //NE block
		if(space.px > 0){parse(board[space.py][space.px-1])} //W 
		if(space.px < boardLength-1){parse(board[space.py][space.px+1])} //E block
		if(space.px > 0 && space.py < boardLength-1){parse(board[space.py+1][space.px-1])} //SW block
		if(space.py < boardLength-1){parse(board[space.py+1][space.px])} //S block
		if(space.px < boardLength-1 && space.py < boardLength-1){parse(board[space.py+1][space.px+1])} //SE block
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
  
  if (numDisplay == 0){document.getElementById(space.px+','+space.py).src = revealedblank}
  else if (numDisplay == 1){document.getElementById(space.px+','+space.py).src = one}
  else if (numDisplay == 2){document.getElementById(space.px+','+space.py).src = two}
  else if (numDisplay == 3){document.getElementById(space.px+','+space.py).src = three}
  else if (numDisplay == 4){document.getElementById(space.px+','+space.py).src = four}
  else if (numDisplay == 5){document.getElementById(space.px+','+space.py).src = five}
  else if (numDisplay == 6){document.getElementById(space.px+','+space.py).src = six}
  else if (numDisplay == 7){document.getElementById(space.px+','+space.py).src = seven}
  else if (numDisplay == 8){document.getElementById(space.px+','+space.py).src = eight}   
  return numDisplay;
}

//------------------------DEATH CODE -----------------------------------
function death(){
//timer death
clearInterval(t);
hours = 0;
minutes = 0;
seconds = 0;

//display bombs
for(var i=0; i<minePlace.length; i++){
    document.getElementById(JSON.stringify(minePlace[i][0])+ ',' + JSON.stringify(minePlace[i][1])).src = deathSpace;
}
}
//------------------------BOARD STATES (PICTURES) -----------------------------------
var initimage = null
var unrevealed = "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Fspring-color%2F200%2F14-256.png&f=1&nofb=1";
var revealedblank = "https://cdn2.iconfinder.com/data/icons/food-drink-60/50/1F351-peach-256.png"
var flagged = "https://cdn0.iconfinder.com/data/icons/ikooni-outline-seo-web/128/seo2-47-256.png"
var one = "https://cdn0.iconfinder.com/data/icons/internet-activity-3-1/32/number_one_count-256.png"
var two = "https://cdn0.iconfinder.com/data/icons/internet-activity-3-1/32/number_two_count-256.png"
var three = "https://cdn0.iconfinder.com/data/icons/internet-activity-3-1/32/number_three_count-256.png"
var four = "https://cdn0.iconfinder.com/data/icons/internet-activity-3-1/32/number_four_count-256.png"
var five = "https://cdn0.iconfinder.com/data/icons/internet-activity-3-1/32/number_five_count-256.png"
var six = "https://cdn0.iconfinder.com/data/icons/internet-activity-3-1/32/number_six_count-256.png"
var seven = "https://cdn0.iconfinder.com/data/icons/internet-activity-3-1/32/number_seven_count-256.png"
var eight = "https://cdn0.iconfinder.com/data/icons/internet-activity-3-1/32/number_eight_count-256.png"
var deathSpace = "https://cdn0.iconfinder.com/data/icons/vegetable-spice/512/22-chilli-pepper-chili-spice-512.png"
