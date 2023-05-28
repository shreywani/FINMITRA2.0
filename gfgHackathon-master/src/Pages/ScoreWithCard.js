import React, { useState } from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import axios from 'axios';
import _ from 'lodash'; // Import lodash library
import Button from '../Components/Button';




const ScoreWithCard = () => {

    const {setIsCompanyLoggedIn,isCompanyLoggedIn,companyInfo,setCompanyInfo} = useContext(AppContext)
    const [funds, setFunds] = React.useState([])
    const [fundLeads, setFundLeads] = useState([]);
    const companyId = companyInfo.companyId;
   
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);

    const fetchCardsInfo = async () => {
     
         // Replace with the actual com
    
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/getLeadsCard?companyId=${companyInfo.companyId}`)
          .then(response => {
            const data = response.data;
            setFundLeads(data);
          })
          .catch(error => {
            console.error('Error retrieving fund leads:', error);
          });
      }
    
  
    
    const callProtectedPage = async () => {
      setLoading(true)
      try {
        const respose = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/protectedCompany`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('tokenCompany')}`,
  
  
        }, 
     
      }
        )
  
        const data = await respose.json()
        console.log(data.data)
        if(data.success) { 
          setIsCompanyLoggedIn(true)
          
          setCompanyInfo(data.data) 
          navigate('/Dashboard')
        }
        else {
          setIsCompanyLoggedIn(false)
  
        }
        setLoading(false)
        
      } catch (error) {
        console.log(error)
        setIsCompanyLoggedIn(false)
        navigate('/loginCompany')
        
      }
    }
    useEffect(() => {
                callProtectedPage()
               
    },[])

    useEffect(() => {
      fetchCardsInfo()
     
},[companyInfo])

function logout (){
  localStorage.removeItem('tokenCompany')
  setIsCompanyLoggedIn(false)
  setCompanyInfo([])
  navigate('/loginCompany')
}


    
  

    
  return (
    <div className='mt-1 bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600 h-screen w-screen'>
     <div className="bg-gray-900 h-screen w-full text-white">
      <header className="bg-gray-800 flex justify-around w-[1350px] mx-auto p-4">
      <div className='w-full flex justify-between '>
        <h1 className="text-2xl font-bold">Company Dashboard</h1>
       
        {isCompanyLoggedIn && <button onClick={logout}  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Logout
          </button>}
        {!isCompanyLoggedIn && <button onClick={()=>navigate('/loginCompany')} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Login
    </button>}
    </div>
      </header>
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold mt-8">Fund Leads</h2>
        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2">Fund ID</th>
              <th className="px-4 py-2">Fund Name</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {fundLeads.map((lead) => (
              <tr key={lead.fundId}>
                <td className="px-4 py-2">{lead.fundId}</td>
                <td className="px-4 py-2">{lead.fundName}</td>
                <td className="px-4 py-2">{lead.username}</td>
                <td className="px-4 py-2">{lead.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

        
    </div>
  )
}

export default ScoreWithCard