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
	}
}