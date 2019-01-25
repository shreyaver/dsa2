// Only returns true when input is array of distinct positive integers
const validateInput = (arrToSort) => {
  try {
    if (arrToSort.constructor === Array) {
      if (arrToSort.length > 0) {
        if (arrToSort.every(val => Number.isInteger(val) && val > 0)) {
          const arrTemp = arrToSort.slice();
          arrTemp.sort();
          if (arrTemp.every((val, i) => {
            if (i < arrTemp.length - 1) {
              return arrTemp.indexOf(val, i + 1) === -1;
            }
            return true;
          })) {
            return true;
          }
        }
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
  const resultArr = [circularArrayObj.Y.slice()];
  arrToSort.slice(1).forEach((element) => {
    if (element < circularArrayObj.Y[circularArrayObj.h]) {
      circularArrayObj.h = circularArrayObj.h === 0 ? N - 1 : circularArrayObj.h - 1;
      circularArrayObj.Y[circularArrayObj.h] = element;
    } else if (element > circularArrayObj.Y[circularArrayObj.t]) {
      circularArrayObj.t = (circularArrayObj.t + 1) % N;
      circularArrayObj.Y[circularArrayObj.t] = element;
    } else {
      let insertAtIndex = findInsertAtIndex(element, circularArrayObj.Y, circularArrayObj.h, circularArrayObj.Y.length);
      const S = sliceCircularArray(circularArrayObj.Y, circularArrayObj.h, insertAtIndex, 'small');
      const L = sliceCircularArray(circularArrayObj.Y, insertAtIndex, circularArrayObj.t, 'large');
      if (S.length < L.length) {
        shift(circularArrayObj, element, insertAtIndex === 0 ? N - 1 : insertAtIndex - 1, 'left');
      } else {
        shift(circularArrayObj, element, insertAtIndex, 'right');
      }
    }
    resultArr.push(circularArrayObj.Y.slice());
  });
  return resultArr;
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
const shift = (circularArrayObj, element, insertAtIndex, leftOrRight) => {
  const N = circularArrayObj.Y.length;
  if (leftOrRight === 'left') {
    let start =  circularArrayObj.h === 0 ? N - 1 : circularArrayObj.h - 1;
    while (start !== insertAtIndex) {
      circularArrayObj.Y[start] = circularArrayObj.Y[(start + 1) % N];
      start = (start + 1) % N;
    }
    circularArrayObj.Y[start] = element;
    circularArrayObj.h = circularArrayObj.h === 0 ? N - 1 : circularArrayObj.h - 1;
  } else {
    let start = (circularArrayObj.t + 1) % N;
    while (start !== insertAtIndex) {
      circularArrayObj.Y[start] = circularArrayObj.Y[start === 0 ? N - 1 : start - 1];
      start = start === 0 ? N - 1 : start - 1;
    }
    circularArrayObj.Y[start] = element;
    circularArrayObj.t = (circularArrayObj.t + 1) % N;
  }
};
const main = () => {
  const inputArr = process.argv.slice(3);
  if (validateInput(inputArr) === true && inputArr.length === process.argv[2]) {
    const circularArrayObj = createCircularArrayObj(inputArr);
    const resultArr = insertionSortToCircularArr(inputArr, circularArrayObj);
    resultArr.forEach((arr) => {
      console.log(arr.join(' '));
    });
    return resultArr;
  }
  console.log('Invalid input');
  return 'Invalid input';
};
module.exports = { validateInput, createCircularArrayObj, insertionSortToCircularArr, findInsertAtIndex, sliceCircularArray, shift, main };
