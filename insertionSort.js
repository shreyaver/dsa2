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
module.exports = { validateInput };
