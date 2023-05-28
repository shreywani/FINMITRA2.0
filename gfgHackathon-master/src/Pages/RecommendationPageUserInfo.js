import React, { useContext, useEffect } from 'react'

import { useState } from 'react'
import { AppContext } from '../Context/AppContext'
import FundCard from '../Components/FundCard'

export const RecommendationPageUserInfo = () => {

  const {fundData, setFundData} = useContext(AppContext)

  




  return (
    <div className='flex flex-wrap gap-10 justify-center mx-auto'> 
     
     { fundData.map((fund) => (
        <FundCard fund={fund}/>
      ))

     }
    </div>
  )
}


export default RecommendationPageUserInfo