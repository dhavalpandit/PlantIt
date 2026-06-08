import React, { useEffect, useState } from 'react';

function UserProfile() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserData(user || {});
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <div className="flex flex-col items-center gap-4">
        {userData.picture && (
          <img
            src={userData.picture}
            alt="Profile"
            className="h-24 w-24 rounded-full border"
          />
        )}
        <h2 className="text-2xl font-bold">👤 My Profile</h2>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-sm text-gray-500">Name</label>
          <p className="font-medium text-lg">{userData.name}</p>
        </div>

        <div>
          <label className="block text-sm text-gray-500">Email</label>
          <p className="font-medium text-lg">{userData.email}</p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
