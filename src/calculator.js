#!/usr/bin/env node

// Node.js CLI Calculator
// Supported operations:
//  - add         (addition)
//  - subtract    (subtraction)
//  - multiply    (multiplication)
//  - divide      (division)
//  - modulo      (remainder)
//  - power       (exponentiation)
//  - squareRoot  (square root)

// Usage examples:
//   node src/calculator.js add 2 3           -> 5
//   node src/calculator.js subtract 5 2      -> 3
//   node src/calculator.js multiply 4 6      -> 24
//   node src/calculator.js divide 10 2       -> 5
//   node src/calculator.js modulo 10 3       -> 1
//   node src/calculator.js power 2 8         -> 256
//   node src/calculator.js sqrt 9            -> 3
//   node src/calculator.js --help

function showHelp() {
  console.log('Usage: calculator <command> <num1> <num2> [...nums]');
  console.log('Commands: add, subtract, multiply, divide, modulo, power, sqrt');
  console.log('\nExamples:');
  console.log('  calculator add 2 3');
  console.log('  calculator subtract 10 4 1');
  console.log('  calculator multiply 3 4');
  console.log('  calculator divide 20 2 2');
  console.log('  calculator modulo 10 3');
  console.log('  calculator power 2 8');
  console.log('  calculator sqrt 9');
}

const argv = process.argv.slice(2);
if (argv.length === 0 || argv.includes('--help') || argv.includes('-h')) {
  showHelp();
  process.exit(0);
}

const command = argv[0];
const rawOperands = argv.slice(1);

if (rawOperands.length === 0) {
  console.error('Error: At least one numeric operand is required.');
  showHelp();
  process.exit(1);
}

const operands = rawOperands.map(s => {
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
});

if (operands.some(Number.isNaN)) {
  console.error('Error: All operands must be valid numbers.');
  process.exit(1);
}

const lib = require('./calculator-lib');

let result;

switch (command.toLowerCase()) {
  case 'add':
    // addition: sum all operands
    result = lib.add(operands);
    break;
  case 'subtract':
    // subtraction: left-to-right (a - b - c ...)
    result = lib.subtract(operands);
    break;
  case 'multiply':
    // multiplication: product of all operands
    result = lib.multiply(operands);
    break;
  case 'divide':
    // division: left-to-right (a / b / c ...). Check for division by zero.
    try {
      result = lib.divide(operands);
    } catch (err) {
      if (err.message === 'division-by-zero') {
        console.error('Error: Division by zero is not allowed.');
        process.exit(2);
      }
      throw err;
    }
    break;
  case 'modulo':
  case 'mod':
    // modulo: a % b (requires two operands)
    if (operands.length < 2) {
      console.error('Error: Modulo operation requires two operands.');
      process.exit(1);
    }
    try {
      result = lib.modulo(operands[0], operands[1]);
    } catch (err) {
      if (err.message === 'division-by-zero') {
        console.error('Error: Modulo by zero is not allowed.');
        process.exit(2);
      }
      throw err;
    }
    break;
  case 'power':
  case 'pow':
    // exponentiation: base ^ exponent
    if (operands.length < 2) {
      console.error('Error: Power operation requires base and exponent.');
      process.exit(1);
    }
    result = lib.power(operands[0], operands[1]);
    break;
  case 'sqrt':
  case 'squareroot':
  case 'squareRoot':
    // square root: sqrt(n)
    if (operands.length < 1) {
      console.error('Error: Square root requires one operand.');
      process.exit(1);
    }
    try {
      result = lib.squareRoot(operands[0]);
    } catch (err) {
      if (err.message === 'negative-number') {
        console.error('Error: Cannot compute square root of negative number.');
        process.exit(3);
      }
      throw err;
    }
    break;
  default:
    console.error(`Error: Unknown command '${command}'.`);
    showHelp();
    process.exit(1);
}

// Print numeric result; preserve integer format when possible
if (Number.isInteger(result)) {
  console.log(result);
} else {
  // Print up to 12 significant digits to avoid long floats
  console.log(Number(result.toPrecision(12)));
}

process.exit(0);
