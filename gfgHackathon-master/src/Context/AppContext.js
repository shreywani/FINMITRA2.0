import { createContext, useState } from "react";
import finalDataMF from "../finaldataMF.json";

//step1
export const AppContext = createContext();

export default function AppContextProvider({children}) {
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false) ;
    const [riskFactors, setRiskFactors] = useState([]);
    const [selectedRiskFactors, setSelectedRiskFactors] = useState([]);
    const [expenseRatio, setExpenseRatio] = useState(1);
    const [exitLoad, setExitLoad] = useState(0.5);
    const [cagrSixMonth, setCagrSixMonth] = useState([10, 20]);
    const [cagrOneYear, setCagrOneYear] = useState([10, 20]);
    const [cagrThreeYear, setCagrThreeYear] = useState([10, 20]);
    const [sipAmount, setSipAmount] = useState(5000);
    const [fundData, setFundData] = useState(finalDataMF)
    const [userInfo, setUserInfo] =useState([])
    const [companyInfo, setCompanyInfo] = useState([])
    const [isCompanyLoggedIn,setIsCompanyLoggedIn] = useState(false)
    const [userInput, setUserInput] = useState({
        expenseRatio: null,
        exitLoad: null,
        cagrSixMonth: null,
        cagrOneYear: null,
        cagrThreeYear: null,
        sipAmount: null,
        riskFactors: null,
    

    }

    )

    //data filling pending

   

   



    const value = {
       
        loading, setLoading,
        isLoggedIn,setIsLoggedIn
        ,riskFactors,setRiskFactors,
        selectedRiskFactors,setSelectedRiskFactors,
        expenseRatio,setExpenseRatio,
        exitLoad,setExitLoad,
        cagrSixMonth,setCagrSixMonth,
        cagrOneYear,setCagrOneYear,
        cagrThreeYear,setCagrThreeYear,
        sipAmount,setSipAmount,
        userInput, setUserInput,
        fundData, setFundData,
        userInfo, setUserInfo,
        companyInfo, setCompanyInfo,
        isCompanyLoggedIn,setIsCompanyLoggedIn
        

    };

    
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>;
}