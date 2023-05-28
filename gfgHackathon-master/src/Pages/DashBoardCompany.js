import React, { useContext } from 'react'
import { AppContext } from '../Context/AppContext'
import styles from "../style";
import "../index.css"

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ScoreWithCard from './ScoreWithCard';


const DashBoardCompany = () => {
  const {setIsCompanyLoggedIn,setCompanyInfo} = useContext(AppContext)
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  
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
        navigate('/loginCompany')
      


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
  




  return (
    <div className=" w-full overflow-hidden">
  
            <ScoreWithCard></ScoreWithCard>
                
            
   

  </div>

  )
}

export default DashBoardCompany