import React, { useState } from 'react';
import './style.css';

function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState(null);
  const [interestRate, setInterestRate] = useState(null);
  const [loanTerm, setLoanTerm] = useState(null);
  const [emi, setEmi] = useState(null);

  const handleCalculate = (event) => {
    event.preventDefault();
    const monthlyRate = (interestRate / 100) / 12;
    const totalPayments = loanTerm * 12;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
    setEmi(emi.toFixed(2));
  };

  return (
    <div className="w-screen h-screen bg-img">
      
      <div className="w-[1350px] h-screen mx-auto flex justify-center items-center flex-col text-white bg-opacity-50 backdrop-blur-l rounded drop-shadow-l">
        <div className='flex justify-start w-1/2'>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none my-5  focus:shadow-outline">Back</button>
        </div>
      
        <form onSubmit={handleCalculate} className="shadow-md bg-black bg-opacity-10 w-1/2 rounded-xl px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="loanAmount" className="block font-bold mb-2">Loan Amount:</label>
            <input type="number" id="loanAmount" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="shadow bg-opacity-10 appearance-none border rounded w-full py-2 px-3 bg-black leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="interestRate" className="block font-bold mb-2">Interest Rate:</label>
            <input type="number" id="interestRate" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="shadow bg-opacity-10 appearance-none border rounded w-full py-2 px-3 bg-black leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="loanTerm" className="block  font-bold mb-2">Loan Term (in years):</label>
            <input type="number" id="loanTerm" value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} className="shadow bg-opacity-10 appearance-none border rounded w-full py-2 px-3 bg-black leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className='w-full flex justify-around'>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Calculate EMI</button>
        
          </div>
         
        </form>
        {emi !== null && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Your EMI is: Rs. {emi}</strong>
        </div>}
      </div>
    </div>
  );
}

export default EmiCalculator;
