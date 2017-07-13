
var every = function( arr, test ){
  return arr.reduce( function(current, elt){
    return current && test(elt);
  }, true);
};

var some = function( arr, test ){
  return arr.reduce( function(current, elt){
    return current || test(elt);
  }, false);
};

console.log(every([NaN, NaN, NaN], isNaN));
console.log(every([NaN, NaN, 4], isNaN));
console.log(some([NaN, 3, 4], isNaN));
console.log(some([2, 3, 4], isNaN));

