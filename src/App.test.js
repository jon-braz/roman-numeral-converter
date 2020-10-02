import RomanNumerals from './services/RomanNumerals';

const testVals = [
  { integer: 4, roman: 'IV' },
  { integer: 384, roman: 'CCCLXXXIV' },
  { integer: 1000, roman: 'M' },
  { integer: 999, roman: 'CMXCIX' },
  { integer: 3822, roman: 'MMMDCCCXXII' }
];

const incorrectIntegers = [0, 4000, -5, 9999, 'test', 'MM'];

const incorrectRoman = [0, 'MMMM', 'MIM', 'Not a roman integer'];

test('converts numbers between 1 and 3999 from arabic to roman correctly', () => {
  testVals.forEach((val) =>
    expect(RomanNumerals.toRoman(val.integer)).toBe(val.roman)
  );
});

test('converts numbers between 1 and 3999 from roman to arabic correctly', () => {
  testVals.forEach((val) =>
    expect(RomanNumerals.fromRoman(val.roman)).toBe(val.integer)
  );
});

test('throws errors for bad integer inputs', () => {
  incorrectIntegers.forEach((val) =>
    expect(() => RomanNumerals.toRoman(val)).toThrow()
  );
});

test('throws error for bad roman inputs', () => {
  incorrectRoman.forEach((val) =>
    expect(() => RomanNumerals.fromRoman(val)).toThrow()
  );
});
