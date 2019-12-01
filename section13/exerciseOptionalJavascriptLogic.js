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

//Question 3: Write a function that converts HEX to RGB. Then Make that function auto-dect the formats so that if you enter HEX color format it returns RGB and if you enter RGB color format it returns HEX.
