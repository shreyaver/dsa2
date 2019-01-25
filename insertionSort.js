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
module.exports = { validateInput, createCircularArrayObj };
