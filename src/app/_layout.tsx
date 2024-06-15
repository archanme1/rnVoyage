import { Stack } from "expo-router";
import { useEffect } from "react";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import {
  AmaticSC_400Regular,
  AmaticSC_700Bold,
} from "@expo-google-fonts/amatic-sc";

import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  Authenticator,
  Theme,
  ThemeProvider,
} from "@aws-amplify/ui-react-native";
// App.js

// need IOS or Android developmetn build to work

// import { Amplify } from "aws-amplify";
// import amplifyconfig from "@/amplifyconfiguration.json";
// Amplify.configure(amplifyconfig);

// const theme: Theme = {
//   tokens: {
//     colors: {
//       brand: {
//         primary: 'red',
//       },

//       background: {
//         primary: '{colors.gray}',
//       },
//       font: {
//         primary: 'black',
//       },
//     },
//   },
// };

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter: Inter_900Black,
    Amatic: AmaticSC_400Regular,
    AmaticBold: AmaticSC_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    // <Authenticator.Provider>
    //   <ThemeProvider theme={theme}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{}}>
        <Stack.Screen name="index" options={{ title: "RN Voyage" }} />
      </Stack>
    </GestureHandlerRootView>
    // </ThemeProvider>
    // </Authenticator.Provider>
  );
}
