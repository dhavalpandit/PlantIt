import { Button } from '@/components/ui/button'
import { GetPlaceDetails } from '@/service/GlobalAPi';
import { PHOTO_REF_URL } from '@/service/GlobalAPi';
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";

//const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY

function InfoSection({ trip }) {
    const [photoURL, setPhotoURL] = useState('/placeholder.jpg');

    useEffect(() => {
        trip && GetPlacePhoto();
    }, [trip]);

    // const GetPlacePhoto = async () => {
    //     const data = {
    //         textQuery: trip?.userSelection?.location?.label
    //     };
        
    //     try {
    //         const result = await GetPlaceDetails(data);
    //         const photoName = result?.data?.places?.[0]?.photos?.[3]?.name;
            
    //         const generatedPhotoURL = photoName 
    //             ? PHOTO_REF_URL.replace('{NAME}', photoName) 
    //             : './placeholder.jpg';
    
    //         console.log("Generated Photo URL:", generatedPhotoURL);
    
    //         setPhotoURL(prev => (prev !== generatedPhotoURL ? generatedPhotoURL : prev));
    //     } catch (error) {
    //         console.error("Error fetching place photo:", error);
    //         setPhotoURL('./placeholder.jpg'); // Fallback in case of API failure
    //     }
    // };
    
    const GetPlacePhoto = async () => {
        const data = {
            // textQuery: trip?.userSelection?.location?.label
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
        <div>
            <img src={photoURL ? photoURL : '/placeholder.jpg'} className='h-[340px] w-full object-cover rounded' />

            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>
                        {trip?.userSelection?.location?.label}
                        <div className='flex gap-5 mt-5'>
                            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📅 {trip.userSelection?.noOfDays} Day</h2>
                            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💰 {trip.userSelection?.budget} Budget</h2>
                            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>👪 No. of Traveler: {trip.userSelection?.noOfDays} people</h2>
                        </div>
                    </h2>
                </div>
                
            </div>
        </div>
    )
}

export default InfoSection;
