import React from 'react';
import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';

import { PermissionsAndroid, Platform, Alert } from 'react-native';

const options: ImageLibraryOptions & CameraOptions = {
  mediaType: 'photo',
  cameraType: 'back',
  includeBase64: false,
  // maxWidth: 1024,
  // maxHeight: 1024,
  maxWidth: 1280,
  maxHeight: 1280,
  quality: 0.5,
  saveToPhotos: false,

  // 🚨 CRITICAL FIX FOR iPHONE 12 / 12 PRO
  ...(Platform.OS === 'ios' && {
    presentationStyle: 'overFullScreen',
    videoQuality: 'low',
    durationLimit: 0,
  }),
};

/**
 * Request camera and storage permissions on Android
 */
const requestAndroidPermissions = async (type: 'camera' | 'gallery') => {
  const perms: string[] = [];

  const version = typeof Platform.Version === 'string'
    ? parseInt(Platform.Version, 10)
    : Platform.Version;

  // Camera permission (allowed by Google)
  if (type === 'camera') {
    perms.push(PermissionsAndroid.PERMISSIONS.CAMERA);
  }

  // For Android 12 and below
  if (version < 33) {
    perms.push(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
    // WRITE_EXTERNAL_STORAGE is deprecated — do NOT use
  }

  // For Android 13+ → No storage permissions allowed
  // Use Android Photo Picker, so no perms required.

  if (perms.length === 0) return true; // Nothing to request

  const granted = await PermissionsAndroid.requestMultiple(perms);
  return Object.values(granted).every(
    status => status === PermissionsAndroid.RESULTS.GRANTED
  );
};

const requestPermissions = async (type: 'camera' | 'gallery') => {
  if (Platform.OS === 'android') {
    const granted = await requestAndroidPermissions(type);
    if (!granted) {
      Alert.alert('Permission Denied', 'Please allow permissions to continue.');
    }
    return granted;
  }

  // iOS: permissions handled automatically by image picker
  return true;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB in bytes

/**
 * Open camera and select image
 */
export const openCamera = async (): Promise<Asset | null> => {
  const hasPermission = await requestPermissions('camera');
  if (!hasPermission) return null;

  return new Promise((resolve, reject) => {
    launchCamera(options, response => {
      if (response?.didCancel) {
        resolve(null);
      } else if (response?.errorCode) {
        reject(new Error(response?.errorMessage || 'Camera error'));
      } else {
        const asset = response?.assets?.[0];
        if (!asset) return resolve(null);

        // File size validation
        if (asset?.fileSize && asset?.fileSize > MAX_FILE_SIZE) {
          Alert.alert('File too large', 'Please select an image smaller than 5 MB.');
          return resolve(null);
        }

        resolve(asset);
      }
    });
  });
};

/**
 * Open gallery and select image
 */
export const openGallery = async (): Promise<Asset | null> => {
  const hasPermission = await requestPermissions('gallery');
  if (!hasPermission) return null;

  return new Promise((resolve, reject) => {
    launchImageLibrary(options, response => {
      if (response?.didCancel) {
        resolve(null);
      } else if (response?.errorCode) {
        reject(new Error(response?.errorMessage || 'Gallery error'));
      } else {
        const asset = response?.assets?.[0];
        if (!asset) return resolve(null);

        // File size validation
        if (asset?.fileSize && asset?.fileSize > MAX_FILE_SIZE) {
          Alert.alert('File too large', 'Please select an image smaller than 5 MB.');
          return resolve(null);
        }

        resolve(asset);
      }
    });
  });
};
