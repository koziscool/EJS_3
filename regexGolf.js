
var verify = function(regexp, yes, no) {
  // Ignore unfinished exercises
  if (regexp.source == "...") return;
  yes.forEach(function(s) {
    if (!regexp.test(s))
      console.log("Failure to match '" + s + "'");
    else
      console.log(regexp, s, "match", "ok");
  });
  no.forEach(function(s) {
    if (regexp.test(s))
      console.log("Unexpected match for '" + s + "'");
    else 
      console.log(regexp, s, "miss", "ok");
  });
}

var r1 = /ca(r|t)/
verify( r1,
       ["my car", "bad cats"],
       ["camper", "high art"]);
console.log("\n");

var r2= /pr?op/
verify( r2,
       ["pop culture", "mad props"],
       ["plop"]);
console.log("\n");

var r3 = /ferr(et|y|ari)/
verify( r3,
       ["ferret", "ferry", "ferrari"],
       ["ferrum", "transfer A"]);
console.log("\n");

var r4 = / *ious\b/
verify( r4,
       ["how delicious", "spacious room"],
       ["ruinous", "consciousness"]);
console.log("\n");

var r5 = /\s[.,:;]/
verify( r5,
       ["bad punctuation ."],
       ["escape the dot"]);
console.log("\n");

var r6 = /\b[a-zA-Z]{7,}\b/
verify( r6,
       ["hottentottententen"],
       ["no", "hotten totten tenten"]);
console.log("\n");

var r7 = /\b[a-df-zA-Z]+\b/
verify( r7,
       ["red platypus", "wobbling nest"],
       ["earth bed", "learning ape"]);
