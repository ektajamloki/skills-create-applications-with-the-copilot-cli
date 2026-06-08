// Calculator library with exported functions used by the CLI and tests
// Supported operations:
//  - add       (addition)
//  - subtract  (subtraction)
//  - multiply  (multiplication)
//  - divide    (division)

function add(operands) {
  return operands.reduce((a, b) => a + b, 0);
}

function subtract(operands) {
  if (operands.length === 0) return 0;
  return operands.slice(1).reduce((a, b) => a - b, operands[0]);
}

function multiply(operands) {
  return operands.reduce((a, b) => a * b, 1);
}

function divide(operands) {
  if (operands.length === 0) throw new Error('no-operands');
  // check for division by zero in any divisor
  const divisors = operands.slice(1);
  if (divisors.some(d => d === 0)) {
    throw new Error('division-by-zero');
  }
  return divisors.reduce((a, b) => a / b, operands[0]);
}

// Returns remainder of a divided by b. Throws on divide/modulo by zero.
function modulo(a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) throw new Error('invalid-operand');
  if (b === 0) throw new Error('division-by-zero');
  return a % b;
}

// Returns base raised to exponent using Math.pow
function power(base, exponent) {
  if (!Number.isFinite(base) || !Number.isFinite(exponent)) throw new Error('invalid-operand');
  return Math.pow(base, exponent);
}

// Returns square root of n. Throws on negative input.
function squareRoot(n) {
  if (!Number.isFinite(n)) throw new Error('invalid-operand');
  if (n < 0) throw new Error('negative-number');
  return Math.sqrt(n);
}

module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot };