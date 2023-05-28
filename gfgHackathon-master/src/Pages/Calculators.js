import React from 'react'
import { calculatorData } from '../calculatorData'
import CalcCards from '../Components/CalcCards'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../Context/AppContext'
import { useEffect } from 'react'
const Calculators = () => {
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
        navigate('/Calculators')
      }
      
    } catch (error) {
      console.log(error)
      setIsLoggedIn(false)
      navigate('/Calculators')
      
    }
  }
  useEffect(() => {
              callProtectedPage()
  },[])
  



  

  return (
    <div className='w-full slate  h-full'>
      <div className='flex flex-wrap gap-5  w-[1350px] h-full my-6 mx-auto justify-center'  >
        {
          calculatorData.map((calc) => (<CalcCards calc={calc} />))
        }

      </div>
    </div>
  )
}

export default Calculators