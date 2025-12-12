import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  'AdharCardVerification'
>;
const KycVerification = () => {
  const [pan, setPan] = useState('');
  const navigation = useNavigation<NavProp>();
  const { width, height } = useWindowDimensions();
  const wp = (px: number) => (px / 390) * width; // responsive width
  const hp = (px: number) => (px / 812) * height; // responsive height
  const fp = (px: number) => (px / 390) * width; // responsive font

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableOpacity
          style={{
            marginTop: hp(24),
            marginLeft: wp(24),
            height: hp(24),
            width: wp(20),
          }}
          onPress={() => navigation.goBack()}
        >
          <Image source={require('../assets/images/backIcon.png')} />
        </TouchableOpacity>
        <View
          style={[
            styles.container,
            {
              paddingHorizontal: wp(24),
              marginTop: hp(52),
              marginBottom: hp(34),
            },
          ]}
        >
          <View
            style={[
              styles.iconCircle,
              {
                width: wp(64),
                height: wp(64),
                borderRadius: wp(32),
                marginBottom: hp(20),
              },
            ]}
          >
            <Image
              source={require('../assets/images/KycIcon.png')}
              style={{
                width: wp(32),
                height: wp(32),
                resizeMode: 'contain',
              }}
            />
          </View>

          <Text style={[styles.title, { fontSize: fp(24) }]}>
            Complete KYC Verification
          </Text>

          <Text
            style={[
              styles.subtitle,
              { fontSize: fp(15), marginTop: hp(8), marginBottom: hp(24) },
            ]}
          >
            We need to verify your identity before you can{'\n'}start borrowing
            items
          </Text>

          {/* PAN Card Box */}
          <View
            style={[
              styles.panBox,
              { padding: wp(16), marginBottom: hp(32), borderRadius: wp(10) },
            ]}
          >
            <View>
              <Image
                source={require('../assets/images/PanIcon.png')}
                style={{ height: hp(20), width: wp(20), resizeMode: 'contain' }}
              />
            </View>
            <View>
              <Text style={[styles.panTitle, { fontSize: fp(16) }]}>
                PAN Card Verification
              </Text>
              <Text style={[styles.panSub, { fontSize: fp(14) }]}>
                Required for identity proof
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.inputBox,
              {
                paddingVertical: hp(8),
                marginBottom: hp(20),
                paddingHorizontal: wp(16),
                height: hp(53),
              },
            ]}
          >
            <TextInput
              placeholder="Enter your full name as per PAN"
              placeholderTextColor="#0A0A0A80"
              style={[styles.input, { fontSize: fp(16) }]}
              value={pan}
              maxLength={10}
              onChangeText={setPan}
            />
          </View>

          {/* Verify Button */}
          <TouchableOpacity
            style={[
              styles.button,
              {
                paddingVertical: hp(15),
                borderRadius: hp(14),
                marginBottom: hp(196),
              },
            ]}
            onPress={() => navigation.navigate('AdharCardVerification')}
          >
            <Text style={[styles.buttonText, { fontSize: fp(16) }]}>
              Verify →
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={[styles.skipText, { fontSize: fp(16), marginBottom: hp(34) }]}
        >
          Skip for now (can verify later)
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default KycVerification;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFF' },
  container: {
    flex: 1,
  },

  iconCircle: {
    backgroundColor: '#FFE7F0',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 20,
  },

  title: {
    fontWeight: '700',
    color: '#1A1A1A',
  },

  subtitle: {
    color: '#4A5565',
    lineHeight: 21,
    fontWeight: 400,
    fontFamily: 'Helvetica',
  },

  panBox: {
    backgroundColor: '#F9FAFB',
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
  },

  panTitle: {
    fontWeight: '400',
    fontFamily: 'Helvetica',
  },

  panSub: {
    marginTop: 3,
    color: '#777',
    fontWeight: '400',
    fontFamily: 'Helvetica',
  },

  inputBox: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    marginBottom: 15,
  },

  input: {
    color: '#000',
  },

  button: {
    backgroundColor: '#FC156A',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },

  skipText: {
    textAlign: 'center',
    color: '#99A1AF',
    fontWeight: 400,
    fontFamily: 'Helvetica',
  },
});
