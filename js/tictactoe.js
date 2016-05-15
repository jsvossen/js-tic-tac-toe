var tictactoe = {
	players: ["X","O"],
	turn: "",
	init: function() {
		grid.render();
		thisGame = this;
		thisGame.turn = thisGame.players[0];
		$('.cell').click(function() {
			if (grid.cellIsEmpty(this)) {
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
		$('#gameState .player').text(this.turn);
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
	}
}