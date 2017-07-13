
var flatten = function( arr ) {
  var addElt = function( arr, elt ) {
      return arr.concat( elt );
  }
  return arr.reduce(addElt, [] )
}

var arrays = [[1, 2, 3], [4, 5], [6]];
console.log( flatten(arrays));

