import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { FlatList } from 'react-native';
import { sellers } from '../../components/data.tsx';
const BestSellers = () => {
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
          Best Sellers
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
          height: hp(211),
          backgroundColor: '#F7F2FF',
          borderRadius: wp(12),
          padding: hp(10),
          marginHorizontal: wp(10),
        }}
      >
        <FlatList
          data={sellers}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{
            alignItems: 'center',
            gap: wp(8),
          }}
          renderItem={({ item }) => (
            <View
              style={{
                width: wp(110),
                height: hp(187),
                flexDirection: 'column',
                borderRadius: hp(8),
                backgroundColor: '#FFFFFF',
              }}
            >
              <Image
                source={item.image}
                style={{
                  height: hp(107),
                  width: wp(110),
                  borderTopLeftRadius: hp(8),
                  borderTopRightRadius: hp(8),
                }}
              />
              <Text
                style={{
                  fontSize: fp(14),
                  fontWeight: '700',
                  color: '#1A1A1A',
                  marginLeft: wp(5),
                  fontFamily: 'Helvetica',
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: fp(11),
                  fontWeight: '400',
                  color: '#6A7282',
                  marginLeft: wp(5),
                  fontFamily: 'Helvetica',
                }}
              >
                {item.measure}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: hp(8),
                  gap: wp(16),
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: fp(14),
                    fontWeight: '700',
                    color: '#101828',
                    marginLeft: wp(5),
                    fontFamily: 'Helvetica',
                  }}
                >
                  ₹{item.price}
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#FFF1F6',
                    height: hp(28),
                    width: wp(48),
                    borderRadius: hp(6),
                    borderWidth: 1,
                    borderColor: '#FC156A',
                    padding: hp(5),
                  }}
                >
                  <Text
                    style={{
                      fontSize: fp(12),
                      fontWeight: '700',
                      color: '#FC156A',
                      marginLeft: wp(5),
                      fontFamily: 'Helvetica',
                    }}
                  >
                    Add
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default BestSellers;

const styles = StyleSheet.create({});
