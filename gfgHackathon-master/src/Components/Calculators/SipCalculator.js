import React, { useState } from 'react';
import "./style.css"

function SipCalculator() {
  const [investmentAmount, setInvestmentAmount] = useState(null);
  const [investmentTenure, setInvestmentTenure] = useState(null);
  const [expectedRateOfReturn, setExpectedRateOfReturn] = useState(null);
  const [monthlyContribution, setMonthlyContribution] = useState(null);
  const [maturityAmount, setMaturityAmount] = useState(null);

  const handleCalculate = (event) => {
    event.preventDefault();
    const r = (expectedRateOfReturn / 100) / 12;
    const n = investmentTenure * 12;
    const P = investmentAmount;
    const M = monthlyContribution;
    const maturityValue = (M * ((Math.pow(1 + r, n) - 1) / r) + P * Math.pow(1 + r, n)).toFixed(2);
    setMaturityAmount(maturityValue);
  }

  return (
    <div className='w-screen h-screen bg-img '>
    <div className="w-[1350px] h-screen mx-auto flex justify-center items-center flex-col text-white bg-opacity-50  backdrop-blur-l rounded drop-shadow-l">
      <form onSubmit={handleCalculate} className="shadow-md bg-black bg-opacity-10 w-1/2 rounded-xl px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="investmentAmount" className="block font-bold mb-2">Investment Amount:</label>
          <input type="number" id="investmentAmount" value={investmentAmount} onChange={(e) => setInvestmentAmount(Number(e.target.value))} className="shadow bg-opacity-10 appearance-none border rounded w-full py-2 px-3 bg-black leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="investmentTenure" className="block font-bold mb-2">Investment Tenure (years):</label>
          <input type="number" id="investmentTenure" value={investmentTenure} onChange={(e) => setInvestmentTenure(Number(e.target.value))} className="shadow bg-opacity-10 appearance-none border rounded w-full py-2 px-3 bg-black leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="expectedRateOfReturn" className="block font-bold mb-2">Expected Rate of Return (% p.a.):</label>
          <input type="number" id="expectedRateOfReturn" value={expectedRateOfReturn} onChange={(e) => setExpectedRateOfReturn(Number(e.target.value))} className="shadow bg-opacity-10 appearance-none border rounded w-full py-2 px-3 bg-black leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="monthlyContribution" className="block font-bold mb-2">Monthly Contribution:</label>
          <input type="number" id="monthlyContribution" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} className="shadow bg-opacity-10 appearance-none border rounded w-full py-2 px-3 bg-black leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Calculate ROI</button>
      </form>
      {maturityAmount !== null && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Your Maturity Amount is : {maturityAmount}%</strong>
      </div>}
    </div>
    </div>

  ) 
}
export default SipCalculator ;