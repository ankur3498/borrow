import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const HomeScreen = () => {
  const { width, height } = useWindowDimensions();
  const wp = (px: number) => (px / 390) * width;
  const hp = (px: number) => (px / 812) * height;
  const fp = (px: number) => (px / 390) * width;

  return (
    <ScrollView>
      <View
        style={{
          height: hp(230),
          backgroundColor: '#C10349',
          borderBottomLeftRadius: wp(16),
          borderBottomRightRadius: wp(16),
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            height: hp(41),
            paddingTop: hp(52),
            paddingHorizontal: wp(10),
          }}
        >
          <View style={{ flex: 1, flexDirection: 'column', height: hp(41) }}>
            <Text
              style={{
                fontSize: fp(16),
                fontFamily: 'Helvetica',
                fontWeight: 400,
                color: 'white',
              }}
            >
              Mayur Vihar Phase-1
            </Text>
            <MaskedView
              maskElement={
                <Text style={{ fontSize: fp(24), fontWeight: '700' }}>
                  4 minutes
                </Text>
              }
            >
              <LinearGradient
                colors={['#FFEDF4', '#FF88B4']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
              >
                <Text style={{ opacity: 0, fontSize: fp(24) }}>4 minutes</Text>
              </LinearGradient>
            </MaskedView>
          </View>
          <Text>Here The Content Will Come</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            height: hp(48),
            width: wp(372),
            paddingHorizontal: wp(10),
          }}
        >
          <View
            style={{
              height:hp(48),
              borderRadius: hp(12),
              backgroundColor: '#FFF',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: wp(16),
              width:wp(245),
            }}
          >
            <View style={{ marginRight: wp(10) }}>
              <Text style={{ fontSize: fp(18) }}>🔍</Text>
            </View>
            <Text
              style={{
                flex: 1,
                fontSize: fp(16),
                color: '#9CA3AF',
              }}
            >
              Search for products...
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
