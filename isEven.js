
var isEven  = function(n) {
  if (n===1) return false;
  if (n===0) return true;
  if ( n<0 ) return isEven(-n)

  return isEven(n-2);
};

console.log( isEven(3) );
console.log(isEven(0));
console.log(isEven(1));
console.log(isEven(66));
console.log(isEven(9981));

