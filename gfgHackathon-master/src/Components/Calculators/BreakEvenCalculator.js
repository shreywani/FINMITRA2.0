import React, { useState } from 'react';
import './style.css';

function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = useState(null);
  const [unitPrice, setUnitPrice] = useState(null);
  const [variableCosts, setVariableCosts] = useState(null);
  const [breakEvenPoint, setBreakEvenPoint] = useState(null);

  const handleCalculate = (event) => {
    event.preventDefault();
    const bep = fixedCosts / (unitPrice - variableCosts);
    setBreakEvenPoint(Math.ceil(bep));
  };

  return (
    <div className='w-screen h-screen bg-img'>
      <div className='w-[1350px] h-screen mx-auto flex justify-center items-center flex-col text-white bg-opacity-50 backdrop-blur-l rounded drop-shadow-l'>
        <form onSubmit={handleCalculate} className='shadow-md bg-black bg-opacity-10 w-1/2 rounded-xl px-8 pt-6 pb-8 mb-4'>
          <div className='mb-4'>
            <label htmlFor='fixedCosts' className='block font-bold mb-2'>
              Fixed Costs:
            </label>
            <input
              type='number'
              id='fixedCosts'
              value={fixedCosts}
              onChange={(e) => setFixedCosts(Number(e.target.value))}
              className='shadow bg-opacity-10 appearance-none border rounded w-full py-2 px-3 bg-black leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='unitPrice' className='block font-bold mb-2'>
              Unit Price:
            </label>
            <input
              type='number'
              id='unitPrice'
              value={unitPrice}
              onChange={(e) => setUnitPrice(Number(e.target.value))}
              className='shadow bg-opacity-10 appearance-none border rounded w-full py-2 px-3 bg-black leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='variableCosts' className='block font-bold mb-2'>
              Variable Costs:
            </label>
            <input
              type='number'
              id='variableCosts'
              value={variableCosts}
              onChange={(e) => setVariableCosts(Number(e.target.value))}
              className='shadow bg-opacity-10 appearance-none border rounded w-full py-2 px-3 bg-black leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
            Calculate Break Even Point
          </button>
        </form>
        {breakEvenPoint !== 0 && (
          <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative' role='alert'>
            <strong className='font-bold'>Your Break Even Point is: {breakEvenPoint} units</strong>
          </div>
        )}
      </div>
    </div>
  );
}

export default BreakEvenCalculator;
