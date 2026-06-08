import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

// ...imports stay the same

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  });

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json'
      }
    }).then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      window.location.reload();
    });
  };

  return (
    <div className='p-2 shadow-sm flex justify-between items-center px-5' id="header">
      <a href="/"><img src="/plan_It_logo.png" width="150" height="150" alt="PlanIT Logo" /></a>

      <div>
        {user ? (
          <div className='flex items-center gap-3'>
            <a href='/create-trip'>
              <Button id="create-trip-button" variant="outline" className='rounded-full'>+ Create Trip</Button>
            </a>
            <a href='/my-trips'>
              <Button id="my-trips-button" variant="outline" className='rounded-full'>My Trips</Button>
            </a>

            <Popover>
              <PopoverTrigger>
                <img
                  id="user-avatar"
                  src={user?.picture}
                  className='h-[35px] w-[35px] rounded-full cursor-pointer'
                />
              </PopoverTrigger>
              <PopoverContent className="w-48">
                <div className="space-y-2">
                  <a id="view-profile-link" href="/user-profile" className="block text-sm hover:underline">👤 View Profile</a>
                  <p
                    id="logout-button"
                    onClick={() => {
                      googleLogout();
                      localStorage.clear();
                      window.location.href = '/';
                    }}
                    className="cursor-pointer text-sm text-red-600 hover:underline"
                  >
                    🚪 Logout
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button id="sign-in-button" onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
            <img src="/plan_It_logo.png" width="150" height="150" alt="PlanIT Logo" />
              <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
              <p>Sign in to the App with Google authentication securely</p>
              <Button
                id="google-login-button"
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className='h-7 w-7' />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;


