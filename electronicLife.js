
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

Grid.prototype.isInside = function(vector) {
  return vector.x >= 0 && vector.x < this.width &&
      vector.y >= 0 && vector.y < this.height;
};

Grid.prototype.get = function( vector ){
  return this.space[vector.x + this.width * vector.y ];
};

Grid.prototype.set = function( vector, value ){
  this.space[vector.x + this.width * vector.y ] = value;
};

Grid.prototype.forEach = function(f, context) {
  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x < this.width; x++) {
      var value = this.space[x + y * this.width];
      if (value != null)
        f.call(context, value, new Vector(x, y));
    }
  }
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
  if ( view.look(this.direction ) !== ' ')
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

World.prototype.turn = function() {
  var acted = [];
  this.grid.forEach( function(critter, vector){
    if( critter.act && acted.indexOf( critter ) < 0 ) {
      acted.push(critter);
      this.letAct(critter, vector);
    }
  }, this );
};

World.prototype.letAct = function( critter, vector ) {
  var action = critter.act( new View(this, vector));
  if( action && action.type === "move") {
    var dest = this.checkDestination(action, vector);
    if (dest && this.grid.get(dest) === null ){
      this.grid.set( vector, null );
      this.grid.set( dest, critter );
    }
  }
};

World.prototype.checkDestination = function(action, vector) {
  if(directions.hasOwnProperty(action.direction)) {
    var dest = vector.plus(directions[action.direction]);
    if(this.grid.isInside(dest))
      return dest;
  }
}

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

var View = function( world, vector) {
  this.world = world;
  this.vector = vector;
};

View.prototype.look = function(dir) {
  var target = this.vector.plus(directions[dir]);
  if( this.world.grid.isInside(target) )
    return charFromElt(this.world.grid.get(target));
  else
    return "#";
};

View.prototype.findAll = function(c){
  var  found = [];
  for( var dir in directions ){
    if( this.look(dir) === c)
      found.push(dir);
  }
  return found;
};

View.prototype.find = function(c){
  var found = this.findAll(c)
  if(found.length === 0) return null;
  else return randomElt( found );
};

var world = new World(plan, {"#": Wall,
                             "o": BouncingCritter});
console.log(world.toString());

for (var i = 0; i < 5; i++) {
  world.turn();
  console.log();
  console.log(world.toString());
}
