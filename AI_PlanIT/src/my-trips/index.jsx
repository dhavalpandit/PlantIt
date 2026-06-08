import { db } from '@/service/firebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import UserTripCardItem from './components/UserTripCardItem';

const MyTrips = () => {
    const navigate = useNavigate(); 
    const [userTrips, setUserTrips] = useState([]);

    useEffect(() => {
        const fetchUserTrips = async () => {
            const userData = localStorage.getItem('user');
            if (!userData) {
                navigate('/');
                return;
            }

            const user = JSON.parse(userData);
            console.log("user is " + user.email);

            try {
                const q = query(
                    collection(db, 'AITrips'),
                    where('userEmail', '==', user.email)
                );
                const querySnapshot = await getDocs(q);
                const trips = querySnapshot.docs.map(doc => doc.data());
                setUserTrips(trips);
            } catch (error) {
                console.error("Error fetching trips: ", error);
            }
        };

        fetchUserTrips();
    }, [navigate]);

    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>My Trips</h2>
            <div className='mt-5 grid grid-col-2 md:grid-cols-3 gap-5'>
                {userTrips?.length > 0?userTrips.map((trip, index) => (
                    <UserTripCardItem key={index} trip={trip}/>
                ))
                 :
                 [1,2,3,4,5,6].map((item,index)=>(
                    <div key={index} className='h-[250px] w-full bg-slate-200 animate-pulse rounded-xl'>

                    </div>
                 ))
            }
            </div>
        </div>
    );
};

export default MyTrips;
