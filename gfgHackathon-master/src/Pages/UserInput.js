import React, {useContext} from 'react';
// import axios from 'axios';
import { AppContext } from '../Context/AppContext';

import {
    Card,
    Input,
    
    Button,
    Typography,
  } from "@material-tailwind/react";
   

const MutualFundForm = () => {
    const { 
        userInput, setUserInput } = useContext(AppContext);

        function changeHandler(event) {
            const {name, value} = event.target;
            setUserInput( (prev) => ({...prev, [name]: value}) );
          }


    const submitHandler = (e) => {
        e.preventDefault();
       
     
       console.log(userInput) ;
        // axios.post('http://localhost:5000/api/mutualFund', {
        //     riskFactors,
        //     cagrSixMonth,
        //     cagrOneYear,
        //     cagrThreeYear,
        //     sipAmount,
        //     exitLoad,
        //     expenseRatio,
        //     selectedRiskFactors
        // })
        // .then(res => {
        //     console.log(res);
        // })
        // .catch(err => {
        //     console.log(err);
        // })
    }
 

  
return (


<div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600">

    <Card color="transparent" className='bg-black bg-opacity-30 p-5 backdrop-blur-lg' shadow={false}>
      <Typography variant="h4" >
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to register.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={submitHandler}>
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" type='number' minLength={0.1} maxLength={1} onChange={changeHandler} name='expenseRatio' value={userInput.expenseRatio} required label="Expense Ratio" />
          <Input size="lg" label="Exit Load" type='number'onChange={changeHandler} name='exitLoad' value={userInput.exitLoad} required />
          <Input size="lg" label="Cagr (6 Months in %)" onChange={changeHandler} name='cagrSixMonth' value={userInput.cagrSixMonth} required type='number' />
          <Input type="number" size="lg" required onChange={changeHandler} name='cagrOneYear' value={userInput.cagrOneYear} label="Cagr (1 Year in %)" />
          <Input type="number" size="lg" required onChange={changeHandler} name='cagrThreeYear' value={userInput.cagrThreeYear} label="Cagr (3 Year in %)" />
          <Input type="number" size="lg" required onChange={changeHandler} name='sipAmount' value={userInput.sipAmount} label="Sip Amount" />
        </div>
       
        <Button type='submit' className="mt-6" fullWidth>
          Submit
        </Button>
        
      </form>
    </Card>


</div>
    );
};

export default MutualFundForm;