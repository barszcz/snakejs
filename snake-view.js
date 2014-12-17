(function() {
  if (typeof Snakes === 'undefined') {
    window.Snakes = {};
  }


  var View = Snakes.View = function ($el) {
    this.$el = $el;
    this.board = new Snakes.Board();
    this.bindEvent();
    this.makeDisplay();
    this.game = setInterval(this.step.bind(this), 500);
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
    $("li").remove();
    var boardString = this.board.render();
    for (var i = 0; i < boardString.length; i++) {
      if (boardString[i] === 'S') {
        this.$el.append($("<li class=\"snake\"></li>"));
      } else if (boardString[i] === '.') {
        this.$el.append($("<li></li>"));
      } else if (boardString[i] === 'A'){
        this.$el.append($("<li class=\"apple\"></li>"));
      } else {
        continue;
      }
    }
  }

}());
