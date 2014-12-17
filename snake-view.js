(function() {
  if (typeof Snakes === 'undefined') {
    window.Snakes = {};
  }


  var View = Snakes.View = function (ctx) {
    this.ctx = ctx;
    this.board = new Snakes.Board();
    this.bindEvent();
    this.makeDisplay();
    this.game = setInterval(this.step.bind(this), 50);
  };

  View.prototype.step = function () {
    this.board.snake.move();
    this.makeDisplay();
    $("#score").text("Score: " + this.board.score);
    if (this.board.snake.isDead()) {
      alert("Game over");
      clearInterval(this.game);
    }
  }

  View.prototype.bindEvent = function () {
    var view = this;
    key('down', function () {
      view.board.snake.turn("S");
    });

    key('up', function () {
      view.board.snake.turn("N");
    });

    key('left', function () {
      view.board.snake.turn("W");
    });

    key('right', function () {
      view.board.snake.turn("E");
    });
  }

  View.prototype.makeDisplay = function () {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.beginPath();
    var x, y, img;
    var boardArr = this.board.render();
    for (var i = 0; i < boardArr.length; i++) {
      y = 15 * i;
      for (var j = 0; j < boardArr.length; j++) {
        x = 15 * j;
        img = new Image;
        switch (boardArr[i][j]) {
          case 'S':
            img.src = './tommy.png';
            break;
          case 'A':
            img.src = './jonathan.png';
            break;
          default:
            continue;
        }
        this.ctx.drawImage(img, x, y);
      }
    }
  }

}());
