// src/utils/__tests__/toast.test.ts
import { showToast } from '../toast';
import Toast from 'react-native-toast-message';

// Mock the Toast module
jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

describe('showToast', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls Toast.show with correct parameters and default type', () => {
    showToast('Test Title', 'Test Message');

    expect(Toast.show).toHaveBeenCalledWith({
      type: 'success',      // default type
      text1: 'Test Title',
      text2: 'Test Message',
      position: 'top',
      visibilityTime: 5000,
    });
  });

  it('calls Toast.show with given type', () => {
    showToast('Warning Title', 'Warning Message', 'error');

    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      text1: 'Warning Title',
      text2: 'Warning Message',
      position: 'top',
      visibilityTime: 5000,
    });
  });

  it('calls Toast.show correctly when message is omitted', () => {
    showToast('Only Title');

    expect(Toast.show).toHaveBeenCalledWith({
      type: 'success',
      text1: 'Only Title',
      text2: undefined,
      position: 'top',
      visibilityTime: 5000,
    });
  });
});
