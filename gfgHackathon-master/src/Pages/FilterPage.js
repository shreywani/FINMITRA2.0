import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Range } from 'react-range';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import FundCard from '../Components/FundCard';
import { AppContext } from '../Context/AppContext';
const FilterPage = () => {
  const [formdata, setFormdata] = useState([])
  const [exitLoadRange, setExitLoadRange] = useState([0, 1]);
  const [expenseRatioRange, setExpenseRatioRange] = useState([0, 3]);
  const [sipAmountRange, setSipAmountRange] = useState([0, 10000]);
  const [cagrThreeYearRange, setCagrThreeYearRange] = useState([0, 30]);
  const [cagrOneYearRange, setCagrOneYearRange] = useState([0, 30]);
  const [cagrSixMonthsRange, setCagrSixMonthsRange] = useState([0, 30]);
  const [riskFactors, setRiskFactors] = useState([]);
  const [funds,setFunds] = useState([])
  const navigate = useNavigate();
  const {setIsLoggedIn, setUserInfo} = useContext(AppContext)


  const callProtectedPage = async () => {
    try {
      const respose = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/protected`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,


      }, 
   
    }
      )

      const data = await respose.json()
      // console.log(data.data)
      if(data.success) { 
        setIsLoggedIn(true)
        setUserInfo(data.data) 
      }
      else {
        navigate('/')
      }
      
    } catch (error) {
      console.log(error)
      setIsLoggedIn(false)
      navigate('/')
      
    }
  }
  useEffect(() => {
              callProtectedPage()
  },[])
  

  const handleSubmit = async (e) => {
     

    e.preventDefault();
    const formData = {
      exitLoadRange,
      expenseRatioRange,
      sipAmountRange,
      cagrThreeYearRange,
      cagrOneYearRange,
      cagrSixMonthsRange,
      riskFactors,
    };
   
      console.log(formData)
      setFormdata(formData)

   
      
     
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/getFundFilterData`, {
        params: {
          exitLoadRange:exitLoadRange, 
      expenseRatioRange:expenseRatioRange, 
      sipAmountRange:sipAmountRange, 
      cagrThreeYearRange: cagrThreeYearRange, 
      cagrOneYearRange: cagrOneYearRange,
      cagrSixMonthsRange:cagrSixMonthsRange, 
      riskFactors:riskFactors
         
        },
      });
      console.log(response.data)
      setFunds(response.data);
    } catch (error) {
      console.error(error);
    }

      
    

}



  return (
    <div className="bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600  text-white w-[screen] h-[screen] p-40 ">
      <div className='w-1/2 bg-white bg-opacity-10 border-white px-20 py-10 rounded-lg mx-auto'>

     { (funds.length!==10) &&<div>
     <h1 className="text-4xl font-bold mb-8">Mutual Fund Filter</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="text-lg mb-2">Exit Load Range:</label>
          <Range
            step={0.1}
            min={0}
            max={1}
            values={exitLoadRange}
            onChange={(values) => setExitLoadRange(values)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="h-2 w-full bg-gray-700 rounded"
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                className="h-6 w-6 bg-blue-500 rounded-full shadow cursor-pointer"
              />
            )}
          />
          <span className="text-sm">
            {exitLoadRange[0]} - {exitLoadRange[1]}
          </span>
        </div>
        {/* Repeat the same structure for other form elements */}
        <div className="mb-6">
          <label className="text-lg mb-2">Expense Ratio Range:</label>
          <Range
            step={0.1}
            min={0}
            max={3}
            values={expenseRatioRange}
            onChange={(values) => setExpenseRatioRange(values)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="h-2 w-full bg-gray-700 rounded"
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                className="h-6 w-6 bg-blue-500 rounded-full shadow cursor-pointer"
              />
            )}
          />
          <span className="text-sm">
            {expenseRatioRange[0]} - {expenseRatioRange[1]}
          </span>
        </div>
        <div className="mb-6">
          <label className="text-lg mb-2">SIP Amount Range:</label>
          <Range
            step={100}
            min={0}
            max={10000}
            values={sipAmountRange}
            onChange={(values) => setSipAmountRange(values)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="h-2 w-full bg-gray-700 rounded"
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                className="h-6 w-6 bg-blue-500 rounded-full shadow cursor-pointer"
              />
            )}
          />
          <span className="text-sm">
            {sipAmountRange[0]} - {sipAmountRange[1]}
          </span>
        </div>
        <div className="mb-6">
          <label className="text-lg mb-2">CAGR 3-Year Range:</label>
          <Range
            step={1}
            min={0}
            max={30}
            values={cagrThreeYearRange}
            onChange={(values) => setCagrThreeYearRange(values)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="h-2 w-full bg-gray-700 rounded"
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                className="h-6 w-6 bg-blue-500 rounded-full shadow cursor-pointer"
              />
            )}
          />
          <span className="text-sm">
            {cagrThreeYearRange[0]} - {cagrThreeYearRange[1]}
          </span>
        </div>
        <div className="mb-6">
          <label className="text-lg mb-2">CAGR 1-Year Range:</label>
          <Range
            step={1}
            min={0}
            max={30}
            values={cagrOneYearRange}
            onChange={(values) => setCagrOneYearRange(values)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="h-2 w-full bg-gray-700 rounded"
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                className="h-6 w-6 bg-blue-500 rounded-full shadow cursor-pointer"
              />
            )}
          />
          <span className="text-sm">
            {cagrOneYearRange[0]} - {cagrOneYearRange[1]}
          </span>
        </div>
        <div className="mb-6">
          <label className="text-lg mb-2">CAGR 6-Months Range:</label>
          <Range
            step={1}
            min={0}
            max={30}
            values={cagrSixMonthsRange}
            onChange={(values) => setCagrSixMonthsRange(values)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="h-2 w-full bg-gray-700 rounded"
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                className="h-6 w-6 bg-blue-500 rounded-full shadow cursor-pointer"
              />
            )}
          />
          <span className="text-sm">
            {cagrSixMonthsRange[0]} - {cagrSixMonthsRange[1]}
          </span>
        </div>
        <div className="mb-6">
          <label className="text-lg mb-2">Risk Factors:</label>
          <select
           
            value={riskFactors}
            onChange={(e) =>
              setRiskFactors(e.target.value)
            }
            className="bg-gray-700 text-white p-2 rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="very low">Very Low</option>
            <option value="very high">Very High</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Filter
        </button>
      </form>
      </div>
              
      }
      {
        funds.length===10 &&
      
           <div className='flex flex-wrap gap-10 justify-center mx-auto'> 
     
                    { funds.map((fund) => (
                        <FundCard fund={fund}/>
                      ))

                    }
               </div>
      
      }
      </div>
    </div>
  );
};

export default FilterPage;
