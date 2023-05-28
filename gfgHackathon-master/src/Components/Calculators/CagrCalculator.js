import React, { useState } from 'react';
import "./style.css"


function CagrCalculator() {
  const [initialValue, setInitialValue] = useState(null);
  const [finalValue, setFinalValue] = useState(null);
  const [years, setYears] = useState(null);
  const [cagr, setCAGR] = useState(null);

  const handleCalculate = (event) => {
    event.preventDefault();
    const cagr = Math.pow(finalValue / initialValue, 1 / years) - 1;
    setCAGR((cagr * 100).toFixed(2));
  }

  return (
    <div className='w-screen h-screen bg-img '>
    <div className="w-[1350px] h-screen mx-auto flex justify-center items-center flex-col text-white bg-opacity-50  backdrop-blur-l rounded drop-shadow-l">
      <form onSubmit={handleCalculate} className="shadow-md bg-black bg-opacity-10 w-1/2 rounded-xl px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="initialValue" className="block font-bold mb-2">Initial Value:</label>
          <input type="number" id="initialValue" value={initialValue} onChange={(e) => setInitialValue(Number(e.target.value))} className="shadow bg-opacity-10 appearance-none border rounded w-full py-2 px-3 bg-black leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="finalValue" className="block font-bold mb-2">Final Value:</label>
          <input type="number" id="finalValue" value={finalValue} onChange={(e) => setFinalValue(Number(e.target.value))}className="shadow bg-opacity-10 appearance-none border rounded w-full py-2 px-3 bg-black leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="years" className="block  font-bold mb-2">Years:</label>
          <input type="number" id="years" value={years} onChange={(e) => setYears(Number(e.target.value))} className="shadow bg-opacity-10 appearance-none border rounded w-full py-2 px-3 bg-black leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Calculate CAGR</button>
      </form>
      {cagr !== 0 && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Your CAGR is: {cagr}%</strong>
      </div>}
    </div>
    </div>
  );
}

export default CagrCalculator;
