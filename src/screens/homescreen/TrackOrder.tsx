import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
type NavProp = NativeStackNavigationProp<RootStackParamList, 'TrackingScreen'>;

const TrackOrderBar = () => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const wp = (v: number) => (v / 390) * width;
  const hp = (v: number) => (v / 812) * height;
  const fp = (v: number) => (v / 390) * width;
   const navigation = useNavigation<NavProp>();

  return (
    <View
      style={{
        position: 'absolute',
        bottom: insets.bottom + hp(90),
        left: wp(8),
        right:wp(8),
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 999,
        elevation: 10,
      }}
    >
      {/* MAIN PINK CARD */}
      <View
        style={{
          flex: 1,
          backgroundColor: '#C10349',
          borderRadius: wp(16),
          paddingVertical: hp(14),
          paddingHorizontal: wp(14),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* LEFT */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: wp(40),
              height: wp(40),
              borderRadius: wp(30),
              backgroundColor: '#FFFFFF33',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: wp(12),
            }}
          >
            <Image
              source={require('../../assets/Icons/truckIcon.png')}
              style={{
                width: wp(24),
                height: wp(24),
                tintColor: '#fff',
              }}
            />
          </View>

          <View>
            <Text
              style={{
                color: '#FFA9C9',
                fontSize: fp(14),
                fontWeight: '400',
              }}
            >
              Active Orders
            </Text>
            <Text
              style={{
                color: '#fff',
                fontSize: fp(16),
                opacity: 0.9,
                marginTop: hp(2),
                fontWeight: '400',
              }}
            >
              1 order in progress
            </Text>
          </View>
        </View>

        {/* TRACK BUTTON */}
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            paddingHorizontal: wp(18),
            paddingVertical: hp(7),
            borderRadius: wp(8),
          }}
          onPress={()=>navigation.navigate('TrackingScreen')}
        >
          <Text
            style={{
              color: '#C10349',
              fontWeight: '700',
              fontSize: fp(14),
            }}
          >
            Track
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TrackOrderBar;
