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
    var boardString = ''
    for (var i = 0; i < this.height; i++) {
      for (var j = 0; j < this.width; j++) {
        var isSnake = this.isSnake(j,i);
        var isApple = this.isApple(j,i);
        if (isSnake) {
          boardString += 'S';
        } else if (isApple){
          boardString += 'A';
        } else {
          boardString += '.';
        }
      }
      boardString += '\n';
    }
    return boardString;
  };

}());
