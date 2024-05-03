import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { useFonts, Inter_900Black, Inter_600SemiBold } from '@expo-google-fonts/inter';
import {
  AmaticSC_400Regular,
  AmaticSC_700Bold,
} from '@expo-google-fonts/amatic-sc';

import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreenAnimate from '@/components/feature4/SplashScreen';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter: Inter_900Black,
    InterMBold: Inter_600SemiBold,
    Amatic: AmaticSC_400Regular,
    AmaticBold: AmaticSC_700Bold,
  });

  const [appReady, setAppReady] = useState(false);
  const [splashAnimatedFinsihed, setSplashAnimatedFinsihed] = useState(false);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // SplashScreen.hideAsync();
      setAppReady(true)
    }
  }, [fontsLoaded, fontError]);

  const showAnimatedSplash = !appReady || !splashAnimatedFinsihed;
  if (showAnimatedSplash) {
    return  (
      <SplashScreenAnimate onAnimationFinish={(isCancelled)=> {
        if(!isCancelled){
          setSplashAnimatedFinsihed(true);
        }
      }}
      />
    )
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Animated.View style={{ flex: 1 }} entering={FadeIn}>
      <Stack screenOptions={{}}>
        <Stack.Screen name="index" options={{ title: 'RN Voyage' }} />
      </Stack>
      </Animated.View>
    </GestureHandlerRootView>
  );
}
