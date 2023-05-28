import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Billing, Business, CTA, CardDeal, Footer, Hero, Stats, Testimonials } from '../Components';
import { AppContext } from '../Context/AppContext';
import "../index.css";
import styles from "../style";


const Home = () => {
  const {setIsLoggedIn,setUserInfo} = useContext(AppContext)
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  
  const callProtectedPage = async () => {
    setLoading(false)
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
      console.log(data.data)
      if(data.success) { 
        setIsLoggedIn(true)
        setUserInfo(data.data) 
      }
      else {
        setIsLoggedIn(false)
        navigate('/')
      }
      setLoading(false)
      
    } catch (error) {
      console.log(error)
      setIsLoggedIn(false)
      navigate('/')
      
    }
  }
  useEffect(() => {
              callProtectedPage()
  },[])
  




  return (
    <div className=" w-full overflow-hidden">
    { loading ? <div className="flex justify-center  text-white text-6xl items-center h-screen">Loading...</div> :
    <div>    
       <div className={`bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600 ${styles.flexStart}`}>
      
          <div className={`${styles.boxWidth}`}>
        
            <Hero />
          </div>
        </div>
        
        <div className={`bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600 ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Stats />
            <Business />
            <Billing />
            <CardDeal />
            <Testimonials />
            <CTA />
            <Footer />
          </div>
        </div>
        </div>
      }
  </div>

  )
}

export default Home