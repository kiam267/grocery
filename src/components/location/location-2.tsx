import React, { useEffect, useState } from 'react';

function LocationComponent() {
  const [location, setLocation] = useState<{
    lat: null | number;
    lon: null | number;
    city: string;
    country: string;
  }>({
    lat: null,
    lon: null,
    city: '',
    country: '',
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Use the accurate location from Geolocation API
          fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
          )
            .then((response) => response.json())
            .then((data) => {
              setLocation((pre) => {
                return {
                 ...pre,
                  lat: latitude,
                  lon: longitude,
                  city: data.city,
                  country: data.countryName,
                };
              })
              console.log(`City: ${data.city}, Country: ${data.countryName}`);
            });
        },
        
        (error) => {
          // If user denies permission or there's an error, fallback to IP-based geolocation
          fetch('https://ipapi.co/json')
            .then((response) => response.json())
            .then((data) => {
              console.log(
                `IP-based location: City: ${data.city}, Country: ${data.country_name}`,
              );
            });
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        },
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div>
      <h1>Your Location</h1>
      <p>City: {location.city}</p>
      <p>Country: {location.country}</p>
    </div>
  );
}

export default LocationComponent;
