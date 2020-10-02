// Roman Numeral <-> Arabic Integer converter

// Simple interface to use the RomanNumerals helper and display
// error messages (simple messages for this test, they)
// would be expanded for production
import React from 'react';
import RomanNumerals from './services/RomanNumerals';
import './App.css';

function App() {
  const ROMAN = 'roman',
    INTEGER = 'integer';

  const [romanValue, setRomanValue] = React.useState(''), // Controlled input
    [integerValue, setIntegerValue] = React.useState(''), // Controlled input
    [romanError, setRomanError] = React.useState(null), // Error message
    [integerError, setIntegerError] = React.useState(null), // Error message
    [activeInput, setActiveInput] = React.useState(INTEGER);

  // Update values for controlled inputs
  const romanOnChange = (event) => setRomanValue(event.target.value),
    integerOnChange = (event) => setIntegerValue(event.target.value);

  // Change which input is active (roman or arabic)
  const toggleActiveInput = () =>
    setActiveInput(activeInput === ROMAN ? INTEGER : ROMAN);

  // Convert roman numerals to arabic digits or display error message
  const calculateInteger = () => {
    setRomanError(null);
    try {
      setIntegerValue(RomanNumerals.fromRoman(romanValue));
    } catch (error) {
      setRomanError(error.message);
      setIntegerValue('');
    }
  };

  // Convert arabit digits to roman numerals or display error message
  const calculateRoman = () => {
    setIntegerError(null);
    try {
      setRomanValue(RomanNumerals.toRoman(integerValue));
    } catch (error) {
      setIntegerError(error.message);
      setRomanValue('');
    }
  };

  // Convert the active input to the other number type
  const calculateActive =
    activeInput === ROMAN ? calculateInteger : calculateRoman;

  // Container for arabic integer input and error message
  const integerInput = (
    <div className='inputContainer'>
      <div className='label'>Arabic Number</div>
      <input
        type='number'
        min={RomanNumerals.min}
        max={RomanNumerals.max}
        value={integerValue}
        onChange={integerOnChange}
        disabled={activeInput !== INTEGER}
        onBlur={calculateRoman}
      />
      <div className='error'>{integerError}</div>
    </div>
  );

  // Container for roman numeral input and error message
  const romanInput = (
    <div className='inputContainer'>
      <div className='label'>Roman Numerals</div>
      <input
        value={romanValue}
        onChange={romanOnChange}
        disabled={activeInput !== ROMAN}
        onBlur={calculateInteger}
      />
      <div className='error'>{romanError}</div>
    </div>
  );

  return (
    <div className='App'>
      <h3>Roman Numeral Converter</h3>
      <p>
        Convert between arabic (modern) and roman numbers below. Note: This
        calculator can only handle numbers from 1 to 3999 because there's no
        standard representations of smaller or larger numbers.
      </p>
      <div className='content'>
        {activeInput === ROMAN ? romanInput : integerInput}
        <div className='buttons'>
          <button onClick={calculateActive}>CONVERT</button>
          <button onClick={toggleActiveInput}>{'< = >'}</button>
        </div>
        {activeInput !== ROMAN ? romanInput : integerInput}
      </div>
    </div>
  );
}

export default App;
