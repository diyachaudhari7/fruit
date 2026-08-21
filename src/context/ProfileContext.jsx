import React, { createContext, useContext, useState, useEffect } from 'react';

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [accountSettings, setAccountSettings] = useState(() => {
    const saved = localStorage.getItem('fruit_profile_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse profile settings');
      }
    }
    return {
      firstName: 'Alex',
      lastName: 'Johnson',
      email: 'alex.johnson@example.com',
      phone: '+1 234 567 8900',
      orderUpdates: true,
      promotions: true,
    };
  });

  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem('fruit_profile_image') || null;
  });

  useEffect(() => {
    localStorage.setItem('fruit_profile_settings', JSON.stringify(accountSettings));
  }, [accountSettings]);

  useEffect(() => {
    if (profileImage) {
      localStorage.setItem('fruit_profile_image', profileImage);
    } else {
      localStorage.removeItem('fruit_profile_image');
    }
  }, [profileImage]);

  return (
    <ProfileContext.Provider value={{ accountSettings, setAccountSettings, profileImage, setProfileImage }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
