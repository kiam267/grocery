'use client';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { MapPin, MapPinNew } from '../icons/map-pin';

function GetLocation() {
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
  const [loading, setLoading] = useState(true);
  const [notfound, setNotFound] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
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
                });
              });
          },

          // if the user is not allowed the location then work this way
          (error) => {
            fetch('https://ipapi.co/json')
              .then((response) => response.json())
              .then((data) => {
                console.log(data, 'ipapi api');
                setLocation((pre) => {
                  return {
                    ...pre,
                    city: data.city,
                    country: data.country_name,
                  };
                });
              });
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          },
        );
      } else {
        setNotFound(true);
      }
    } catch (error) {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <div className="font-bold">Loading...</div>;
  }

  if (notfound || location.city === null) {
    return (
      <span className="flex items-center gap-1 text-base text-accent">
        <MapPinNew className="w-4 h-4 " />
        <p className="font-bold">not found</p>
      </span>
    );
  }
  return (
    <div>
      <span className="flex items-center gap-1 text-base text-accent">
        <MapPinNew className="w-4 h-4 " />
        <p className="font-bold ">
          <span> {location.city}</span>
          <span className="hidden md:inline">, {location.country}</span>
        </p>
      </span>
    </div>
  );
}

export default GetLocation;
