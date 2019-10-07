

var boardLength;
var board = []; //this is an array of objects

$('#newgame').click(function(){ 
boardLength = 5; //test condition

for(var y=0; y<boardLength; y++){

	$('#space-container').append('<div>');
	if (!board[y]) board[y] = new Array (boardLength);

	for(var x=0; x<boardLength; x++){
		if (!board[y][x]) board[y][x] = new Space(x,y);
		$('#space-container').append('<input id="space" type="button" class="space">');
	}
	$('#space-container').append('</div>');
	}
	console.log(board);
})

class Space {
	constructor(x, y){
		this.xCoord = x;
		this.yCoord = y;
	}
}
