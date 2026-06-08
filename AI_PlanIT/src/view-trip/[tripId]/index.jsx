import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InfoSection from './components/InfoSection';
import {doc,getDoc} from 'firebase/firestore'
import {db} from '@/service/firebaseConfig'
import { useState } from "react";
import Hotels from './components/Hotels';
import PlacesToVisit from './components/PlacesToVisit'
import Footer from './components/Footer';
import WeatherForecast from './components/WeatherForecast';



function Viewtrip() {
  const {tripId} = useParams();
  const [trip,setTrip] = useState([])

  useEffect(()=>{
    tripId&&GetTripData();
  },[tripId])

const GetTripData = async()=>{
    const docref=doc(db,'AITrips',tripId);
    const docSnap = await getDoc(docref);

    if(docSnap.exists()){
        console.log("Document",docSnap.data());
        setTrip(docSnap.data());
    }else{
        console.log("No such document");
        Toast('No trip Found');
    }
  }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      {/* Information section */}
       <InfoSection trip={trip} />
       {/* Weather section */}
       <WeatherForecast weather={trip?.tripData?.tripData?.weatherForecast || []} />
      {/* recomended hotels */}
       <Hotels trip={trip}/>
      {/* Daily plan */}
       <PlacesToVisit trip={trip}/>
      {/* Footer */}
      <Footer trip={trip}/>
    </div>
  )
}

export default Viewtrip
