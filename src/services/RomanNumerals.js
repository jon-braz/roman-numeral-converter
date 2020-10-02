// Roman numerals only standardized between 1 and 3999
const MININTEGER = 1,
  MAXDECIMAL = 3999;

// Map from roman numerals to arabic integers
// Contains 4, 9, 14, etc. to keep conversion code simpler
const characterMap = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1
};

/**
 * Convert an arabic integer to roman numerals
 * Works for numbers from 1 to 3999
 *
 * @param {number|string} decimalInput - Number to convert to roman
 * @return {string} - Input converted to roman numerals
 */
const toRoman = (decimalInput) => {
  const decimalString = decimalInput.toString();

  // Quickly handle empty input
  if (!decimalString.length) {
    return '';
  }

  let decimal = parseInt(decimalString), // Copy of input
    roman = ''; // String to be built

  // Check that input is a number by comparing the result of parsing as
  // an integer to the input value
  if (decimal.toString() !== decimalString.toString()) {
    throw new Error('This is not a number');
  }

  // Check that number falls within the range of standard roman numerals
  if (decimal < MININTEGER || decimal > MAXDECIMAL) {
    throw new Error('We can only calculate numbers between 1 and 3999');
  }

  // Do the conversion
  for (let i in characterMap) {
    while (decimal >= characterMap[i]) {
      roman += i;
      decimal -= characterMap[i];
    }
  }

  return roman;
};

/**
 * Convert a string of roman numerals to arabic integers
 *
 * @param {string} romanInput - Roman numeral string to convert
 * @return {number} - Input converted to arabic integers
 */
const fromRoman = (romanInput) => {
  // Input as uppercase
  const roman = romanInput.toString().toUpperCase();

  // Catch non-string inputs or inputs containing
  // invalid characters
  if (typeof romanInput !== 'string' || roman.search(/[^IVXLCDM]/) !== -1) {
    throw new Error('This is not a valid Roman Numeral');
  }

  const romanArray = roman.split('');

  // Reduce the roman numerals to a single arabic integer
  const decimal = romanArray.reduce((total, char, i) => {
    const charVal = characterMap[char],
      nextCharVal = characterMap[romanArray[i + 1]];

    return charVal < nextCharVal ? total - charVal : total + charVal;
  }, 0);

  // Catch incorrectly ordered roman characters
  // eg. XXXX, MIM, etc.
  const verification = toRoman(decimal);
  if (roman !== verification) {
    throw new Error('This is not a valid Roman Numeral');
  }

  return decimal;
};

export default { toRoman, fromRoman, min: MININTEGER, max: MAXDECIMAL };
