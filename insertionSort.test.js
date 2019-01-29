const insertionSort = require('./insertionSort');

describe('validateInput(arrToSort)', () => {
  it('should return false for input array with negative number', () => {
    expect(insertionSort.validateInput([1, -1, 2])).toEqual(false);
  });
  it('should return false for input array with zero', () => {
    expect(insertionSort.validateInput([1, 2, 0])).toEqual(false);
  });
  it('should return false for input array with decimal', () => {
    expect(insertionSort.validateInput([1, 1.1, 2])).toEqual(false);
  });
  it('should return false for non-array input', () => {
    expect(insertionSort.validateInput(1)).toEqual(false);
  });
  it('should return false for array with duplicates', () => {
    expect(insertionSort.validateInput([1, 2, 3, 1, 4])).toEqual(false);
  });
  it('should return false for empty array', () => {
    expect(insertionSort.validateInput([])).toEqual(false);
  });
  it('should return true for input array with positive integers', () => {
    expect(insertionSort.validateInput([2, 3, 1])).toEqual(true);
  });
});
describe('createCircularArrayObj(arrToSort)', () => {
  it('should return object for empty array', () => {
    expect(insertionSort.createCircularArrayObj([])).toEqual({ h: 0, t: 0, Y: [] });
  });
  it('should return object for array with one positive integer', () => {
    expect(insertionSort.createCircularArrayObj([2])).toEqual({ h: 0, t: 0, Y: [2] });
  });
  it('should return object for array with positive integers', () => {
    expect(insertionSort.createCircularArrayObj([1, 2, 3])).toEqual({ h: 0, t: 0, Y: [1, -1, -1] });
  });
});
describe('insertionSortToCircularArray(arrToSort, circularArrayObj)', () => {
  it('should sort array with elements smaller than the ones already sorted', () => {
    const circularArrayObj = { h: 0, t: 0, Y: [10, -1, -1, -1, -1, -1, -1, -1, -1, -1] };
    insertionSort.insertionSortToCircularArr([10, 9, 8, 7, 6, 5, 4, 3, 2, 1], circularArrayObj);
    expect(circularArrayObj).toEqual({ h: 1, t: 0, Y: [10, 1, 2, 3, 4, 5, 6, 7, 8, 9] });
  });
  it('should sort array with elements greater than the ones already sorted', () => {
    const circularArrayObj = { h: 0, t: 0, Y: [1, -1, -1, -1, -1, -1, -1, -1, -1, -1] };
    insertionSort.insertionSortToCircularArr([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], circularArrayObj);
    expect(circularArrayObj).toEqual({ h: 0, t: 9, Y: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] });
  });
  it('should sort array with elements in random order', () => {
    const circularArrayObj = { h: 0, t: 0, Y: [25, -1, -1, -1, -1, -1, -1, -1] };
    insertionSort.insertionSortToCircularArr([25, 57, 37, 48, 12, 92, 86, 33], circularArrayObj);
    expect(circularArrayObj).toEqual({ h: 6, t: 5, Y: [33, 37, 48, 57, 86, 92, 12, 25] });
  });
});
describe('findInsertAtIndex(elementToInsert, circArrToInsertIn, indexOfSmallestElement, circArraySize)', () => {
  it('should return index to insert element right before largest number', () => {
    expect(insertionSort.findInsertAtIndex(3, [1, 2, 4, -1], 0, 4)).toEqual(2);
  });
  it('should return index to insert element right after smallest number', () => {
    expect(insertionSort.findInsertAtIndex(2, [1, 3, 4, -1], 0, 4)).toEqual(1);
  });
  it('should return index to insert element in the middle', () => {
    expect(insertionSort.findInsertAtIndex(3, [1, 2, 4, 5, -1], 0, 5)).toEqual(2);
  });
  it('should return index to insert element in the middle when smallest element is after largest element', () => {
    expect(insertionSort.findInsertAtIndex(3, [2, 4, 5, -1, 1], 0, 5)).toEqual(1);
  });
  it('should return index to insert element in the middle when index is after largest element', () => {
    expect(insertionSort.findInsertAtIndex(3, [5, -1, 1, 2, 4], 0, 5)).toEqual(4);
  });
  it('should return index to insert element at index 0', () => {
    expect(insertionSort.findInsertAtIndex(3, [5, 6, -1, 1, 2, 3], 3, 1)).toEqual(0);
  });
});
describe('sliceCircularArray(arrayToSlice, lower, upper, smallOrLarge)', () => {
  it('should return smaller slice to insert element at index 0', () => {
    expect(insertionSort.sliceCircularArray([5, 6, -1, 1, 2, 3], 3, 0, 'small')).toEqual([1, 2, 3]);
  });
  it('should return larger slice to insert element at index 0', () => {
    expect(insertionSort.sliceCircularArray([5, 6, -1, 1, 2, 3], 0, 1, 'large')).toEqual([5, 6]);
  });
  it('should return smaller slice to insert element right before largest number', () => {
    expect(insertionSort.sliceCircularArray([1, 2, 4, -1], 0, 2, 'small')).toEqual([1, 2]);
  });
  it('should return larger slice to insert element right before largest number', () => {
    expect(insertionSort.sliceCircularArray([1, 2, 4, -1], 2, 2, 'large')).toEqual([4]);
  });
  it('should return smaller slice to insert element right after smallest number', () => {
    expect(insertionSort.sliceCircularArray([1, 3, 4, -1], 0, 1, 'small')).toEqual([1]);
  });
  it('should return larger slice to insert element right after smallest number', () => {
    expect(insertionSort.sliceCircularArray([1, 3, 4, -1], 1, 2, 'large')).toEqual([3, 4]);
  });
  it('should return smaller slice to insert element in the middle', () => {
    expect(insertionSort.sliceCircularArray([1, 2, 4, 5, -1], 0, 2, 'small')).toEqual([1, 2]);
  });
  it('should return larger slice to insert element in the middle', () => {
    expect(insertionSort.sliceCircularArray([1, 2, 4, 5, -1], 2, 3, 'large')).toEqual([4, 5]);
  });
  it('should return smaller slice to insert element in the middle when smallest element is after largest element', () => {
    expect(insertionSort.sliceCircularArray([2, 4, 5, -1, 1], 0, 1, 'small')).toEqual([2]);
  });
  it('should return larger slice to insert element in the middle when smallest element is after largest element', () => {
    expect(insertionSort.sliceCircularArray([2, 4, 5, -1, 1], 1, 2, 'large')).toEqual([4, 5]);
  });
  it('should return smaller slice to insert element in the middle when index is after largest element', () => {
    expect(insertionSort.sliceCircularArray([5, -1, 1, 2, 4], 2, 4, 'small')).toEqual([1, 2]);
  });
  it('should return larger slice to insert element in the middle when index is after largest element', () => {
    expect(insertionSort.sliceCircularArray([5, -1, 1, 2, 4], 4, 0, 'large')).toEqual([4, 5]);
  });
  it('should return smaller slice to insert element in the middle when index is before smallest element', () => {
    expect(insertionSort.sliceCircularArray([3, 5, -1, 1, 2], 3, 1, 'small')).toEqual([1, 2, 3]);
  });
  it('should return larger slice to insert element in the middle when index is before smallest element', () => {
    expect(insertionSort.sliceCircularArray([3, 5, -1, 1, 2], 1, 1, 'large')).toEqual([5]);
  });
});

