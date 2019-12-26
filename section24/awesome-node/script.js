const fs = require('fs');
// Code challenge => https://adventofcode.com/2015/day/1
// ( === 40  up one
// ) === 41  down one
fs.readFile('./input.txt', (err, data) => {
  console.time('funChallenge');
  if (err) {
    console.log('errrrooorrr');
  } else {
    console.log(
      Array.from(data).reduce((acc, cur) => acc + (cur === 40 ? 1 : -1), 0)
    );
  }
  console.timeEnd('funChallenge');
  console.time('negativeFloor');
  const dataArray = Array.from(data);
  let floor = 0;
  let firstNegative;
  for (let i = 0; i < dataArray.length; i++) {
    floor += dataArray[i] === 40 ? 1 : -1;
    if (firstNegative === undefined && floor === -1) firstNegative = i + 1;
  }
  console.log({ floor });
  console.timeEnd('negativeFloor');
});
