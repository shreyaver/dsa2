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
