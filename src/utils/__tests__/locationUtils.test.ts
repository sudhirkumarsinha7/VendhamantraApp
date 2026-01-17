import {
  requestLocationPermission,
  getCurrentLocation,
  reverseGeocodeGoogle,
  reverseGeocode,
  fetchAndSetCurrentLocation,
  getAddressFromPincode,
  fetchAndSetAddressFromPincode,
  cleanString,
} from '../locationHelper';
import Geolocation from 'react-native-geolocation-service';

import { PermissionsAndroid, Platform } from 'react-native';
import axios from 'axios';

jest.mock('react-native-config', () => ({
  API_URL: 'https://mock-api-url.com',
}));

jest.mock('react-native-geolocation-service', () => ({
  getCurrentPosition: jest.fn(),
}));

jest.mock('react-native', () => ({
  Platform: { OS: 'android' },
  PermissionsAndroid: {
    request: jest.fn(),
    PERMISSIONS: { ACCESS_FINE_LOCATION: 'ACCESS_FINE_LOCATION' },
    RESULTS: { GRANTED: 'granted' },
  },
}));

jest.mock('axios');

describe('Location Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ---------------------------
  describe('requestLocationPermission', () => {
    it('grants permission on Android', async () => {
      PermissionsAndroid.request.mockResolvedValue('granted');
      const result = await requestLocationPermission();
      expect(result).toBe(true);
    });

   it('returns true on iOS without requesting permission', async () => {
    Platform.OS = 'ios';
    Geolocation.requestAuthorization = jest.fn();

    const result = await requestLocationPermission();

    expect(Geolocation.requestAuthorization).toHaveBeenCalledWith('whenInUse');
    expect(result).toBe(true);
  });
  });

  // ---------------------------
  describe('getCurrentLocation', () => {
    it('resolves with coordinates', async () => {
      const coords = { latitude: 12.34, longitude: 56.78 };
      Geolocation.getCurrentPosition.mockImplementation(success => {
        success({ coords });
      });

      const result = await getCurrentLocation();
      expect(result).toEqual(coords);
    });

    it('rejects on error', async () => {
      Geolocation.getCurrentPosition.mockImplementation((_, error) => {
        error(new Error('Location error'));
      });

      await expect(getCurrentLocation()).rejects.toThrow('Location error');
    });
  });

  // ---------------------------
  describe('cleanString', () => {
    it.each([
      ['Medchal–Malkajgiri', 'Medchal'],
      ['Hyderabad-Urban', 'Hyderabad'],
      ['Test_District', 'Test'],
      ['PlainDistrict', 'PlainDistrict'],
      [null, ''],
      [undefined, ''],
    ])('cleans "%s" to "%s"', (input, expected) => {
      expect(cleanString(input as any)).toBe(expected);
    });
  });

  // ---------------------------
  describe('reverseGeocode', () => {
    it('uses town or village or state_district if city is missing', async () => {
      axios.get.mockResolvedValue({
        data: {
          display_name: '',
          address: {
            town: 'AltTown',
            state_district: 'AltDistrict–Name',
            state: 'SomeState',
            country: 'India',
            postcode: '123456',
          },
        },
      });

      const result = await reverseGeocode(9.99, 8.88);

      expect(result.city).toBe('AltTown');
      expect(result.district).toBe('AltDistrict');
      expect(result.fullAddress).toBe('');
    });

    it('parses OpenStreetMap response and cleans district', async () => {
      axios.get.mockResolvedValue({
        data: {
          display_name: 'Full Address Example',
          address: {
            city: 'Hyderabad',
            state_district: 'Medchal–Malkajgiri',
            state: 'Telangana',
            country: 'India',
            postcode: '500001',
          },
        },
      });

      const result = await reverseGeocode(12.34, 56.78);

      expect(result).toEqual({
        fullAddress: 'Full Address Example',
        city: 'Hyderabad',
        district: 'Medchal',
        state: 'Telangana',
        country: 'India',
        pincode: '500001',
        latitude: 12.34,
        longitude: 56.78,
      });
    });

   
  });

  // ---------------------------
  describe('reverseGeocodeGoogle', () => {
    it('parses Google Geocode API response', async () => {
      axios.get.mockResolvedValue({
        data: {
          status: 'OK',
          results: [
            {
              formatted_address: 'Google Address',
              address_components: [
                { long_name: '500001', types: ['postal_code'] },
                { long_name: 'Hyderabad', types: ['locality'] },
                { long_name: 'Medchal–Malkajgiri', types: ['administrative_area_level_2'] },
                { long_name: 'Telangana', types: ['administrative_area_level_1'] },
                { long_name: 'India', types: ['country'] },
              ],
            },
          ],
        },
      });

      const result = await reverseGeocodeGoogle(12.34, 56.78);

      expect(result).toEqual({
        fullAddress: 'Google Address',
        pincode: '500001',
        city: 'Hyderabad',
        district: 'Medchal–Malkajgiri',
        state: 'Telangana',
        country: 'India',
        latitude: 12.34,
        longitude: 56.78,
      });
    });

    it('throws error if Google reverse geocode status is not OK', async () => {
      axios.get.mockResolvedValue({
        data: { status: 'ZERO_RESULTS' },
      });

      await expect(reverseGeocodeGoogle(12.34, 56.78)).rejects.toThrow('Geocode failed');
    });
    // it('throws error if Google response has no results', async () => {
    //   axios.get.mockResolvedValue({
    //     data: {
    //       status: 'OK',
    //       results: [],
    //     },
    //   });

    //   await expect(reverseGeocodeGoogle(12.34, 56.78)).rejects.toThrow('Geocode failed');
    // });

  });

  // ---------------------------
  describe('getAddressFromPincode', () => {
    it('throws error if PostOffice array is empty', async () => {
      axios.get.mockResolvedValue({
        data: [{
          Status: 'Success',
          PostOffice: [],
        }],
      });

      await expect(getAddressFromPincode('000000')).rejects.toThrow('Invalid or not found pincode');
    });
    it('handles missing fields in PostOffice[0]', async () => {
      axios.get.mockResolvedValue({
        data: [{
          Status: 'Success',
          PostOffice: [{
            Name: null,
            Block: null,
            District: null,
            State: null,
            Country: null,
            Pincode: null,
          }],
        }],
      });

      const result = await getAddressFromPincode('000001');
      expect(result).toEqual({
        fullAddress: '',
        city: '',
        district: '',
        state: '',
        country: 'India',
        pincode: '',
      });
    });

    it('returns address from Indian postal API', async () => {
      axios.get.mockResolvedValue({
        data: [{
          Status: 'Success',
          PostOffice: [{
            Name: 'TestArea',
            Block: 'TestBlock',
            District: 'TestDistrict',
            State: 'TestState',
            Country: 'India',
            Pincode: '123456',
          }],
        }],
      });

      const result = await getAddressFromPincode('123456');
      expect(result).toEqual({
        fullAddress: 'TestArea',
        city: 'TestBlock',
        district: 'TestDistrict',
        state: 'TestState',
        country: 'India',
        pincode: '123456',
      });
    });

    it('throws error if postal API returns failure', async () => {
      axios.get.mockResolvedValue({
        data: [{
          Status: 'Error',
          PostOffice: null,
        }],
      });

      await expect(getAddressFromPincode('999999')).rejects.toThrow('Invalid or not found pincode');
    });
  });

  // ---------------------------
  describe('fetchAndSetAddressFromPincode', () => {
  

    it('sets all fields when street is empty', async () => {
      axios.get.mockResolvedValue({
        data: [{
          Status: 'Success',
          PostOffice: [{
            Name: 'AreaName',
            Block: 'CityBlock',
            District: 'DistrictName',
            State: 'StateName',
            Country: 'India',
            Pincode: '654321',
          }],
        }],
      });

      const setFieldValue = jest.fn();
      const currentValues = { street: '' };

      await fetchAndSetAddressFromPincode('654321', setFieldValue, currentValues);

      expect(setFieldValue).toHaveBeenCalledWith('street', 'AreaName');
      expect(setFieldValue).toHaveBeenCalledWith('city', 'CityBlock');
      expect(setFieldValue).toHaveBeenCalledWith('district', 'DistrictName');
      expect(setFieldValue).toHaveBeenCalledWith('state', 'StateName');
      expect(setFieldValue).toHaveBeenCalledWith('country', 'India');
      expect(setFieldValue).toHaveBeenCalledWith('pincode', '654321');
    });

    it('does not overwrite street if already filled', async () => {
      axios.get.mockResolvedValue({
        data: [{
          Status: 'Success',
          PostOffice: [{
            Name: 'ShouldNotBeSet',
            Block: 'CityX',
            District: 'DistrictX',
            State: 'StateX',
            Country: 'India',
            Pincode: '111111',
          }],
        }],
      });

      const setFieldValue = jest.fn();
      const currentValues = { street: 'Existing Address' };

      await fetchAndSetAddressFromPincode('111111', setFieldValue, currentValues);

      expect(setFieldValue).not.toHaveBeenCalledWith('street', expect.anything());
      expect(setFieldValue).toHaveBeenCalledWith('city', 'CityX');
      expect(setFieldValue).toHaveBeenCalledWith('district', 'DistrictX');
      expect(setFieldValue).toHaveBeenCalledWith('state', 'StateX');
      expect(setFieldValue).toHaveBeenCalledWith('country', 'India');
      expect(setFieldValue).toHaveBeenCalledWith('pincode', '111111');
    });
  });

  // ---------------------------
  describe('fetchAndSetCurrentLocation', () => {
    it('fetches and sets address from coordinates', async () => {
      PermissionsAndroid.request.mockResolvedValue('granted');

      Geolocation.getCurrentPosition.mockImplementation(success => {
        success({ coords: { latitude: 11, longitude: 22 } });
      });

      axios.get.mockResolvedValue({
        data: {
          display_name: 'My Full Address',
          address: {
            city: 'MyCity',
            state_district: 'MyDistrict-Demo',
            state: 'MyState',
            country: 'India',
            postcode: '999000',
          },
        },
      });

      const setFieldValue = jest.fn();

      await fetchAndSetCurrentLocation(setFieldValue);

      expect(setFieldValue).toHaveBeenCalledWith('street', 'My Full Address'.slice(0, 80));
      expect(setFieldValue).toHaveBeenCalledWith('city', 'MyCity');
      expect(setFieldValue).toHaveBeenCalledWith('district', 'MyDistrict');
      expect(setFieldValue).toHaveBeenCalledWith('state', 'MyState');
      expect(setFieldValue).toHaveBeenCalledWith('country', 'India');
      expect(setFieldValue).toHaveBeenCalledWith('pincode', '999000');
      expect(setFieldValue).toHaveBeenCalledWith('latitude', 11);
      expect(setFieldValue).toHaveBeenCalledWith('longitude', 22);
    });

  

  });
});
