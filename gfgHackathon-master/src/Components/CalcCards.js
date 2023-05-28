import React from 'react'
import {  Card,CardHeader,CardBody,CardFooter,Typography,Button} from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';


const CalcCards = (props) => {
    const calc = props.calc;
    const navigate = useNavigate() ; 
    function buttonHandler(id){
        console.log(id) ;
        id ===1 &&(navigate('/EmiCalculator'))
        id===2 && (navigate('/BreakEvenCalculator')) 
        id===3 && (navigate('/CagrCalculator')) 
        id ===4 && (navigate('/GoalCalculator'))
        id ===5&& (navigate('/LumpSumCalculator'))
        id ===6&& (navigate('/RoiCalculator'))
        id ===7&& (navigate('/SipCalculator'))
        id ===8&& (navigate('/PositionSizeCalculator'))
         
       
    
}
    
  return (
            <Card className="flex justify-evenly mt-10 mb-10 relative w-96 ">
                <CardHeader color="blue-gray" className="relative h-56">
                    <img src={calc.url} ></img>
                </CardHeader>
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        {calc.title}
                    </Typography>
                    <Typography>
                        {calc.description}
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0 ">
                    <Button onClick={()=>buttonHandler(Number(calc.id))}>Calculate</Button>
                </CardFooter>
            </Card>
 

    )
}

export default CalcCards