describe('shift(circularArrayObj, element, insertAtIndex, leftOrRight)', () => {
  it('should shift elements to left and insert element at index 0', () => {
    const circularArrayObj = { h: 0, t: 2, Y: [3, 5, 6, -1] };
    insertionSort.shift(circularArrayObj, 4, 0, 'left');
    expect(circularArrayObj).toEqual({ h: 3, t: 2, Y: [4, 5, 6, 3] });
  });
  it('should shift elements to left and insert element elements wrap around', () => {
    const circularArrayObj = { h: 5, t: 3, Y: [4, 6, 8, 9, -1, 2, 3] };
    insertionSort.shift(circularArrayObj, 7, 1, 'left');
    expect(circularArrayObj).toEqual({ h: 4, t: 3, Y: [6, 7, 8, 9, 2, 3, 4] });
  });
  it('should shift elements to right and insert element at index 0', () => {
    const circularArrayObj = { h: 3, t: 1, Y: [5, 6, -1, 1, 2, 3] };
    insertionSort.shift(circularArrayObj, 4, 0, 'right');
    expect(circularArrayObj).toEqual({ h: 3, t: 2, Y: [4, 5, 6, 1, 2, 3] });
  });
  it('should shift elements to right and insert element when index is in middle', () => {
    const circularArrayObj = { h: 0, t: 2, Y: [1, 2, 4, -1] };
    insertionSort.shift(circularArrayObj, 3, 2, 'right');
    expect(circularArrayObj).toEqual({ h: 0, t: 3, Y: [1, 2, 3, 4] });
  });
  it('should shift elements to right and insert element when elements wrap around', () => {
    const circularArrayObj = { h: 2, t: 0, Y: [5, -1, 1, 2, 4] };
    insertionSort.shift(circularArrayObj, 3, 4, 'right');
    expect(circularArrayObj).toEqual({ h: 2, t: 1, Y: [4, 5, 1, 2, 3] });
  });
});
describe('main()', () => {
  it('should return steps of insertion sort to circular array', () => {
    process.argv = ['node', 'insertionSort.js', 8, 25, 57, 37, 48, 12, 92, 86, 33];
    expect(insertionSort.main()).toEqual([[25, -1, -1, -1, -1, -1, -1, -1],
      [25, 57, -1, -1, -1, -1, -1, -1],
      [25, 37, 57, -1, -1, -1, -1, -1],
      [25, 37, 48, 57, -1, -1, -1, -1],
      [25, 37, 48, 57, -1, -1, -1, 12],
      [25, 37, 48, 57, 92, -1, -1, 12],
      [25, 37, 48, 57, 86, 92, -1, 12],
      [33, 37, 48, 57, 86, 92, 12, 25]]);
  });
  it('should return steps of insertion sort of ascending array to circular array', () => {
    process.argv = ['node', 'insertionSort.js', 8, 1, 2, 3, 4, 5, 6, 7, 8];
    expect(insertionSort.main()).toEqual([[1, -1, -1, -1, -1, -1, -1, -1],
      [1, 2, -1, -1, -1, -1, -1, -1],
      [1, 2, 3, -1, -1, -1, -1, -1],
      [1, 2, 3, 4, -1, -1, -1, -1],
      [1, 2, 3, 4, 5, -1, -1, -1],
      [1, 2, 3, 4, 5, 6, -1, -1],
      [1, 2, 3, 4, 5, 6, 7, -1],
      [1, 2, 3, 4, 5, 6, 7, 8]]);
  });
  it('should return steps of insertion sort of descending array to circular array', () => {
    process.argv = ['node', 'insertionSort.js', 8, 8, 7, 6, 5, 4, 3, 2, 1];
    expect(insertionSort.main()).toEqual([[8, -1, -1, -1, -1, -1, -1, -1],
      [8, -1, -1, -1, -1, -1, -1, 7],
      [8, -1, -1, -1, -1, -1, 6, 7],
      [8, -1, -1, -1, -1, 5, 6, 7],
      [8, -1, -1, -1, 4, 5, 6, 7],
      [8, -1, -1, 3, 4, 5, 6, 7],
      [8, -1, 2, 3, 4, 5, 6, 7],
      [8, 1, 2, 3, 4, 5, 6, 7]]);
  });
  it('should return steps of insertion sort to circular array with left shift over array end', () => {
    process.argv = ['node', 'insertionSort.js', 5, 3, 7, 6, 5, 4];
    expect(insertionSort.main()).toEqual([[3, -1, -1, -1, -1],
      [3, 7, -1, -1, -1],
      [3, 6, 7, -1, -1],
      [5, 6, 7, -1, 3],
      [5, 6, 7, 3, 4]]);
  });
  it('should return "Invalid input" for empty array', () => {
    process.argv = ['node', 'insertionSort.js', 0];
    expect(insertionSort.main()).toEqual('Invalid input');
  });
  it('should return "Invalid input" for incorrect size', () => {
    process.argv = ['node', 'insertionSort.js', 2, 1];
    expect(insertionSort.main()).toEqual('Invalid input');
  });
  it('should return steps of insertion sort of single element array to circular array', () => {
    process.argv = ['node', 'insertionSort.js', 1, 8];
    expect(insertionSort.main()).toEqual([[8]]);
  });
  it('should return steps of insertion sort to circular array with left shift over array end', () => {
    process.argv = ['node', 'insertionSort.js', 8, 8, 1, 7, 2, 6, 3, 5, 4];
    expect(insertionSort.main()).toEqual([[8, -1, -1, -1, -1, -1, -1, -1],
      [8, -1, -1, -1, -1, -1, -1, 1],
      [7, 8, -1, -1, -1, -1, -1, 1],
      [7, 8, -1, -1, -1, -1, 1, 2],
      [6, 7, 8, -1, -1, -1, 1, 2],
      [6, 7, 8, -1, -1, 1, 2, 3],
      [5, 6, 7, 8, -1, 1, 2, 3],
      [5, 6, 7, 8, 1, 2, 3, 4]]);
  });
  it('should return steps of insertion sort to circular array with left shift over array end', () => {
    process.argv = ['node', 'insertionSort.js', 10, 25, 57, 37, 48, 26, 3, 12, 92, 86, 33];
    expect(insertionSort.main()).toEqual([[25, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [25, 57, -1, -1, -1, -1, -1, -1, -1, -1],
      [25, 37, 57, -1, -1, -1, -1, -1, -1, -1],
      [25, 37, 48, 57, -1, -1, -1, -1, -1, -1],
      [26, 37, 48, 57, -1, -1, -1, -1, -1, 25],
      [26, 37, 48, 57, -1, -1, -1, -1, 3, 25],
      [26, 37, 48, 57, -1, -1, -1, 3, 12, 25],
      [26, 37, 48, 57, 92, -1, -1, 3, 12, 25],
      [26, 37, 48, 57, 86, 92, -1, 3, 12, 25],
      [33, 37, 48, 57, 86, 92, 3, 12, 25, 26]]);
  });
});
