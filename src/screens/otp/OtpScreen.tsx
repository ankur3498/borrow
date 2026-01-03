import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  useWindowDimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import { RootStackParamList } from '../../navigation/types';
import auth from '@react-native-firebase/auth';
import Screen from '../Screen';
type OtpRouteProp = RouteProp<RootStackParamList, 'OtpScreen'>;
type NavProp = NativeStackNavigationProp<RootStackParamList, 'Information'>;

const RESEND_TIME = 30;

const OtpScreen = () => {
  const route = useRoute<OtpRouteProp>();
  const navigation = useNavigation<NavProp>();
  const { width, height } = useWindowDimensions();
  const wp = (v: number) => (v / 390) * width;
  const hp = (v: number) => (v / 812) * height;
  const fp = (v: number) => (v / 390) * width;
  const { phone, confirmation } = route.params;

  const [confirm, setConfirm] = useState(confirmation);

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef<Array<TextInput | null>>([]);

  const [timer, setTimer] = useState(RESEND_TIME);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);
  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text.replace(/[^0-9]/g, '');
    setOtp(newOtp);
    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };
  const handleBackspace = (text: string, index: number) => {
    if (text === '' && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const fullOtp = otp.join('');

    if (fullOtp.length !== 6) {
      Toast.show({ type: 'error', text1: 'Enter valid OTP' });
      return;
    }

    try {
      await confirm.confirm(fullOtp);

      Toast.show({ type: 'success', text1: 'OTP Verified' });
      navigation.replace('Information');
    } catch {
      Toast.show({ type: 'error', text1: 'Wrong OTP' });
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;

    try {
      const newConfirm = await auth().signInWithPhoneNumber('+91' + phone);
      setConfirm(newConfirm);

      Toast.show({ type: 'success', text1: 'OTP Resent' });

      setOtp(['', '', '', '', '', '']);
      setTimer(RESEND_TIME);
      setCanResend(false);
    } catch {
      Toast.show({ type: 'error', text1: 'Resend failed' });
    }
  };

  return (
    <Screen bg="#FFFFFF" barStyle="light-content">
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <TouchableOpacity
          style={{ marginTop: 20, marginLeft: 24, height: 24, width: 20 }}
          onPress={() => navigation.goBack()}
        >
          <Image source={require('../../assets/Icons/backIcon.png')} />
        </TouchableOpacity>

        <View style={{ paddingHorizontal: wp(24), paddingTop: hp(22) }}>
          <Text style={[styles.title, { fontSize: fp(28) }]}>Enter OTP</Text>
          <Text style={styles.subtitle}>OTP sent to +91 {phone}</Text>
          <View style={[styles.otpRow, { paddingTop: hp(35) }]}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => {
                  inputs.current[index] = ref;
                }}
                style={[
                  styles.otpBox,
                  {
                    width: wp(50),
                    height: wp(55),
                    fontSize: fp(22),
                    borderColor: digit ? '#FC156A' : '#D9D9D9',
                    backgroundColor: digit ? '#FC156A14' : '#FFF',
                  },
                ]}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={text => handleChange(text, index)}
                onKeyPress={({ nativeEvent }) =>
                  nativeEvent.key === 'Backspace' &&
                  handleBackspace(digit, index)
                }
              />
            ))}
          </View>

          <TouchableOpacity
            style={[
              styles.btn,
              {
                justifyContent: 'center',
                borderRadius: hp(14),
                height: hp(54),
                flexDirection: 'row',
                gap: wp(8),
              },
            ]}
            onPress={handleVerify}
          >
            <Text style={[styles.btnText, { fontSize: fp(16) }]}>Verify</Text>
            <Image
              source={require('../../assets/Icons/sideArrow.png')}
              style={{ height: hp(18), width: wp(18) }}
            />
          </TouchableOpacity>

          <TouchableOpacity disabled={!canResend} onPress={handleResendOtp}>
            <Text style={[styles.changeText, { opacity: canResend ? 1 : 0.5 }]}>
              {canResend ? 'Resend OTP' : `Resend OTP in ${timer}s`}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </Screen>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  title: {
    fontWeight: '700',
    color: '#1A1A1A',
  },
  subtitle: {
    color: '#6A6A6A',
    marginTop: 8,
    fontSize: 16,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpBox: {
    borderWidth: 1,
    borderRadius: 12,
    textAlign: 'center',
    color: '#000',
  },
  btn: {
    backgroundColor: '#FC156A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginTop: 20,
  },
  btnText: {
    color: '#FFF',
    fontWeight: '700',
  },
  changeText: {
    color: '#B7B8B9',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 40,
  },
});
