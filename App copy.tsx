import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { AppProvider } from './src/context/AppContext';
import { AuthProvider } from './src/context/AuthContext';
import { NetworkProvider } from './src/context/NetworkContext';
import { store } from './src/store/store';
import { CustomToast } from './src/components/ui/CustomToastmessage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { ForceUpdateWrapper } from './src/components/wrappers/ForceUpdateWrapper';
import { NotificationProvider } from './src/context/NotificationContext';
// import { LocationTrackingProvider } from './src/context/LocationTrackingContext'


const App: React.FC = () => {
  

  return (
        <Provider store={store}>

      <SafeAreaProvider>
          {/* <AppProvider> */}
            {/* <NetworkProvider> */}
              {/* <AuthProvider> */}
                {/* <ForceUpdateWrapper> */}
                  {/* <LocationTrackingProvider> */}
                  <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
                  <AppNavigator />
                  <CustomToast />
                  {/* </LocationTrackingProvider> */}
                {/* </ForceUpdateWrapper> */}
              {/* </AuthProvider> */}
            {/* </NetworkProvider> */}
          {/* </AppProvider> */}
      </SafeAreaProvider>
      </Provider>
  );
};

export default App;
