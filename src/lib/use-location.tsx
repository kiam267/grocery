import { GoogleMapLocation, MapPin } from '@/types';
import { useJsApiLoader } from '@react-google-maps/api';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const locationAtom = atom<GoogleMapLocation | null>(null);

const libraries: any = ['places'];

interface Component {
  long_name: string;
  short_name: string;
  types: string[];
}

export const fullAddressAtom = atom((get) => {
  const location = get(locationAtom);
  return location
    ? `${location.street_address}, ${location.city}, ${location.state}, ${location.zip}, ${location.country}`
    : '';
});

function getLocation(placeOrResult: any) {
  // Declare the location variable with the Location interface
  const location: GoogleMapLocation = {
    lat: placeOrResult?.geometry?.location.lat(),
    lng: placeOrResult?.geometry?.location.lng(),
    formattedAddress: placeOrResult.formatted_address,
  };

  // Define an object that maps component types to location properties
  const componentMap: Record<string, keyof GoogleMapLocation> = {
    postal_code: 'zip',
    postal_code_suffix: 'zip',
    state_name: 'street_address',
    route: 'street_address',
    sublocality_level_1: 'street_address',
    locality: 'city',
    administrative_area_level_1: 'state',
    country: 'country',
  };

  for (const component of placeOrResult?.address_components as Component[]) {
    const [componentType] = component.types;
    const { long_name, short_name } = component;

    // Check if the component type is in the map
    if (componentMap[componentType]) {
      // Assign the component value to the location property
      location[componentMap[componentType]] ??= long_name;
      // If the component type is postal_code_suffix, append it to the zip
      componentType === 'postal_code_suffix'
        ? (location['zip'] = `${location?.zip}-${long_name}`)
        : null;
      // If the component type is administrative_area_level_1, use the short name
      componentType === 'administrative_area_level_1'
        ? (location['state'] = short_name)
        : null;
    }
  }
  // Return the location object
  return location;
}

interface UseLocationProps {
  onChange?: any;
  onChangeCurrentLocation?: any;
  setInputValue?: any;
}

export default function useLocation({
  onChange,
  onChangeCurrentLocation,
  setInputValue,
}: UseLocationProps) {
  const { t } = useTranslation();
  const [autocomplete, setAutocomplete] = useState<any>(null);
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google_map_autocomplete',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
    libraries,
  });

  const onLoad = useCallback((autocompleteInstance: any) => {
    setAutocomplete(autocompleteInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setAutocomplete(true);
  }, []);

  const onPlaceChanged = () => {
    const place = autocomplete?.getPlace();

    if (!place?.geometry?.location ?? true) {
      return;
    }
    const location = getLocation(place);

    if (onChange) {
      onChange(location);
    }

    if (setInputValue) {
      setInputValue(place?.formatted_address);
    }
  };

  const getCurrentLocation = () => {
    if (navigator?.geolocation) {
      navigator?.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const geocoder = new google.maps.Geocoder();
          const latlng = { lat: latitude, lng: longitude };

          geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === 'OK' && results?.[0]) {
              const location = getLocation(results?.[0]);
              onChangeCurrentLocation?.(location);
            }
          });
        },
        (error) => {
          console.error('Error getting current location:', error);
        },
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return [
    onLoad,
    onUnmount,
    onPlaceChanged,
    getCurrentLocation,
    isLoaded,
    loadError && t(loadError),
  ];
}

// interface MapPin {
//   lat: null | number;
//   lon: null | number;
//   city: string;
//   country: string;
// }

export function useLocationBaseSearch() {
  const [location, setLocation] = useState<MapPin>({
    lat: null,
    lon: null,
    city: '',
    country: '',
  });
  const [loading, setLoading] = useState(true);
  const [notfound, setNotFound] = useState(false);

  const setCurrentLocation = useCallback(() => {
    setLoading(true);

    // Check if geolocation is available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Fetch city and country information using reverse geocoding
          fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
          )
            .then((response) => response.json())
            .then((data) => {
              setLocation({
                lat: latitude,
                lon: longitude,
                city: data.city,
                country: data.countryName,
              });
            });
        },
        (error) => {
          // Handle error or user rejection of location access
          fetch(
            'https://ipgeolocation.abstractapi.com/v1/?api_key=a36a4994e3564ebda59bf8ba8cb24a86&ip_address=',
          )
            .then((response) => response.json())

            .then((data) => {
              console.log(data);

              setLocation({
                lat: null,
                lon: null,
                city: data.city,
                country: '',
              });
            })
            .catch(() => {
              setNotFound(true);
            });
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
      );
    } else {
      setNotFound(true);
    }

    setLoading(false);
  }, []); // Empty array ensures the function doesn't get re-created

  // Use effect to call the function once when the hook is used
  useEffect(() => {
    setCurrentLocation();
  }, []);

  // This will return the current location, loading status, and not found status
  return { location, loading, notfound };
}
