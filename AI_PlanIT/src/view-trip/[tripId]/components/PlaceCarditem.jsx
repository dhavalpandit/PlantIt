import { Button } from "@/components/ui/button";
import React from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react'
import { GetPlaceDetails } from '@/service/GlobalAPi';
import { PHOTO_REF_URL } from '@/service/GlobalAPi';

function PlaceCarditem({place}) {
  const [photoURL, setPhotoURL] = useState("/placeholder.jpg");

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place.placeName,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      if (resp.data.places?.[0]?.photos?.[3]?.name) {
        const generatedPhotoURL = PHOTO_REF_URL.replace(
          "{NAME}",
          resp.data.places[0].photos[3].name
        );
        console.log("Generated Photo URL:", generatedPhotoURL);

        setPhotoURL((prev) => {
          if (prev !== generatedPhotoURL) {
            return generatedPhotoURL;
          }
          return prev;
        });
      }
    });
  };

  return (
    <Link
      to={"https://www.google.com/maps/search/?api=1&query=" + place.placeName}
      target="_blank"
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
      <img src={photoURL ? photoURL : '/placeholder.jpg'} className="rounded-xl h-[180px] w-full object-cover"/>
        <div>
          <h2 className="font-bold text-lg">{place.placeName}</h2>
          <p className="text-sm text-gray-600">{place.placeDetails}</p>
          <h2 className="mt-2">🎫 {place.ticketPricing}</h2>
          {/* <Button size='sm'><FaMapLocationDot /></Button> */}
        </div>
      </div>
    </Link>
  );
}

export default PlaceCarditem;
