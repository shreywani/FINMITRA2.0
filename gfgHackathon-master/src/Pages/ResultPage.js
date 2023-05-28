import React, { useEffect, useState } from 'react';
import ResultCard from '../Components/ResultCard';
import { useContext } from 'react';
import { AppContext } from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const ResultPage = () => {
  const [funds, setFunds] = useState([]);
  const {setIsCompanyLoggedIn,isCompanyLoggedIn,companyInfo,setCompanyInfo} = useContext(AppContext)
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const callProtectedPage = async () => {
    setLoading(true)
    try {
      const respose = await fetch('http://localhost:4000/api/v1/protectedCompany', {
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
              fetchCardsInfo()
  },[])
  


  const fetchCardsInfo = async (companyInfo) => {
    try {
      const response = await axios.get(`${process.env.BASE_URL}/api/v1/getLeads`, {
        params: {
         id : companyInfo.companyId
        },
      });
      console.log(response.data)
      setFunds(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  

  // useEffect(() => {
  //   // fetch('http://localhost:4000/api/v1/getFundResults')
  //   //   .then((response) => response.json())
  //   //   .then((data) => {
  //   //     setFunds(data);
  //   //     console.log(data)
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error('Error:', error);
  //   //   });
  //   fetchCardsInfo()
  // }, []);

  return (
    
    <div className='flex flex-wrap gap-10 text-white justify-center mx-auto'>
    
{ (funds.length>0 ) ?
    funds.map((fund)=>(
       <ResultCard fund={fund}/>
    ))
    :
    <div>NO data to show</div>

}

    </div>
  )


    

};

export default ResultPage;
