import React, { useState } from 'react';
import "./style.css"

function PositionSizeCalculator() {
    const [capital, setCapital] = useState(null);
    const [riskPercentage, setRiskPercentage] = useState(null);
    const [entryPrice, setEntryPrice] = useState(null);
    const [stopLossPrice, setStopLossPrice] = useState(null);
    const [positionSize, setPositionSize] = useState(null);

    const handleCalculate = (event) => {
        event.preventDefault();
        const riskAmount = capital * (riskPercentage / 100);
        const positionSize = riskAmount / (entryPrice - stopLossPrice);
        setPositionSize(positionSize.toFixed(2));
    }

    return (
        <div className='w-screen h-screen bg-img '>
            <div className="w-[1350px] h-screen mx-auto flex justify-center items-center flex-col text-white bg-opacity-50  backdrop-blur-l rounded drop-shadow-l">
                <form onSubmit={handleCalculate} className="shadow-md bg-black bg-opacity-10 w-1/2 rounded-xl px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label htmlFor="capital" className="block font-bold mb-2">Capital:</label>
                        <input type="number" id="capital" value={capital} onChange={(e) => setCapital(Number(e.target.value))} className="shadow bg-opacity-10 appearance-none border rounded w-full py-2 px-3 bg-black leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="riskPercentage" className="block font-bold mb-2">Risk Percentage:</label>
                        <input type="number" id="riskPercentage" value={riskPercentage} onChange={(e) => setRiskPercentage(Number(e.target.value))} className="shadow bg-opacity-10 appearance-none border rounded w-full py-2 px-3 bg-black leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="entryPrice" className="block  font-bold mb-2">Entry Price:</label>
                        <input type="number" id="entryPrice" value={entryPrice} onChange={(e) => setEntryPrice(Number(e.target.value))} className="shadow bg-opacity-10 appearance-none border rounded w-full py-2 px-3 bg-black leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="stopLossPrice" className="block font-bold mb-2">Stop Loss Price:</label>
                        <input type="number" id="stopLossPrice" value={stopLossPrice} onChange={(e) => setStopLossPrice(Number(e.target.value))} className="shadow bg-opacity-10 appearance-none border rounded w-full py-2 px-3 bg-black leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Calculate Position Size</button>
                </form>
                {positionSize !== null && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Your Position Size is: {positionSize} shares</strong>
                </div>}
            </div>
        </div>

    )
}

export default PositionSizeCalculator