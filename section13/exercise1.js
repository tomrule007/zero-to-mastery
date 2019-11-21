// For all of these, what is the value of a when the function gets called with the alert()
// #1
function q1() {
  var a = 5;
  if (a > 1) {
    a = 3;
  }
  alert(`1: ${a === 3}`);
}
q1();

//#2
var a = 0;
function q2() {
  a = 5;
}

function q22() {
  alert(`2: ${a === 0}`);
}
q22();

//#3
function q3() {
  window.a = 'hello';
}

function q32() {
  alert(`3: ${a === 0}`);
}
q32();
//#4
var a = 1;
function q4() {
  var a = 'test';
  alert(`4: ${a === 'test'}`);
}
q4();
//#5
var a = 2;
if (true) {
  var a = 5;
  alert(`5: ${a === 5}`);
}
alert(`6: ${a === 5}`);
