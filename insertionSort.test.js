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
  it('should return true for input array with positive integers', () => {
    expect(insertionSort.validateInput([1, 2, 3])).toEqual(true);
  });
});
