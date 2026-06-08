import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CreateTrip from './create-trip/index'
import { createBrowserRouter, Router } from 'react-router-dom'
import { RouterProvider } from 'react-router'
import Header from './components/custom/header'
import { Toaster } from './components/ui/sonner'
import Viewtrip from './view-trip/[tripId]/index'
import { GoogleOAuthProvider } from '@react-oauth/google';
import MyTrips from './my-trips'
import UserProfile from './user-profile/UserProfile';

const router = createBrowserRouter([
{
  path:'/',
  element: <App/>
},
{
  path:'/create-trip',
  element: <CreateTrip/>
},
{
  path:'/view-trip/:tripId',
  element: <Viewtrip/>
},
{
  path:'/my-trips',
  element: <MyTrips/>
},
{
  path:'/user-profile',
  element: <UserProfile/>
}
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Header/>
    <Toaster/>
    <RouterProvider router={router}/>
    </GoogleOAuthProvider>
  </StrictMode>,
)
