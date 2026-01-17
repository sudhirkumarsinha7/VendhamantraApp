import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet,Linking, Platform } from 'react-native';
import { SafeAreaView,useSafeAreaInsets} from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

const MyWebView = () => {
  const url = 'https://vedhamantra.com/'; 
  const [loading, setLoading] = useState(false);
 const handleRequest = (event: { url: any; }) => {
    const { url } = event;

    // Check if it's a tel: link
    if (url.startsWith('tel:')) {
      Linking.openURL(url).catch((err) =>
        console.error('Failed to open dialer:', err)
      );
      return false; // prevent WebView from trying to load it
    }

    // You can handle other schemes like mailto:, whatsapp:, etc.
    if (url.startsWith('mailto:') || url.startsWith('whatsapp:')) {
      Linking.openURL(url);
      return false;
    }

    return true; // allow normal URLs to load
  };
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        {/* <WebView
          source={{ uri: url }}
          startInLoadingState={false}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        /> */}
        <WebView
  source={{ uri: url }}
  // allowsInlineMediaPlayback
  // javaScriptEnabled
  // domStorageEnabled
  // scalesPageToFit
  // cacheEnabled
  // startInLoadingState
  // androidLayerType="hardware"
  // mixedContentMode="always"
  // originWhitelist={['*']}
   allowsInlineMediaPlayback
      javaScriptEnabled
      domStorageEnabled
      scalesPageToFit
      cacheEnabled
      startInLoadingState
      androidLayerType="hardware"
      mixedContentMode="always"
      originWhitelist={['*']}
      onShouldStartLoadWithRequest={handleRequest}
/>


        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // ensures clean edges on devices with notches
  },
  container: {
    flex: 1,
    paddingVertical: Platform.OS === 'android' ? 10 : 40, // additional padding for Android status bar
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
});

export default MyWebView;
