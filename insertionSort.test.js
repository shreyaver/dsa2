const insertionSort = require('./insertionSort');

describe('validateInput()', () => {
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
  it('should return true for empty array', () => {
    expect(insertionSort.validateInput([])).toEqual(true);
  });
  it('should return true for input array with positive integers', () => {
    expect(insertionSort.validateInput([1, 2, 3])).toEqual(true);
  });
});
describe('createCircularArrayObj()', () => {
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
describe('insertionSortToCircularArray()', () => {
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
});
describe('insertAtIndex()', () => {
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
});
