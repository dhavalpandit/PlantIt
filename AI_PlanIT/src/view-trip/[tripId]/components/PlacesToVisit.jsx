import React from 'react'
import PlaceCarditem from './PlaceCarditem';

function PlacesToVisit({trip}) {
    //console.log(trip.tripData?.travelPlan?.itinerary);
    return (    
    <div>
      <h2 className='font-bold text-lg mt-5 '>Places to Visit</h2>
      <div>
        {trip.tripData?.tripData?.itinerary.map((item,index)=>(
            <div className='mt-5'>
                <h2 className='font-bold text-large'>Day {item.day}</h2>
                <div className='grid md:grid-cols-2 gap-5'>
                {item.plan.map((place,index)=>(
                    <div className='my-3'>
                        <h2 className='font-medium text-sm text-orange-600'>🕰️ {place.timeTravel}, best visited in the {place.bestTime}.</h2>
                        <PlaceCarditem place={place}/>
                    </div>
                ))}
            </div>
           </div>     
        ))}
      </div>
    </div>
  )
}

export default PlacesToVisit
