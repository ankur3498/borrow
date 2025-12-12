import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/splash/SplashScreen';
import Onboarding from './src/screens/onboarding/Onboarding';
import OtpScreen from './src/screens/otp/OtpScreen';
import Information from './src/screens/information/Information';
import KycVerification from './src/screens/KycVerification';
import AdharCardVerification from './src/screens/AdharCardVerification';
import PreferredShopsScreen from './src/screens/PreferredShopsScreen';
import Toast from 'react-native-toast-message';
import HomeScreen from './src/screens/homescreen/HomeScreen';

const Stack = createNativeStackNavigator<{
  Splash: undefined;
  Onboarding: undefined;
  OtpScreen: undefined;
  Information: undefined;
  KycVerification: undefined;
  AdharCardVerification:undefined;
  PreferredShopsScreen: undefined;
  HomeScreen: undefined;
}>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* Splash MUST be first */}
          {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}

          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="OtpScreen" component={OtpScreen} />
          <Stack.Screen name="Information" component={Information} />
          <Stack.Screen name="KycVerification" component={KycVerification} />
          <Stack.Screen name="AdharCardVerification" component={AdharCardVerification} />
          <Stack.Screen name="PreferredShopsScreen" component={PreferredShopsScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
