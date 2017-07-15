
/*
  Sequence interface:

  reset()
  next()
  cursor()
*/

var logFive = function( sequence ) {
  sequence.reset();
  for( var i = 0 ; i < 5; i++ ){
    var elt = sequence.next()
    if( elt ) {
      console.log( elt );
    }
  }
};

var ArraySeq = function( arr ){
  this.index = 0;
  this.data = arr;
};

ArraySeq.prototype.cursor = function(){
  return this.index;
};

ArraySeq.prototype.next = function(){
  if( this.index < this.data.length ) {
    this.index++;
    return this.data[this.index-1];
  } else {
    return null;
  }
};

ArraySeq.prototype.reset = function(){
  this.index = 0;
};

logFive(new ArraySeq([1, 2]));

var range = function(start, end){
  ret_arr = [];
  for( i = start; i <= end; i++){
    ret_arr.push(i);
  }
  return  ret_arr;
};

var RangeSeq = function( begin, end ){
  this.index = 0;
  this.data = range(begin, end);
};

RangeSeq.prototype.cursor = function(){
  return this.index;
};

RangeSeq.prototype.next = function(){
  if( this.index < this.data.length ) {
    this.index++;
    return this.data[this.index-1];
  } else {
    return null;
  }
};

RangeSeq.prototype.reset = function(){
  this.index = 0;
};

logFive(new RangeSeq(100, 1000));
