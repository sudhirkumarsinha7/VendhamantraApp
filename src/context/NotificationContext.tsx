// NotificationContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { getApp } from '@react-native-firebase/app';
import {
  getMessaging,
  getToken,
  registerDeviceForRemoteMessages,
  requestPermission,
  onMessage,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type NotificationContextType = {
  fcmToken: string | null;
  refreshToken: () => Promise<void>;
};

const NotificationContext = createContext<NotificationContextType>({
  fcmToken: null,
  refreshToken: async () => {},
});

export const useNotification = () => useContext(NotificationContext);

type Props = {
  children: ReactNode;
};

export const NotificationProvider = ({ children }: Props) => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
//   const navigation = useNavigation<NavigationProp<any>>();

  // 1. Create Android channel for notifications
  const createNotificationChannel = async () => {
    if (Platform.OS === 'android') {
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });
    }
  };

  // 2. Request permission & get FCM token
  const getFCMToken = async () => {
    try {
      const app = getApp();
      const messaging = getMessaging(app);

      await registerDeviceForRemoteMessages(messaging);

      if (Platform.OS === 'ios') {
        const authStatus = await requestPermission(messaging);
        if (authStatus !== 1 && authStatus !== 2) {
          console.warn('iOS notification permission denied');
          return;
        }
      } else if (Platform.OS === 'android' && Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.warn('Android notification permission denied');
          return;
        }
      }

      const token = await getToken(messaging);
      console.log('FCM Token:', token);
      setFcmToken(token);
    } catch (error:any) {
       console.log('Failed to get FCM token:', error);
    }
  };

  // 3. Show a local notification
  const displayNotification = async (remoteMessage: any) => {
    await notifee.displayNotification({
      title: remoteMessage.notification?.title ?? 'Notification',
      body: remoteMessage.notification?.body ?? '',
      android: {
        channelId: 'default',
        smallIcon: 'ic_launcher', // Your app icon (adjust if necessary)
        pressAction: {
          id: 'default', // Needed to handle taps
        },
      },
      data: remoteMessage.data, // pass data for navigation on tap
    });
  };

  // 4. Handle foreground messages - show notification
  const onMessageListener = () => {
    const messaging = getMessaging(getApp());
    return onMessage(messaging, async remoteMessage => {
      console.log('Foreground message received:', remoteMessage);
      await displayNotification(remoteMessage);
    });
  };

  // 5. Handle background messages (optional handling)
  useEffect(() => {
    const messaging = getMessaging(getApp());
    setBackgroundMessageHandler(messaging, async remoteMessage => {
      console.log('Background message:', remoteMessage);
      // Optional: you can also display notification here if you want
    });
  }, []);

  // 6. Handle notification taps - navigate accordingly
  useEffect(() => {
    const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS) {
        const data = detail.notification?.data;
        // if (data?.screen) {
        //   try {
        //     const params = data.params ? JSON.parse(data.params) : undefined;
        //     navigation.navigate(data.screen, params);
        //   } catch {
        //     navigation.navigate(data.screen);
        //   }
        // }
      }
    });

    return () => unsubscribe();
  }, [
    // navigation
  ]);

  // 7. Handle initial notification if app launched from a notification (cold start)
  useEffect(() => {
    (async () => {
      const initialNotification = await notifee.getInitialNotification();
      if (initialNotification?.notification?.data?.screen) {
        const data = initialNotification.notification.data;
        // try {
        //   const params = data.params ? JSON.parse(data.params) : undefined;
        //   navigation.navigate(data.screen, params);
        // } catch {
        //   navigation.navigate(data.screen);
        // }
      }
    })();
  }, []);

  // 8. Initialize on mount
  useEffect(() => {
    createNotificationChannel();
    getFCMToken();
    const unsubscribe = onMessageListener();

    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  // 9. Refresh token method exposed
  const refreshToken = async () => {
    try {
      const messaging = getMessaging(getApp());
      const token = await getToken(messaging);
      console.log('Refreshed token:', token);
      setFcmToken(token);
    } catch (error:any) {
       console.log('Error refreshing FCM token:', error);
    }
  };

  return (
    <NotificationContext.Provider value={{ fcmToken, refreshToken }}>
      {children}
    </NotificationContext.Provider>
  );
};
