import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';

const HomeScreen = () => {
  const { width, height } = useWindowDimensions();
  const wp = (px: number) => (px / 390) * width;
  const hp = (px: number) => (px / 812) * height;
  const fp = (px: number) => (px / 390) * width;

  return (
    <ScrollView>
      <View
        style={{
          height: hp(293),
          backgroundColor: '#C10349',
          borderBottomLeftRadius: wp(16),
          borderBottomRightRadius: wp(16),
        }}
      >
        <View>
            
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
