

var boardLength;
var board = []; //this is an array of objects
//var flaggedSpaces = [];
//var revealedBlank = []; //unsure if this and the above should actually be init
var hammy = "http://bit.do/hammyboi"

$('#newgame').click(function(){ 
boardLength = 10; //default board size

for(var y=0; y<boardLength; y++){

	$('#space-container').append('<div>');
	if (!board[y]) board[y] = new Array (boardLength);

	for(var x=0; x<boardLength; x++){
		if (!board[y][x]) board[y][x] = new Space(x,y);
		$('#space-container').append(`<img src=${hammy} id="space">`);
	}
	$('#space-container').append('</div>');
	}
	//console.log(board);
})

class Space {
	constructor(x, y){
		this.xCoord = x;
		this.yCoord = y;
	}
}
