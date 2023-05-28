import React, { useState } from 'react';
import "./style.css"

function LumpsumCalculator() {
  const [principal, setPrincipal] = useState(null);
  const [rate, setRate] = useState(null);
  const [time, setTime] = useState(null);
  const [maturity, setMaturity] = useState(null);

  const handleCalculate = (event) => {
    event.preventDefault();
    const maturityAmount = principal * Math.pow((1 + rate / 100), time);
    setMaturity(maturityAmount.toFixed(2));
  }

  return (
    <div className='w-screen h-screen bg-img'>
      <div className="w-[1350px] h-screen mx-auto flex justify-center items-center flex-col text-white bg-opacity-50  backdrop-blur-l rounded drop-shadow-l">
        <form onSubmit={handleCalculate} className="shadow-md bg-black bg-opacity-10 w-1/2 rounded-xl px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="principal" className="block font-bold mb-2">Principal Amount:</label>
            <input type="number" id="principal" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="shadow bg-opacity-10 appearance-none border rounded w-full py-2 px-3 bg-black leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="rate" className="block font-bold mb-2">Rate of Return (in %):</label>
            <input type="number" id="rate" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="shadow bg-opacity-10 appearance-none border rounded w-full py-2 px-3 bg-black leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="time" className="block font-bold mb-2">Investment Period (in years):</label>
            <input type="number" id="time" value={time} onChange={(e) => setTime(Number(e.target.value))} className="shadow bg-opacity-10 appearance-none border rounded w-full py-2 px-3 bg-black leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Calculate Maturity Amount</button>
        </form>
        {maturity !== 0 && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Your Maturity Amount is: {maturity}</strong>
        </div>}
      </div>
    </div>
  );
}

export default LumpsumCalculator;
