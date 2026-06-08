export const SelectTravelersList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A sole traveler in exploration',
        icon: '✈️', 
        people: '1 person',
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Two travelers in tandem',
        icon: '🥂',
        people: '2 people',
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group of fun-loving adventurers',
        icon: '👪',
        people: '3 to 5 people',
    },
    {
        id: 4,
        title: 'Group',
        desc: 'A bunch of thrill-seekers',
        icon: '🛥️',
        people: '5 to 10 people',
    }
];

export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:'💸',
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon:'💰',
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont worry about cost',
        icon:'🪙',
    }
]

export const AI_PROMT = `You are a travel planning assistant. Your task is to generate a strictly formatted JSON response only.

Return ONLY a valid JSON object with the following exact structure, no explanation, no markdown, and no extra text.

Ensure all keys are present and follow this schema strictly:

{
  "id": "1743889718761",
  "userEmail": "{userEmail}",
  "location": "{country}, {region}",
  "travelerCount": {travelerCount},
  "tripData": {
    "budget": "{budget}",
    "duration": "{noOfDays} Days",
    "dateRange": {
      "from": "{fromDate}",
      "to": "{toDate}"
    },
    "weatherForecast": [
      {
        "date": "YYYY-MM-DD",
        "condition": "...",
        "temperature": "...",
        "icon": "☀️"
      }
    ],
    "hotels": [
      {
        "hotelName": "...",
        "hotelAddress": "...",
        "hotelImageUrl": "...",
        "description": "...",
        "price": "...",
        "rating": "...",
        "geoCoordinates": {
          "latitude": ...,
          "longitude": ...
        }
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "plan": [
          {
            "placeName": "...",
            "placeDetails": "...",
            "placeImageUrl": "...",
            "ticketPricing": "...",
            "bestTime": "...",
            "timeTravel": "...",
            "geoCoordinates": {
              "latitude": ...,
              "longitude": ...
            }
          }
        ]
      }
    ]
  },
  "userSelection": {
    "budget": "{budget}",
    "country": "{country}",
    "region": "{region}",
    "noOfDays": "{noOfDays}",
    "traveler": "{traveler}",
    "adventureType": "{adventureType}"
  }
}

All values must match the provided inputs:
- {country}: user's selected country (e.g., Japan)
- {region}: region or state within the selected country (e.g., Kyoto)
- {budget}: user's budget choice
- {noOfDays}: total number of trip days
- {traveler}: user's traveler type (e.g., "1 person")
- {userEmail}: email from the user object
- {travelerCount}: number of travelers as a number (e.g., 1, 2)
- {adventureType}: type of trip experience (e.g., Fun, Thrill, Relaxing)
- {fromDate}: trip start date in YYYY-MM-DD format
- {toDate}: trip end date in YYYY-MM-DD format

Rules:
- Output ONLY JSON.
- No markdown formatting.
- No comments.
- Escape all special characters.
- All string values must be in double quotes.
- Do not use trailing commas.
- The itinerary array must contain exactly {noOfDays} entries, one per day.
- Each day should have a unique "day" field (starting from 1) and a non-empty "plan" array with at least 3 places.
- The "hotels" array must contain at least 3 distinct hotel options, each with accurate details.
- The "weatherForecast" array must contain one object per day between from and to dates.`;


