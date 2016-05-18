var tictactoe = {
	players: ["X","O"],
	turn: "",
	init: function() {
		grid.render();
		thisGame = this;
		thisGame.turn = thisGame.players[0];
		$('#gameState').html('Player <span class="player">'+thisGame.turn+'</span>\'s turn.');
		$('.cell').click(function() {
			if ( grid.cellIsEmpty(this) && !thisGame.gameOver() ) {
				grid.markCell(this, thisGame.turn);
				thisGame.turn = thisGame.nextPlayer();
				thisGame.updateState();
			}
		});
	},
	nextPlayer: function() {
		var nextI = (this.players.indexOf(this.turn) + 1) % this.players.length;
		return this.players[nextI];
	},
	updateState: function() {
		thisGame = this;
		if ( this.gameOver() ) {
			$('#gameState').addClass('game-over');
			if (this.winner()) {
				$('#gameState').html(thisGame.winner()+' wins! <a href="#">play again</a>');
			} else {
				$('#gameState').html('Game over! <a href="#">play again</a>');
			}
			thisGame = this;
			$('#gameState a').click(function(){
				$('#board').empty();
				thisGame.init();
				$('#gameState').removeClass('game-over');
				thisGame.updateState();
			});
		} else { 
			$('#gameState .player').text(this.turn);
		}
	},
	gameOver: function() {
		return grid.isFull() || this.winner();
	},
	winner: function() {
		var winner;
		for (var x = 0; x < grid.width; x++) {
			var col = grid.getCol(x);
			if ( grid.cellsMatch(col) ) {
				winner = $(col[0]).attr('data-mark');
				break;
			}
		}
		if (!winner) {
			for (var y = 0; y < grid.width; y++) {
				var row = grid.getRow(y);
				if ( grid.cellsMatch(row) ) {
					winner = $(row[0]).attr('data-mark');
					break;
				}
			}
		}
		if (!winner) {
			var diag = grid.getDiagDn();
			if ( grid.cellsMatch(diag) ) {
				winner = $(diag[0]).attr('data-mark');
			}
		}
		if (!winner) {
			var diag = grid.getDiagUp();
			if ( grid.cellsMatch(diag) ) {
				winner = $(diag[0]).attr('data-mark');
			}
		}
		return winner;
	}

}



var grid = {
	height: 3,
	width: 3,
	render: function() {
		for (y=0; y < this.height; y++) {
			var row = $('<div class="row"></div>').appendTo($("#board"));
			for (x=0; x < this.width; x++) {
				$(row).append('<div class="cell" data-coord="'+x+'-'+y+'" data-mark=""></div>');
			}
		}
	},
	getCell: function (coord) {
		return $('.cell[data-coord='+coord[0]+'-'+coord[1]+']');
	},
	getCoord: function(cell) {
		var coords = cell.attr("data-coord").split("-");
		$.each(coords, function(i, value) {
			coords[i] = parseInt(value);
		});
		return coords;
	},
	cellIsEmpty: function(cell) {
		return $(cell).attr("data-mark") == "" && $(cell).html() == "";
	},
	coordIsEmpty: function(coord) {
		var cell = getCell(coord);
		return cellIsEmpty(cell);
	},
	markCell: function(cell,mark) {
		$(cell).attr("data-mark", mark);
		$(cell).html(mark);
	},
	isFull: function() {
		thisGrid = this;
		var full = true;
		$('.cell').each(function(index) {
			if ( thisGrid.cellIsEmpty(this) ) {
				full = false;
				return false;
			}
		});
		return full;
	},
	getRow: function(row) {
		return $('.cell[data-coord$=-'+row+']');
	},
	getCol: function(col) {
		return $('.cell[data-coord^='+col+'-]');
	},
	getDiagDn: function() {
		var diag = [];
		for (var i = 0, j = 0; i < this.width, j < this.height; i++, j++) {
			diag.push($('.cell[data-coord='+i+'-'+i+']'));
		}
		return diag;
	},
	getDiagUp: function() {
		var diag = [];
		for (var i = 0, j = this.height-1; i < this.width, j>=0; i++, j--) {
			diag.push($('.cell[data-coord='+i+'-'+j+']'));
		}
		return diag;
	},
	cellsMatch: function(cellSet) {
		var thisGrid = this;
		var mark = $(cellSet[0]).attr("data-mark");
		set = $.grep( cellSet, function(cell){ return !thisGrid.cellIsEmpty(cell) && $(cell).attr("data-mark") == mark; });
		return set.length == thisGrid.width;
	}
}