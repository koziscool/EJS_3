
var range = function(start, end){
  ret_arr = [];
  for( i = start; i <= end; i++){
    ret_arr.push(i);
  }
  return  ret_arr;
};

var sum = function( arr ){
  total = 0;
  for( elt in arr ){
    total += arr[elt];
  }
  return total;
}

console.log(sum(range(1, 10)));

