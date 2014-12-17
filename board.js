(function() {

  if (typeof Snakes === 'undefined') {
    window.Snakes = {};
  }

  var Board = Snakes.Board = function () {
    this.snake = new Snakes.Snake(this);
    this.height = Board.HEIGHT;
    this.width = Board.WIDTH;
    this.score = 0
    this.setNewApple();

  }

  Board.HEIGHT = 50;
  Board.WIDTH = 50;
  Board.GROWTH_COUNTER = 3;

  Board.prototype.setNewApple = function () {
    var appleCoord;

    var valid = false;

    while (!valid) {
      valid = true;
      var randX = Math.floor(Board.WIDTH * Math.random());
      var randY = Math.floor(Board.HEIGHT * Math.random());
      appleCoord = new Snakes.Coord([randX,randY]);
      this.snake.segments.forEach( function (snakeCoord) {
        if (snakeCoord.x === appleCoord.x && snakeCoord.y === appleCoord.y) {
          valid = false;
        }
      })
    }

    this.apple = new Snakes.Apple(appleCoord);
  }


  Board.prototype.isSnake = function (x,y) {
    var found = false;
    this.snake.segments.forEach(function (segment) {
      if (x === segment.x  && y === segment.y) {
        found = true;
        return;
      }
    })
    return found;
  };

  Board.prototype.isApple = function (x,y) {
    return (this.apple.coord.x === x && this.apple.coord.y === y);
  }

  Board.prototype.render = function () {
    var renderArr = []
    for (var i = 0; i < this.height; i++) {
      renderArr[i] = [];
      for (var j = 0; j < this.width; j++) {
        renderArr[i].push(".");
      }
    }
    this.snake.segments.forEach(function (seg) {
      var x = seg.x;
      var y = seg.y;
      renderArr[y][x] = "S";
    });
    renderArr[this.apple.coord.y][this.apple.coord.x] = "A";
    return renderArr.join('');
  };

}());
