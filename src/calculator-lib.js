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

module.exports = { add, subtract, multiply, divide };