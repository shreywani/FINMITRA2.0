import React, { useState } from 'react';
import "./style.css"

function RoiCalculator() {
  const [investment, setInvestment] = useState(null);
  const [returnAmount, setReturnAmount] = useState(null);
  const [roi, setROI] = useState(null);

  const handleCalculate = (event) => {
    event.preventDefault();
    const roi = ((returnAmount - investment) / investment) * 100;
    setROI(roi.toFixed(2));
  }

  return (
    <div className='w-screen h-screen bg-img '>
    <div className="w-[1350px] h-screen mx-auto flex justify-center items-center flex-col text-white bg-opacity-50  backdrop-blur-l rounded drop-shadow-l">
      <form onSubmit={handleCalculate} className="shadow-md bg-black bg-opacity-10 w-1/2 rounded-xl px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="investment" className="block font-bold mb-2">Investment Amount:</label>
          <input type="number" id="investment" value={investment} onChange={(e) => setInvestment(Number(e.target.value))} className="shadow bg-opacity-10 appearance-none border rounded w-full py-2 px-3 bg-black leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="returnAmount" className="block font-bold mb-2">Return Amount:</label>
          <input type="number" id="returnAmount" value={returnAmount} onChange={(e) => setReturnAmount(Number(e.target.value))} className="shadow bg-opacity-10 appearance-none border rounded w-full py-2 px-3 bg-black leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Calculate ROI</button>
      </form>
      {roi !== null && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Your ROI is: {roi}%</strong>
      </div>}
    </div>
    </div>
  );
}

export default RoiCalculator;
