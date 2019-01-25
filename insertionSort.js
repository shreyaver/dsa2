// Only returns true when input is array of positive integers
const validateInput = (arrToSort) => {
  try {
    if (arrToSort.constructor === Array) {
      if (arrToSort.every(val => Number.isInteger(val) && val > 0)) {
        return true;
      }
    }
    return false;
  } catch (errorObj) {
    console.log(errorObj.message);
    return false;
  }
};
const createCircularArrayObj = (arrToSort) => {
  const circularArrayObj = {
    h: 0,
    t: 0,
    Y: arrToSort.map((val, index) => {
      if (index === 0) {
        return val;
      }
      return -1;
    }),
  };
  return circularArrayObj;
};
const insertionSortToCircularArr = (arrToSort, circularArrayObj) => {
  const N = circularArrayObj.Y.length;
  arrToSort.slice(1).forEach((element) => {
    if (element < circularArrayObj.Y[circularArrayObj.h]) {
      circularArrayObj.h = circularArrayObj.h === 0 ? N - 1 : circularArrayObj.h - 1;
      circularArrayObj.Y[circularArrayObj.h] = element;
    } else if (element > circularArrayObj.Y[circularArrayObj.t]) {
      circularArrayObj.t = (circularArrayObj.t + 1) % N;
      circularArrayObj.Y[circularArrayObj.t] = element;
    }
  });
};
// eslint-disable-next-line max-len
const findInsertAtIndex = (elementToInsert, circArrToInsertIn, indexOfSmallestElement, circArraySize) => {
  let insertAtIndex = (indexOfSmallestElement + 1) % circArraySize;
  while (elementToInsert > circArrToInsertIn[insertAtIndex]) {
    insertAtIndex = (insertAtIndex + 1) % circArraySize;
  }
  return insertAtIndex;
};
const sliceCircularArray = (arrayToSlice, lower, upper, smallOrLarge) => {
  if (lower > upper && smallOrLarge === 'large') {
    return arrayToSlice.slice(lower).concat(arrayToSlice.slice(0, upper + 1));
  }
  if (lower > upper && smallOrLarge === 'small') {
    return arrayToSlice.slice(lower).concat(arrayToSlice.slice(0, upper));
  }
  if (lower === upper) {
    return [arrayToSlice[lower]];
  }
  if (upper === lower + 1 && smallOrLarge === 'large') {
    return arrayToSlice.slice(lower, upper + 1);
  }
  return arrayToSlice.slice(lower, upper);
};
module.exports = { validateInput, createCircularArrayObj, insertionSortToCircularArr, findInsertAtIndex, sliceCircularArray };
