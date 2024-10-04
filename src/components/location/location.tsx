'use client';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { MapPin, MapPinNew, MapPinSlash } from '../icons/map-pin';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useLocationBaseSearch } from '@/lib/use-location';


function GetLocation() {
  const { location, loading, notfound } = useLocationBaseSearch();

  if (loading) {
    return <div className="font-bold">Loading...</div>;
  }

  if (notfound || location.city === (null || undefined)) {
    return (
      <span className={` flex items-center gap-1 text-base text-accent `}>
        <MapPinSlash className="w-4 h-4 " />
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
