import { openCamera, openGallery } from '../imagePicker'
import {
  launchCamera,
  launchImageLibrary,
  Asset,
} from 'react-native-image-picker'
import { PermissionsAndroid, Platform, Alert } from 'react-native'

jest.mock('react-native', () => ({
  Platform: {
    OS: 'android',
    Version: 32,
  },
  PermissionsAndroid: {
    PERMISSIONS: {
      CAMERA: 'android.permission.CAMERA',
      WRITE_EXTERNAL_STORAGE: 'android.permission.WRITE_EXTERNAL_STORAGE',
      READ_EXTERNAL_STORAGE: 'android.permission.READ_EXTERNAL_STORAGE',
      // READ_MEDIA_IMAGES: 'android.permission.READ_MEDIA_IMAGES',
    },
    RESULTS: {
      GRANTED: 'granted',
      DENIED: 'denied',
    },
    requestMultiple: jest.fn(),
  },
  Alert: {
    alert: jest.fn(),
  },
}));



describe('Image Picker Utils', () => {
  const mockAsset: Asset = {
    uri: 'mock-uri',
    fileName: 'photo.jpg',
    type: 'image/jpeg',
    fileSize: 123456,
    height: 1000,
    width: 1000,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })
beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation((msg) => {
    if (
      typeof msg === 'string' &&
      msg.includes('ProgressBarAndroid has been extracted')
    ) {
      return; // suppress this warning
    }
    console.warn(msg);
  });
});

  describe('openCamera', () => {
    it('should return asset when camera is successful', async () => {
      ;(PermissionsAndroid.requestMultiple as jest.Mock).mockResolvedValue({
        'android.permission.CAMERA': 'granted',
        'android.permission.WRITE_EXTERNAL_STORAGE': 'granted',
        'android.permission.READ_EXTERNAL_STORAGE': 'granted',
      })

      ;(launchCamera as jest.Mock).mockImplementation((_, cb) =>
        cb({ assets: [mockAsset] })
      )

      const result = await openCamera()
      expect(result).toEqual(mockAsset)
    })

    it('should return null if user cancels camera', async () => {
      ;(PermissionsAndroid.requestMultiple as jest.Mock).mockResolvedValue({
        'android.permission.CAMERA': 'granted',
        'android.permission.WRITE_EXTERNAL_STORAGE': 'granted',
        'android.permission.READ_EXTERNAL_STORAGE': 'granted',
      })

      ;(launchCamera as jest.Mock).mockImplementation((_, cb) =>
        cb({ didCancel: true })
      )

      const result = await openCamera()
      expect(result).toBeNull()
    })

    it('should throw if camera returns error', async () => {
      ;(PermissionsAndroid.requestMultiple as jest.Mock).mockResolvedValue({
        'android.permission.CAMERA': 'granted',
        'android.permission.WRITE_EXTERNAL_STORAGE': 'granted',
        'android.permission.READ_EXTERNAL_STORAGE': 'granted',
      })

      ;(launchCamera as jest.Mock).mockImplementation((_, cb) =>
        cb({ errorCode: 'camera_unavailable', errorMessage: 'Camera not available' })
      )

      await expect(openCamera()).rejects.toThrow('Camera not available')
    })

    it('should show alert if permission is denied', async () => {
      ;(PermissionsAndroid.requestMultiple as jest.Mock).mockResolvedValue({
        'android.permission.CAMERA': 'denied',
        'android.permission.WRITE_EXTERNAL_STORAGE': 'granted',
        'android.permission.READ_EXTERNAL_STORAGE': 'granted',
      })

      const result = await openCamera()
      expect(Alert.alert).toHaveBeenCalled()
      expect(result).toBeNull()
    })
  })

  describe('openGallery', () => {
    it('should return asset when gallery is successful', async () => {
      ;(PermissionsAndroid.requestMultiple as jest.Mock).mockResolvedValue({
        'android.permission.READ_EXTERNAL_STORAGE': 'granted',
        'android.permission.WRITE_EXTERNAL_STORAGE': 'granted',
      })

      ;(launchImageLibrary as jest.Mock).mockImplementation((_, cb) =>
        cb({ assets: [mockAsset] })
      )

      const result = await openGallery()
      expect(result).toEqual(mockAsset)
    })

    it('should return null if user cancels gallery', async () => {
      ;(PermissionsAndroid.requestMultiple as jest.Mock).mockResolvedValue({
        'android.permission.READ_EXTERNAL_STORAGE': 'granted',
        'android.permission.WRITE_EXTERNAL_STORAGE': 'granted',
      })

      ;(launchImageLibrary as jest.Mock).mockImplementation((_, cb) =>
        cb({ didCancel: true })
      )

      const result = await openGallery()
      expect(result).toBeNull()
    })

    it('should throw if gallery returns error', async () => {
      ;(PermissionsAndroid.requestMultiple as jest.Mock).mockResolvedValue({
        'android.permission.READ_EXTERNAL_STORAGE': 'granted',
        'android.permission.WRITE_EXTERNAL_STORAGE': 'granted',
      })

      ;(launchImageLibrary as jest.Mock).mockImplementation((_, cb) =>
        cb({ errorCode: 'permission', errorMessage: 'Gallery access denied' })
      )

      await expect(openGallery()).rejects.toThrow('Gallery access denied')
    })

    it('should show alert if gallery permission denied', async () => {
      ;(PermissionsAndroid.requestMultiple as jest.Mock).mockResolvedValue({
        'android.permission.READ_EXTERNAL_STORAGE': 'denied',
        'android.permission.WRITE_EXTERNAL_STORAGE': 'granted',
      })

      const result = await openGallery()
      expect(Alert.alert).toHaveBeenCalled()
      expect(result).toBeNull()
    })
  })
})
