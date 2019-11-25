// Solve the below problems:

// #1) Check if this array includes the name "John".
const dragons = ['Tim', 'Johnathan', 'Sandy', 'Sarah'];
dragons.includes('John');

// #2) Check if this array includes any name that has "John" inside of it. If it does, return that
// name or names in an array.
const dragons = ['Tim', 'Johnathan', 'Sandy', 'Sarah'];

// LOL read the problem wrong though it wanted the name or (if no match) the full list.
// Leaving my answer but they wanted us to use the filter method.
dragons.reduce((matchOrList, currentName) => {
  // skip rest of names when match found;
  if (matchOrList.includes('Jon')) return matchOrList;

  // Return name if found
  if (currentName.includes('Jon')) return currentName;
  // no match return list
  return [...matchOrList, currentName];
}, []);

// #3) Create a function that calculates the power of 100 of a number entered as a parameter
const oneHundredthsPower = x => x ** 100;
// #4) Useing your function from #3, put in the paramter 10000. What is the result?
// Research for yourself why you get this result

const bigNumber = oneHundredthsPower(10000);
// Result is over javascripts max value and returns infinity.
// Javascript uses  64-bit signed float for all numbers  which cant store a number that large.
