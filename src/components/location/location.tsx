'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Location() {
  const [city, setCity] = useState<string>('');
  useEffect(() => {
    axios
      .get(
        `https://ipgeolocation.abstractapi.com/v1/?api_key=${'a36a4994e3564ebda59bf8ba8cb24a86'}&ip_address=`,
      )
      .then((response) => {
        console.log(response.data);

        setCity(response.data?.city);
      })
      .catch((error) => {
        setCity('error');
      });
  }, []);

  return (
    <div>
      {
        city === 'error' && city === null
        ? 'Location information could not be retrieved'
        : `You are currently in ${city}`}
    </div>
  );
}

export default Location;
