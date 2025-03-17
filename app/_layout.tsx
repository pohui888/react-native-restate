import { SplashScreen, Stack } from 'expo-router';
import './global.css';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import GlobalProvider from '@/lib/global-provider';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Rubik-Bold': require('../assets/fonts/Rubik-Bold.ttf'),
    'Rubik-ExtraBold': require('../assets/fonts/Rubik-ExtraBold.ttf'),
    'Rubik-Light': require('../assets/fonts/Rubik-Light.ttf'),
    'Rubik-Medium': require('../assets/fonts/Rubik-Medium.ttf'),
    'Rubik-Regular': require('../assets/fonts/Rubik-Regular.ttf'),
    'Rubik-SemiBold': require('../assets/fonts/Rubik-SemiBold.ttf'),
  });

  // SplashScreen when start openning the app
  useEffect(() => {
    // Hide the SplashScreen only the fonts done fetchings
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  //  headerShown -> to show/hide the header bar
  return (
    <GlobalProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </GlobalProvider>
  );
}
