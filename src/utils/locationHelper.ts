import { Platform, PermissionsAndroid } from 'react-native';
import axios from 'axios';
import { GOOGLE_API_KEY } from '../config/api';
import Geolocation from 'react-native-geolocation-service';

// Request permissions
export const requestLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'App needs access to your location.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }else{
     Geolocation.requestAuthorization('whenInUse');
  }
  // iOS handles internally via requestAuthorization
  return true;
};

// =====================================================
// Request foreground + background location permissions
// =====================================================


export const requestLocationWithBackgroundPermission = async (): Promise<boolean> => {
  if (Platform.OS === "android") {
    // Foreground permission
    const fine = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "App needs access to your location.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );

    if (fine !== PermissionsAndroid.RESULTS.GRANTED) return false;

    // Background permission
    const background = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      {
        title: "Background Location Permission",
        message: "App needs access to your location in the background.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );

    return background === PermissionsAndroid.RESULTS.GRANTED;
  } else {
    // iOS: request both WhenInUse and Always
    const whenInUse = await Geolocation.requestAuthorization("whenInUse");
    if (whenInUse !== "granted") return false;

    const always = await Geolocation.requestAuthorization("always");
    return always === "granted";
  }
};

// Get current coordinates
// export const getCurrentLocation = (): Promise<{ latitude: number; longitude: number }> => {
//   return new Promise((resolve, reject) => {
//     Geolocation.getCurrentPosition(
//       position => {
//         resolve({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         });
//       },
//       error => reject(error),
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
//     );
//   });
// };
// export const getCurrentLocation = async (): Promise<{ latitude: number; longitude: number }> => {
//   const hasPermission = await requestLocationPermission();
//   if (!hasPermission) {
//     throw new Error('Location permission not granted');
//   }

//   return new Promise((resolve, reject) => {
//     Geolocation.getCurrentPosition(
//       position => {
//         // resolve({
//         //   latitude: position?.coords?.latitude,
//         //   longitude: position?.coords?.longitude,
//         // });
//         resolve({
//           latitude: 17.8881,
//           longitude: 78.4744,
//         });
//       },
//       error => {
//         console.log('Location error:', error);
//         reject(error);
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 15000,
//         maximumAge: 10000,
//         // forceRequestLocation: true,
//         // showLocationDialog: true,
//       }
//     );
//   });
// };

 export const getCurrentLocation = async (): Promise<{ latitude: number; longitude: number }> => {    

   return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
            (position) => {
              console.log('Geolocation ',position)
                const { latitude, longitude } = position.coords;
                      resolve({
          latitude: latitude,
          longitude:longitude,
        });
            },
            (error) => {
                console.log(error.code, error.message);
                reject(error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
         });
    };

export const reverseGeocodeGoogle = async (lat: number, lng: number) => {
  const key = GOOGLE_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`;
    // console.log('reverseGeocode url ',url )

  const res = await axios.get(url);
      // console.log('reverseGeocode res ',res )

  if (res?.data?.status === 'OK') {
    const comp: any = {};
    res?.data?.results[0].address_components.forEach((c: any) => {
      const types = c.types;
      if (types.includes('postal_code')) comp.pincode = c.long_name;
      if (types.includes('locality')) comp.city = c.long_name;
      if (types.includes('administrative_area_level_2')) comp.district = c.long_name;
      if (types.includes('administrative_area_level_1')) comp.state = c.long_name;
      if (types.includes('country')) comp.country = c.long_name;
    });
    return { fullAddress: res?.data?.results[0].formatted_address, ...comp, latitude: lat, longitude: lng };
  }
  throw new Error('Geocode failed');
};
export const cleanString = (input?: string | null): string => {
  if (!input) return '';

  // Split on hyphen (-), en dash (–), or underscore (_)
  return input.split(/[-–_]/)[0].trim();
};


export const reverseGeocode = async (lat: number, lng: number) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`;
 console.log('reverseGeocode url ',url )
  try{
  const res = await axios.get(url, {
    headers: {
      'User-Agent': 'AtumAnalytcs/1.0 abc@gmail.in', // Required by Nominatim
    },
  });
//  console.log('reverseGeocode res ',res )
  const data = res.data;

  if (!data || !data?.address) {
    if(lat && lng){
      return {
          fullAddress: '',
          city:  '',
          district: '',
          state: '',
          country: '',
          pincode:  '',
          latitude: lat,
          longitude: lng,
        };
    }else {
      throw new Error('Failed reverse geocode');
    }
    
    // throw new Error('Failed reverse geocode');
  }

  const address = data?.address;
const rawDistrict = address?.state_district;
const district = cleanString(rawDistrict) || '';
//  console.log('reverseGeocode district ',district )

  return {
    fullAddress: data.display_name||'',
    city: address.city || address.town || address.village || address.state_district|| '',
    district:district || '',
    state: address.state || '',
    country: address.country || '',
    pincode: address.postcode || '',
    latitude: lat,
    longitude: lng,
  };
}catch (error:any){
   return {
          fullAddress: '',
          city:  '',
          district: '',
          state: '',
          country: '',
          pincode:  '',
          latitude: lat,
          longitude: lng,
        };
}
};

export const fetchAndSetCurrentLocation = async (setFieldValue: any) => {
  const granted = await requestLocationPermission();
  if (!granted) throw new Error('Permission denied');

  const loc = await getCurrentLocation();
  // console.log('fetchAndSetCurrentLocation loc ',loc )
  const info = await reverseGeocode(loc.latitude, loc.longitude);
  // console.log('fetchAndSetCurrentLocation loc ',info )

  setFieldValue('street', info?.fullAddress ? info?.fullAddress?.slice(0, 80):'');
  setFieldValue('city', info.city || '');
  setFieldValue('district', info.district || '');
  setFieldValue('state', info.state || '');
  setFieldValue('country', info.country || 'India');
  setFieldValue('pincode', info.pincode || '');
  setFieldValue('latitude', info.latitude);
  setFieldValue('longitude', info.longitude);

  return info;
};
export const fetchAndgetCurrentLocation = async () => {
  const granted = await requestLocationPermission();
  if (!granted) throw new Error('Permission denied');

  const loc = await getCurrentLocation();
  // console.log('fetchAndSetCurrentLocation loc ',loc )
  const info = await reverseGeocode(loc.latitude, loc.longitude);
  // console.log('fetchAndSetCurrentLocation loc ',info )
  return info;
};

export const getAddressFromPincode = async (pincode: string) => {
  const url = `https://api.postalpincode.in/pincode/${pincode}`;

  const res = await axios.get(url);
  // console.log('getAddressFromPincode res', res);

  const data = res.data;

  if (!data || data[0]?.Status !== 'Success' || !data[0]?.PostOffice || data[0]?.PostOffice?.length === 0) {
    throw new Error('Invalid or not found pincode');
  }

  const info = data[0].PostOffice[0];

  return {
    fullAddress: info?.Name ? `${info.Name.slice(0, 80)}` : '',
    city: info.Block || '',
    district: info.District || '',
    state: info.State || '',
    country: info.Country || 'India',
    pincode: info.Pincode || '',
  };
};

export const fetchAndSetAddressFromPincode = async (pincode: string, setFieldValue: any,  currentValues: { [key: string]: any }
) => {
  const info = await getAddressFromPincode(pincode);
 if (!currentValues.street && info.fullAddress) {
    setFieldValue('street', info.fullAddress);
  }

  setFieldValue('city', info.city || '');
  setFieldValue('district', info.district || '');
  setFieldValue('state', info.state || '');
  setFieldValue('country', info.country || 'India');
  setFieldValue('pincode', info.pincode || '');

  return info;
};
