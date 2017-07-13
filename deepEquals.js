
var deepEqual = function( obj1, obj2 ){
  if ( typeof(obj1) !== "object") return obj1 === obj2;
  if ( typeof(obj2) !== "object" ) { 
    return false;
  }
  if (obj1.length !== obj2.length) return false;

  for (var i in obj1) {
    if ( !deepEqual( obj1[i], obj2[i] ) ) return false;
  }
  return true;
}

var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
console.log(deepEqual(obj, {here: 1, object: 2}));
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
