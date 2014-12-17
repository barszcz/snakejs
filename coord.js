(function() {
  if (typeof Snakes === 'undefined') {
    window.Snakes = {};
  }

  var Coord = Snakes.Coord = function (pos) {
    this.x = pos[0];
    this.y = pos[1];
  }

  Coord.prototype.add = function (otherCoord) {
    var x, y;
    x = this.x + otherCoord.x;
    y = this.y + otherCoord.y;
    return new Coord([x,y]);
  }





}());
