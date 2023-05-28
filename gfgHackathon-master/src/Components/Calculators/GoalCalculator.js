import React, { useState } from 'react';
import "./style.css"

function GoalCalculator() {
  const [currentAmount, setCurrentAmount] = useState(null);
  const [monthlyContribution, setMonthlyContribution] = useState(null);
  const [years, setYears] = useState(null);
  const [goalAmount, setGoalAmount] = useState(null);

  const handleCalculate = (event) => {
    event.preventDefault();
    const totalAmount = currentAmount + monthlyContribution * 12 * years;
    setGoalAmount(totalAmount.toFixed(2));
  }

  return (
    <div className='w-screen h-screen bg-img'>
      <div className="w-[1350px] h-screen mx-auto flex justify-center items-center flex-col text-white bg-opacity-50 backdrop-blur-l rounded drop-shadow-l">
        <form onSubmit={handleCalculate} className="shadow-md bg-black bg-opacity-10 w-1/2 rounded-xl px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="currentAmount" className="block font-bold mb-2">Current Amount:</label>
            <input type="number" id="currentAmount" value={currentAmount} onChange={(e) => setCurrentAmount(Number(e.target.value))} className="shadow bg-opacity-10 appearance-none border rounded w-full py-2 px-3 bg-black leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="monthlyContribution" className="block font-bold mb-2">Monthly Contribution:</label>
            <input type="number" id="monthlyContribution" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} className="shadow bg-opacity-10 appearance-none border rounded w-full py-2 px-3 bg-black leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="years" className="block  font-bold mb-2">Years:</label>
            <input type="number" id="years" value={years} onChange={(e) => setYears(Number(e.target.value))} className="shadow bg-opacity-10 appearance-none border rounded w-full py-2 px-3 bg-black leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Calculate Goal</button>
        </form>
        {goalAmount !== null && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Your goal amount is: ${goalAmount}</strong>
        </div>}
      </div>
    </div>
  );
}

export default GoalCalculator;
