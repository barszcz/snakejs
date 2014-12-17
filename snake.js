(function() {
  if (typeof Snakes === 'undefined') {
    window.Snakes = {};
  }

  var Snake = Snakes.Snake = function(board) {
    this.board = board;
    this.dir = Snake.START_DIR;
    this.segments = [new Snakes.Coord(Snake.START_COORD)];
    this.growth = 0;
  }

  Snake.START_DIR = "N";
  Snake.START_COORD = [20,20];
  Snake.GROWTH_COUNTER = 3;

  Snake.DIRS = {
    "N": new Snakes.Coord([0,-1]),
    "E": new Snakes.Coord([1,0]),
    "S": new Snakes.Coord([0,1]),
    "W": new Snakes.Coord([-1,0])
  }

  Snake.prototype.isDead = function () {
    var head = this.segments[0];
    if (head.x < 0 || head.x > this.board.width ||
        head.y < 0 || head.y > this.board.height) {
          return true;
        }
    return this.segments.slice(1).some(function (seg) {
      return (seg.x === head.x && seg.y === head.y);
    })
  }

  Snake.prototype.move = function () {
    var nextCoord = this.segments[0].add(Snake.DIRS[this.dir]);
    if (nextCoord.x === this.board.apple.coord.x && nextCoord.y === this.board.apple.coord.y ) {
      this.board.score += 10;
      this.growth += Snake.GROWTH_COUNTER;
      this.board.setNewApple();
    }
    this.segments.unshift(nextCoord);
    if (this.growth) {
      this.growth -= 1;
    } else {
      this.segments.pop();
    }
  }

  Snake.prototype.turn = function (newDir) {
    var twoDirs = this.dir + newDir;
    var re = /([NS]{2})|([EW]{2})/;
    if (re.test(twoDirs)) {
      return;
    } else {
      this.dir = newDir;
    }
  }

}());
