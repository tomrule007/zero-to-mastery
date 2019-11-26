// Solve the below problems:

// #1) Line up the Turtle and the Rabbit at the start line:
const startLine = '     ||<- Start line';
let turtle = '🐢'.padStart(8);
let rabbit = '🐇'.padStart(8);
// it should look like this:
('     ||<- Start line');
('       🐢');
('       🐇');

// when you do:
console.log(startLine);
console.log(turtle);
console.log(rabbit);

// #2) What happens when you run turtle.trim().padEnd(9, '=') on the turtle variable
// Read about what the second parameter does in padEnd and padStart
turtle = turtle.trim().padEnd(9, '=');
// parameters  (targetLength [, padString])
// padString will be used to fill the blank spaces (default is space char)

// #3) Get the below object to go from:
let obj = {
  my: 'name',
  is: 'Rudolf',
  the: 'raindeer'
};
// to this:
('my name is Rudolf the raindeer');
const phrase = Object.entries(obj)
  .reduce(
    (phrase, keyValuePair) =>
      (phrase += `${keyValuePair[0]} ${keyValuePair[1]} `),
    ''
  )
  .trim();
console.log(phrase);

// My solution is terrible compared to the provided solution!
// map + join is a much prettier solution, that doesn't pollute the memory
// with a bunch of partial strings like my method.

const join = char => xs => xs.join(char);
const joinSpace = join(' ');
const fastPhrase = Object.entries(obj)
  .map(joinSpace)
  .join(' ');
console.log(fastPhrase);
