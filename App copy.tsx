import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { store } from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';
// import { ThemeProvider } from './src/context/ThemeContext';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        {/* <ThemeProvider> */}
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
              <StatusBar
                barStyle="dark-content"
                backgroundColor="#ffffff"
              />
              <AppNavigator />
            </NavigationContainer>
          </GestureHandlerRootView>
        {/* </ThemeProvider> */}
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;