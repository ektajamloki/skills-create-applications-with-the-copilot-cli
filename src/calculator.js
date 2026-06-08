#!/usr/bin/env node

// Node.js CLI Calculator
// Supported operations:
//  - add       (addition)
//  - subtract  (subtraction)
//  - multiply  (multiplication)
//  - divide    (division)

// Usage examples:
//   node src/calculator.js add 2 3        -> 5
//   node src/calculator.js subtract 5 2   -> 3
//   node src/calculator.js multiply 4 6   -> 24
//   node src/calculator.js divide 10 2    -> 5
//   node src/calculator.js --help

function showHelp() {
  console.log('Usage: calculator <command> <num1> <num2> [...nums]');
  console.log('Commands: add, subtract, multiply, divide');
  console.log('\nExamples:');
  console.log('  calculator add 2 3');
  console.log('  calculator subtract 10 4 1');
  console.log('  calculator multiply 3 4');
  console.log('  calculator divide 20 2 2');
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
