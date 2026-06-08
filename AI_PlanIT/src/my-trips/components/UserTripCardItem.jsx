import React from 'react'
import { useEffect, useState } from 'react'
import { GetPlaceDetails } from '@/service/GlobalAPi';
import { Link } from "react-router-dom";

function UserTripCardItem({trip}) {
  console.log(trip); 
  
      const [photoURL, setPhotoURL] = useState('/placeholder.jpg');
  
      useEffect(() => {
          trip && GetPlacePhoto();
      }, [trip]);
      
      const GetPlacePhoto = async () => {
          const data = {
              textQuery: trip?.userSelection?.region + ', ' + trip?.userSelection?.country
          };
          
          try {
              const result = await GetPlaceDetails(data);
              const photoName = result?.data?.places?.[0]?.photos?.[3]?.name;
              console.log("photoName:"+photoName);
              const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
              const generatedPhotoURL = photoName
                  ? `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=600&maxWidthPx=600&key=${GOOGLE_API_KEY}`
                  : './placeholder.jpg';
      
              console.log("Generated Photo URL:", generatedPhotoURL);
              setPhotoURL(prev => (prev !== generatedPhotoURL ? generatedPhotoURL : prev));
          } catch (error) {
              console.error("Error fetching place photo:", error);
              setPhotoURL('./placeholder.jpg');
          }
      };
  
  
  return (
    <Link
    to={"/view-trip/" + trip.id}
    target="_blank">
       <div className='hover:scale-105 transition-all'>
      <img src={photoURL ? photoURL : '/placeholder.jpg'} 
      className='rounded-xl h-[180px] w-full object-cover'/>
      <div>
        {/* <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2> */}
        <h2 className='font-bold text-lg'>{trip?.userSelection?.region + ', ' + trip?.userSelection?.country}</h2>
        <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} Budget</h2>
      </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem
