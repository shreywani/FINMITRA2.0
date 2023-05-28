import axios from 'axios';
import React, { useEffect, useState,useContext } from 'react';
import { AppContext } from '../Context/AppContext';


import { CheckIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
   
  export default function FundCard(props) {
    const {userInfo} = useContext(AppContext)
    
    
  
    const fund = props.fund 
    const fundId = fund.fundId
    
    const [timeSpent, setTimeSpent] = useState(0);
    const [isAddedToWatchList, setIsAddedToWatchList] = useState(0);
    const [hasClickedMoreInfo, setHasClickedMoreInfo] = useState(0);
    const [hasSharedOnSocialMedia, setHasSharedOnSocialMedia] = useState(0);
    const [hasHovered, setHasHovered] = useState(0);
    const [hasDownloadedDocument, setHasDownloadedDocument] = useState(0);
    const [fundScores, setFundScores] = useState([]);

    
    function WatchListHandler() {
      setIsAddedToWatchList(1);
    }
        
    function MOreInfoHandler() {
      setHasClickedMoreInfo(1);
    
    }
    
    function ShareOnSocialMediaHandler() {
      setHasSharedOnSocialMedia(1);
    
    }
    function hovered() {
      setHasHovered(1);
 
    }
    function downloadedDocumentHandler() {
      setHasDownloadedDocument(1);
      
    }

    function calculateUserBehaviorScoreForFund(
      timeSpent,
      fund, 
      isAddedToWatchList,
      hasClickedMoreInfo,
      hasSharedOnSocialMedia,
      hasHovered,
      hasDownloadedDocument, 
      userInfo
    
    ) {

      const timeSpentWeight = 0.3;
      const watchListWeight = 0.2;
      const moreInfoWeight = 0.2;
      const socialMediaWeight = 0.1;
      const hoverWeight = 0.2;
      const documentDownloadWeight = 0.2;
      
      // Normalize each user activity score
      const normalizedTimeSpent = 0
      const normalizedWatchList = isAddedToWatchList ? 1 : 0;
      const normalizedMoreInfo = hasClickedMoreInfo ? 1.0 : 0;
      const normalizedSocialMedia = hasSharedOnSocialMedia ? 1.0 : 0;
      const normalizedHover = hasHovered ? 1.0 : 0;
      const normalizedDocumentDownload = hasDownloadedDocument ? 1.0 : 0;
      // Calculate the scores for each user activity
      const timeSpentScore = normalizedTimeSpent * timeSpentWeight;
      const watchListScore = normalizedWatchList * watchListWeight;
      const moreInfoScore = normalizedMoreInfo * moreInfoWeight;
      const socialMediaScore = normalizedSocialMedia * socialMediaWeight;
      const hoverScore = normalizedHover * hoverWeight;
      const documentDownloadScore = normalizedDocumentDownload * documentDownloadWeight;
      
      const userBehaviorScore = timeSpentScore + watchListScore + moreInfoScore + socialMediaScore + hoverScore + documentDownloadScore
      console.log(timeSpentScore + "watchList " + watchListScore + "moreInfo " + moreInfoScore + "Social Media Score " + socialMediaScore + "Hover Score" + hoverScore + "Doc Download" + documentDownloadScore)
    
      // console.log(userInfo.e)
    
      return {
        username: userInfo.name, 
        userEmail: userInfo.email,
        companyId: fund.companyId,
        fundId: fund.fundId, 
        fundScore: userBehaviorScore

      };
    } 


    
    function updateFundScore(fundScores) {
  
      const updatedData = {
        // userId: fundScores.userId,
        fundId: fundScores.fundId,
        fundScore: fundScores.fundScore, 
        username : userInfo.name,
        email: userInfo.email, 
        companyId:fund.companyId
      };
      console.log(updatedData)
  
      // Send the updated fund score data to the server
      axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/createFundScore`, updatedData)
        .then(response => {
          console.log('Fund score updated successfully');
          // Update the fundScores state with the updated data
          // setFundScores(prevFundScores => [...prevFundScores, updatedData]);
        })
        .catch(error => {
          console.error('Error updating fund score:', error);
        });
    }


  
    useEffect(() => {
      const fundScore = calculateUserBehaviorScoreForFund(
        // userId,
        timeSpent,
        fund, 
        isAddedToWatchList,
        hasClickedMoreInfo,
        hasSharedOnSocialMedia,
        hasHovered,
        hasDownloadedDocument, 
        userInfo
      );
      if (fundScore.fundScore!==0){
        setFundScores(fundScore);
      // console.log(fundScores)
    }
      // updateFundScore(userId, fund.fundId);
      
    }, [
     
      timeSpent,
      fund.fundId,
      isAddedToWatchList,
      hasClickedMoreInfo,
      hasSharedOnSocialMedia,
      hasHovered,
      hasDownloadedDocument,
    ]);
    

    useEffect(() => {
      
      
      if (fundScores.fundScore>0){
        console.log(fundScores)
        
      updateFundScore(fundScores) }

    }, [fundScores]);
     
  
   
    return (

      <Card color="blue" variant="gradient" onMouseEnter={hovered}  className="w-full max-w-[20rem] p-8">
        {/* {conso)} */}
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
        >
          <Typography
            variant="small"
            color="white"
            className="font-normal uppercase"
          >
            {fund.fundName}
          </Typography>
          <Typography
            variant="h1"
            color="white"
            className="mt-6 flex justify-center gap-1 text-7xl font-normal"
          >
            <span className="mt-2 text-4xl">NAV {fund.netAssetValue}</span>

        
          </Typography>
        </CardHeader>
        <CardBody className="p-0">
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <CheckIcon strokeWidth={2} className="h-3 w-3" />
              </span>
              <Typography className="font-normal">CAGR 6 MONTH : {fund.cagrSixMonths}</Typography>
            </li>
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <CheckIcon strokeWidth={2} className="h-3 w-3" />
              </span>
              <Typography className="font-normal">CAGR 1 YEAR : {fund.cagrOneYear}</Typography>
            </li>
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <CheckIcon strokeWidth={2} className="h-3 w-3" />
              </span>
              <Typography className="font-normal">CAGR 3 YEARS : {fund.cagrThreeYear}</Typography>
            </li>
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <CheckIcon strokeWidth={2} className="h-3 w-3" />
              </span>
              <Typography className="font-normal">EXIT LOAD : {fund.exitLoad}</Typography>
            </li>
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <CheckIcon strokeWidth={2} className="h-3 w-3" />
              </span>
              <Typography className="font-normal">EXPENSE RATIO : {fund.expenseRatio}</Typography>
            </li>
          </ul>
        </CardBody>
        <CardFooter className="mt-12 p-0">
          <Button onClick={MOreInfoHandler}
            size="lg"
            color="white"
            className="text-blue-500 hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
            ripple={false}
            fullWidth={true}
          >
            More Info
          </Button>
          <Button onClick={WatchListHandler}
            size="lg"
            color="white"
            className="text-blue-500 hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
            ripple={false}
            fullWidth={true}
          >
             Watch List
          </Button>

          <Button onClick={downloadedDocumentHandler}
            size="lg"
            color="white"
            className="text-blue-500 hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
            ripple={false}
            fullWidth={true}
          >
             Donwload Doc
          </Button>

          <Button onClick={ShareOnSocialMediaHandler}
            size="lg"
            color="white"
            className="text-blue-500 hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
            ripple={false}
            fullWidth={true}
          >
             Share On Social Media
           
          </Button>
        </CardFooter>
      </Card>
    );
  }