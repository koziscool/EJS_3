
var plan = ["############################",
            "#      #    #      o      ##",
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##       o             #",
            "# o  #         o       ### #",
            "#    #                     #",
            "############################"];

var Vector = function(x, y){
  this.x = x;
  this.y = y;
};

Vector.prototype.plus = function( other ){
  return new Vector(this.x + other.x, this.y + other.y );
};

var Grid = function(width, height) {
  this.space = new Array( width * height );
  this.width = width;
  this.height = height;
};

Grid.prototype.get = function( vector ){
  return this.space[vector.x + this.width * vector.y ];
};

Grid.prototype.set = function( vector, value ){
  this.space[vector.x + this.width * vector.y ] = value;
};

var directions = {
  "n":  new Vector( 0, -1),
  "ne": new Vector( 1, -1),
  "e":  new Vector( 1,  0),
  "se": new Vector( 1,  1),
  "s":  new Vector( 0,  1),
  "sw": new Vector(-1,  1),
  "w":  new Vector(-1,  0),
  "nw": new Vector(-1, -1)
};

var randomElt = function( arr ) {
  return arr[ Math.floor(Math.random() * arr.length)];
};

var directionKeys = "n ne e se s sw w nw".split(' ');

var BouncingCritter = function() {
  this.direction = randomElt( directionKeys );
};

BouncingCritter.prototype.act = function( view ) {
  if (view.look(this.direction) !== ' ')
    this.direction = view.find(' ') || 's';
  return { type: "move", direction: this.direction };
};

var eltFromChar = function( legend, c ){
  if( c === " ") return null;
  var elt = new legend[c]();
  elt.originChar = c;
  return elt;
};

var charFromElt = function( elt ){
  if( elt === null ) return " ";
  else return elt.originChar;
};

var World = function( map, legend ){
  var grid = new Grid( map[0].length, map.length );
  this.grid = grid;
  this.legend = legend;

  map.forEach( function( rowChars, rowIndex ){
    for( var colIndex = 0; colIndex < rowChars.length; colIndex++ )
      grid.set( new Vector(colIndex, rowIndex), eltFromChar(legend, rowChars[colIndex]) );
  });
};

World.prototype.toString = function( ){
  var ret_str = "";
  for ( var rowIndex = 0; rowIndex < this.grid.height; rowIndex++ ){
    for ( var colIndex = 0; colIndex < this.grid.width; colIndex++ ){
      var elt = this.grid.get( new Vector( colIndex, rowIndex));
      ret_str += charFromElt( elt );
    }
    ret_str += '\n';
  }
  return ret_str;
}

var Wall = function() {};

var world = new World(plan, {"#": Wall,
                             "o": BouncingCritter});
console.log(world.toString());

