import { useContext, useEffect, useState } from "react";

import {
  Button,
  IconButton,
  MobileNav,
  Navbar,
  Typography
} from "@material-tailwind/react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";


export default function FinNav() {
  const {setIsLoggedIn,isCompanyLoggedIn,setUserInfo, setCompanyInfo,setIsCompanyLoggedIn,isLoggedIn,userInfo} = useContext(AppContext)
  const navigate = useNavigate ()

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('companyToken')
    setIsLoggedIn(false)
    setIsCompanyLoggedIn(false)
    setUserInfo([])
    setCompanyInfo([])
    navigate('/')
  
  }

  
 


  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
         {  <Typography
              as="li"
              variant="small"
              color="white"
              className="p-1 font-normal"
            >
              <a href="/" className="flex items-center">
                Home
              </a>
            </Typography>
}

{ isCompanyLoggedIn && !isLoggedIn &&  <Typography
              as="li"
              variant="small"
              color="white"
              className="p-1 font-normal"
            >
              <a href="/Dashboard" className="flex items-center">
                Dashboard
              </a>
            </Typography>
}
     {  isCompanyLoggedIn && <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-normal"
      >
        <a href="/ScoreWithCard" className="flex items-center">
          Score
        </a>
      </Typography>
}
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-normal"
      >
        <a href= "/Calculators" className="flex items-center">
          Calculators
        </a>
      </Typography>
     {isLoggedIn && <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-normal"
      >
        <a href="/filter" className="flex items-center">
          Recommend Me
        </a>
      </Typography>
    }

      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-normal"
      >
        <a href="/ResultPage" className="flex items-center">
          {userInfo.name}
        </a>
      </Typography>
    </ul>
  );

  return (

    <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 border-none bg-black bg-opacity-30 backdrop-blur-lg  ">
      <div className="container mx-auto flex items-center  justify-between">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          FINMITRA
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <div>
          {!isLoggedIn &&
          <a variant="gradient" size="sm" href= "/login" className="hidden bg-blue-700 py-3 px-6 rounded-xl lg:inline-block">
            <span>Login</span>
          </a>
          }
          {
            isLoggedIn  &&
            <a variant="gradient" size="sm" href= "/login" onClick={logout} className="hidden bg-blue-700 py-3 px-6 rounded-xl lg:inline-block">
            <span>Logout</span>
            </a>

           


          }
          
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <Button variant="gradient" size="sm" fullWidth className="mb-2">
            <span>Login</span>
          </Button>
        </div>
      </MobileNav>
    </Navbar>
  );
}