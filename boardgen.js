

var boardLength;
var board = []; //this is an array of objects

//------------------------BOARD STATES (PICTURES) -----------------------------------
var unrevealed = "http://bit.do/hammyboi"
var revealedblank =
var flagged =
var one = 
var two = 
var three = 
var four = 
var five = 
var six = 
var seven = 
var eight = 



$('#newgame').click(function(){ 
boardLength = 10; //default board size

for(var y=0; y<boardLength; y++){

	$('#space-container').append('<div>');
	if (!board[y]) board[y] = new Array (boardLength);

	for(var x=0; x<boardLength; x++){
		if (!board[y][x]) board[y][x] = new Space(x,y);
		$('#space-container').append(`<img src=${unrevealed} class="space">`);
	}
	$('#space-container').append('</div>');
	}
	console.log(board);
})

class Space {
	constructor(x, y){
		this.xCoord = x;
		this.yCoord = y;
		this.isFlagged = false;
		this.isRevealed = false;
	}
}
