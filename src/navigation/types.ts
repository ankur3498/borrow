import { FirebaseAuthTypes } from '@react-native-firebase/auth';
export type RootStackParamList = {
  Onboarding: undefined;
   OtpScreen: {
    phone: string;
    // confirmation: FirebaseAuthTypes.ConfirmationResult;
  };
  Information: undefined;
  KycVerification: undefined;
  AdharCardVerification: undefined;
  PreferredShopsScreen: undefined;
  MainTabs: undefined; 
  MapScreen: undefined;
  TrackingScreen : undefined;
  MyRequest : undefined;
};
