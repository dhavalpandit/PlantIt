import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { GetPlaceDetails } from '@/service/GlobalAPi';
import { PHOTO_REF_URL } from '@/service/GlobalAPi';

function HotelCardItem({hotel}) {
  const [photoURL, setPhotoURL] = useState('/placeholder.jpg');
  
      useEffect(() => {
          hotel && GetPlacePhoto();
      }, [hotel]);
  
      const GetPlacePhoto = async () => {
          const data = {
              textQuery: hotel?.hotelName
          }
          const result = await GetPlaceDetails(data).then(resp => {
              if (resp.data.places?.[0]?.photos?.[3]?.name) {
                  const generatedPhotoURL = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
                  console.log("Generated Photo URL:", generatedPhotoURL);
                  
                  setPhotoURL(prev => {
                      if (prev !== generatedPhotoURL) {
                          return generatedPhotoURL;
                      }
                      return prev;
                  });
              }
          });
      };

  return (
    <div>
      <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel.hotelName} target='_blank'>
            <div className='hover:scale-105 transition-all cursor-pointer'>
            <img src={photoURL ? photoURL : '/placeholder.jpg'} className="rounded-xl h-[180px] w-full object-cover"/>
                <div className='my-2 flex flex-col gap-2'>
                    <h2 className='font-medium'>{hotel.hotelName}</h2>
                    <h2 className='text-xs text-gray-500'>📍 {hotel.hotelAddress}</h2>
                    <h2 className='text-sm'>💰 {hotel.price}</h2>
                    <h2 className='text-sm'>⭐ {hotel.rating}</h2>
                </div>
            </div>
            </Link>
    </div>
  )
}

export default HotelCardItem
