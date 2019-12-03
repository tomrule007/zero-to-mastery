//Question 1: Clean the room function: given an input of [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20], make a function that organizes these into individual array that is ordered. For example answer(ArrayFromAbove) should return: [[1,1,1,1],[2,2,2], 4,5,10,[20,20], 391, 392,591]. Bonus: Make it so it organizes strings differently from number types. i.e. [1, "2", "3", 2] should return [[1,2], ["2", "3"]]

const cleanTheRoom = room => {
  const cleanIt = room => {
    let start;
    return room.reduce((acc, value, index, array) => {
      if (start === undefined) start = { value, index };
      if (value !== start.value) {
        let selected = array.slice(start.index, index);
        acc.push(selected.length === 1 ? selected[0] : selected);
        start = { value, index };
        if (index === array.length - 1) acc.push(value);
      } else if (index === array.length - 1) {
        acc.push(array.slice(start.index, index + 1));
      }
      return acc;
    }, []);
  };
  const stringPart = cleanIt(
    room.filter(value => typeof value === 'string').sort()
  );
  const numberPart = cleanIt(
    room.filter(value => typeof value === 'number').sort((a, b) => a - b)
  );
  const answer = [numberPart, stringPart];
  if (!numberPart.length || !stringPart.length) {
    //One part is missing, flatten answer.
    return answer.flat();
  }
  return answer;
};
console.log(cleanTheRoom([1, '2', '3', 2]));
console.log(
  cleanTheRoom([1, 2, 4, 591, 392, 391, 2, 5, 10, 2, 1, 1, 1, 20, 20])
);
//Question 2: Write a javascript function that takes an array of numbers and a target number. The function should find two different numbers in the array that, when added together, give the target number. For example: answer([1,2,3], 4)should return [1,3]
const addendFinder = (arrayOfPossibleAddends, desiredResultant) => {
  // Returns first found addend Pair; N^2 Time,
  const { length } = arrayOfPossibleAddends;
  for (let i = 0; i < length; i++) {
    const addendOne = arrayOfPossibleAddends[i];
    for (let j = i + 1; j < length; j++) {
      const addendTwo = arrayOfPossibleAddends[j];
      if (addendOne + addendTwo === desiredResultant)
        return [addendOne, addendTwo];
    }
  }
  return undefined;
};
const addendPairs = addendFinder([1, 2, 3], 4);
console.log({ addendPairs });
//Question 3: Write a function that converts HEX to RGB. Then Make that function auto-dect the formats so that if you enter HEX color format it returns RGB and if you enter RGB color format it returns HEX.
//Assuming: input type is string and rgb is either space or comma delimited;
const colorConverter = colorString => {
  // valid hex -> [0 - 9,a,b,c,d,f] * 6 characters
  const validHEXRegEx = /^([0-9abcdef]{2})([0-9abcdef]{2})([0-9abcdef]{2})$/i;

  const foundHEX = colorString.match(validHEXRegEx);
  if (foundHEX) {
    const getRGB = (r, g, b) =>
      [r, g, b]
        .reduce(
          (RGBAcc, color) => [...RGBAcc, parseInt(color, 16).toString(10)],
          []
        )
        .join(',');
    const [_, r, g, b] = foundHEX;
    return getRGB(r, g, b);
  }

  // valid RGB -> 0 - 255 , 0 - 255 , 0 - 255
  const validRGBRegEx = /^(0{1,3}|1[0-9]{0,2}|2[0-4][0-9]|25[0-5])[,\ ](0{1,3}|1[0-9]{0,2}|2[0-4][0-9]|25[0-5])[,\ ](0{1,3}|1[0-9]{0,2}|2[0-4][0-9]|25[0-5])$/i;
  const foundRGB = colorString.match(validRGBRegEx);
  if (foundRGB) {
    const getHex = (r, g, b) =>
      [r, g, b]
        .reduce(
          (hexAcc, color) => [...hexAcc, parseInt(color, 10).toString(16)],
          []
        )
        .join('');
    const [_, r, g, b] = foundRGB;
    return getHex(r, g, b);
  }

  console.log('invalid input');
};
console.log(colorConverter('255,255,255'));
console.log(colorConverter('ffffff'));
