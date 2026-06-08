const calc = require('../calculator-lib');

describe('Calculator library - basic operations', () => {
  test('addition: 2 + 3 = 5', () => {
    expect(calc.add([2, 3])).toBe(5);
  });

  test('addition: multiple operands', () => {
    expect(calc.add([1, 2, 3, 4])).toBe(10);
  });

  test('subtraction: 10 - 4 = 6', () => {
    expect(calc.subtract([10, 4])).toBe(6);
  });

  test('subtraction: left-to-right reduction 10 - 4 - 1 = 5', () => {
    expect(calc.subtract([10, 4, 1])).toBe(5);
  });

  test('multiplication: 45 * 2 = 90', () => {
    expect(calc.multiply([45, 2])).toBe(90);
  });

  test('multiplication: product with zero', () => {
    expect(calc.multiply([7, 0, 5])).toBe(0);
  });

  test('division: 20 / 5 = 4', () => {
    expect(calc.divide([20, 5])).toBe(4);
  });

  test('division: left-to-right 100 / 5 / 2 = 10', () => {
    expect(calc.divide([100, 5, 2])).toBe(10);
  });

  test('division by zero throws', () => {
    expect(() => calc.divide([10, 0])).toThrow('division-by-zero');
  });

  test('floating point operations', () => {
    const res = calc.add([0.1, 0.2]);
    // allow floating point rounding tolerance
    expect(Math.abs(res - 0.30000000000000004)).toBeLessThan(1e-12);
  });

  test('no operands behavior', () => {
    expect(calc.add([])).toBe(0);
    expect(calc.multiply([])).toBe(1);
    expect(() => calc.divide([])).toThrow();
  });

  // Extended operations tests
  test('modulo: 5 % 2 = 1', () => {
    expect(calc.modulo(5, 2)).toBe(1);
  });

  test('modulo by zero throws', () => {
    expect(() => calc.modulo(10, 0)).toThrow('division-by-zero');
  });

  test('power: 2 ^ 3 = 8', () => {
    expect(calc.power(2, 3)).toBe(8);
  });

  test('power: non-integer exponent', () => {
    expect(calc.power(9, 0.5)).toBeCloseTo(3);
  });

  test('squareRoot: sqrt(16) = 4', () => {
    expect(calc.squareRoot(16)).toBe(4);
  });

  test('squareRoot negative throws', () => {
    expect(() => calc.squareRoot(-1)).toThrow('negative-number');
  });
});
