import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";
import { AI_PROMT, SelectBudgetOptions, SelectTravelersList } from '@/contants/option';
import React, { useEffect, useState } from 'react';
import { chatSession } from '@/service/AIModal';
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { addDays, format, differenceInCalendarDays } from "date-fns";

function createTrip() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dateRange, setDateRange] = useState({ from: undefined, to: undefined });

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    // Default to 5-day range if nothing is selected
    if (!dateRange.from && !dateRange.to) {
      const today = new Date();
      const future = addDays(today, 4);
      setDateRange({ from: today, to: future });
    }
  }, []);

  useEffect(() => {
    if (dateRange.from && dateRange.to) {
      const days = differenceInCalendarDays(dateRange.to, dateRange.from) + 1;
      handleInputChange("noOfDays", days);
    }
  }, [dateRange]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  });

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();

    let parsedTripData = {};
    try {
      const jsonStart = TripData.indexOf('{');
      const jsonEnd = TripData.lastIndexOf('}');
      const rawJson = TripData.substring(jsonStart, jsonEnd + 1);
      parsedTripData = JSON.parse(rawJson);
    } catch (error) {
      console.error("Failed to parse AI trip data:", error);
      toast("Error: Unable to parse AI response. Please try again.");
      setLoading(false);
      return;
    }

    await setDoc(doc(db, "AITrips", docId), {
      id: docId,
      userSelection: formData,
      tripData: parsedTripData,
      userEmail: user?.email
    });

    setLoading(false);
    navigate('/view-trip/' + docId);
  };

  const OnGenerateTrip = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!formData?.country || !formData?.region || !formData?.budget || !formData?.traveler || !formData?.adventureType || !formData?.noOfDays) {
      toast("Please fill all details");
      return;
    }

    if (formData?.noOfDays > 5) {
      toast("Please keep trip length to 5 days or less");
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMT
      .replace('{country}', formData?.country)
      .replace('{region}', formData?.region)
      .replace('{noOfDays}', formData?.noOfDays)
      .replace('{budget}', formData?.budget)
      .replace('{traveler}', formData?.traveler)
      .replace('{userEmail}', user.email)
      .replace('{travelerCount}', parseInt(formData?.traveler.match(/\d+/)?.[0] || "1"))
      .replace('{adventureType}', formData?.adventureType)
      .replace('{fromDate}', format(dateRange.from, 'yyyy-MM-dd'))
      .replace('{toDate}', format(dateRange.to, 'yyyy-MM-dd'))


    const result = await chatSession.sendMessage(FINAL_PROMPT);
    const rawText = await result?.response?.text();
    console.log("Gemini response:", rawText);
    setLoading(false);

    SaveAiTrip(rawText);
  };

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json'
      }
    }).then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      OnGenerateTrip();
    });
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>What's your travel preference 🏕️🌴</h2>
      <p className='mt-3 text-gray-500'>Provide some basic information and our AI will generate a custom trip tailored just for you!</p>

      <div className='mt-15 flex flex-col gap-9'>

        <div>
          <h2 className='text-xl my-3 font-medium'>Which country are you planning to visit?</h2>
          <Input placeholder="E.g., Japan" onChange={(e) => handleInputChange('country', e.target.value)} />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>Which region or state in that country?</h2>
          <Input placeholder="E.g., Kyoto" onChange={(e) => handleInputChange('region', e.target.value)} />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>Select your trip date range</h2>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                {dateRange.from && dateRange.to
                  ? `${format(dateRange.from, "MMM dd, yyyy")} - ${format(dateRange.to, "MMM dd, yyyy")}`
                  : "Pick a date range"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>What is your Budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                ${formData?.budget === item.title && 'shadow-lg border-black'}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>Who do you plan traveling with on your next adventure?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelersList.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                ${formData?.traveler === item.people && 'shadow-lg border-black'}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>What type of adventure are you looking for?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {['Fun', 'Thrill', 'Relaxing', 'Romantic', 'Adventurous'].map((type, index) => (
              <div key={index}
                onClick={() => handleInputChange('adventureType', type)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg 
                ${formData?.adventureType === type && 'shadow-lg border-black'}`}>
                <h2 className='font-bold text-lg'>{type}</h2>
                <p className='text-sm text-gray-500'>Experience {type.toLowerCase()} moments</p>
              </div>
            ))}
          </div>
        </div>

        <div className='my-10 justify-end flex'>
          <Button disabled={loading} onClick={OnGenerateTrip}>
            {loading ? <AiOutlineLoading className='h-7 w-7 animate-spin' /> : 'Generate Trip'}
          </Button>
        </div>

        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="/logo.svg" />
                <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
                <p>Sign in to the App with Google authentication securely</p>
                <Button onClick={login} className="w-full mt-5 flex gap-4 items-center">
                  <FcGoogle className='h-7 w-7' />
                  Sign In With Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
}

export default createTrip;


