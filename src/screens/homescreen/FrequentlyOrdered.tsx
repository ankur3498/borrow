import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from 'react-native';
import React from 'react';

const HomeScreen2 = () => {
  const { width, height } = useWindowDimensions();
  const wp = (v: number) => (v / 390) * width;
  const hp = (v: number) => (v / 812) * height;
  const fp = (v: number) => (v / 390) * width;

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: hp(16),
          paddingHorizontal: wp(10),
          marginBottom: hp(10),
        }}
      >
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: '#D9D9D9',
          }}
        />
        <Text
          style={{
            marginHorizontal: wp(14),
            fontSize: fp(15),
            fontWeight: '700',
            color: '#1A1A1A',
          }}
        >
          Frequently Ordered
        </Text>
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: '#D9D9D9',
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: wp(10),
          gap: wp(10),
        }}
      >
        <View
          style={{
            backgroundColor: '#E4F9DA',
            height: hp(114),
            width: wp(118),
            borderColor: '#CDEFBF',
            borderWidth: 1,
            borderRadius: hp(12),
          }}
        >
          <View
            style={{
              flexDirection: 'column',
              alignSelf: 'center',
              padding: wp(13),
              gap: hp(8),
            }}
          >
            <Image
              source={require('../../assets/Icons/Images/HealthCare.png')}
              style={{ height: hp(68), width: wp(80) }}
            />
            <Text
              style={{
                fontSize: fp(13),
                textAlign: 'center',
                fontWeight: '400',
              }}
            >
              Health & Care
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#DAF2F9',
            height: hp(114),
            width: wp(118),
            borderColor: '#CDE8F0',
            borderWidth: 1,
            borderRadius: hp(12),
          }}
        >
          <View
            style={{
              flexDirection: 'column',
              alignSelf: 'center',
              padding: wp(13),
              gap: hp(8),
            }}
          >
            <Image
              source={require('../../assets/Icons/Images/Stationary.png')}
              style={{ height: hp(68), width: wp(80) }}
            />
            <Text
              style={{
                fontSize: fp(13),
                textAlign: 'center',
                fontWeight: '400',
              }}
            >
              Stationery
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#F9E8DA',
            height: hp(114),
            width: wp(118),
            borderColor: '#EFD8C4',
            borderWidth: 1,
            borderRadius: hp(12),
          }}
        >
          <View
            style={{
              flexDirection: 'column',
              alignSelf: 'center',
              padding: wp(13),
              gap: hp(8),
            }}
          >
            <Image
              source={require('../../assets/Icons/Images/Snackss.png')}
              style={{ height: hp(64), width: wp(88) }}
            />
            <Text
              style={{
                fontSize: fp(13),
                textAlign: 'center',
                fontWeight: '400',
              }}
            >
              Food & Snacks
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen2;

const styles = StyleSheet.create({});
