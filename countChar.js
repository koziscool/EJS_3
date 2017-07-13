
var countChar = function( s, c ) {
  var count = 0
  for (i=0; i<s.length;i++){
    if( s[i] === c) count++
  }
  return count;
};

var countBs = function(s) {
  return countChar(s, "B");
};

console.log(countChar("kakkerlak", "k"));
