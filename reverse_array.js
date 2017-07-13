
var reverseArray = function(arr){
  ret_arr = [];
  for(i = arr.length - 1; i >= 0; i--){
    ret_arr.push( arr[i] );
  }
  return ret_arr;
};

var reverseArrayInPlace = function(arr) {
  for( var i = 0; i < arr.length / 2; i++ ){
    var temp = arr[i];
    arr[i] = arr[arr.length - i - 1];
    arr[arr.length - i - 1] = temp;
  }
}

console.log(reverseArray(["A", "B", "C"]));
var a = ["A", "B", "C"];
reverseArrayInPlace(a);
console.log(a);


