
var prepend = function( elt, obj ) {
  return {
    value: elt,
    rest: obj
  }
};

var arrayToList = function( arr ){
  var ret_obj;
  for (i = arr.length - 1; i >= 0; i-- ){
    if(i==arr.length-1)
      ret_obj = prepend( arr[i], null )
    else
      ret_obj = prepend( arr[i], ret_obj )
  }
  return ret_obj;
};

var nth = function( list, n ) {
  if (list === null) return undefined;
  if (n ===0 ) return list.value;
  return ( list.rest, n-1 )
};

var listToArray = function( list ) {
  var ret_arr = [];
  while( list ) {
    ret_arr.push(list.value)
    list = list.rest;
  }
  return ret_arr;
}

console.log(arrayToList([10, 20]));
console.log(listToArray(arrayToList([10, 20, 30])));
