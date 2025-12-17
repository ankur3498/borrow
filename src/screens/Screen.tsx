// components/Screen.tsx
import React from 'react';
import { View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Screen = ({
  children,
  bg = '#FFF',
  barStyle = 'dark-content',
}: any) => {
  return (
    <>
      <StatusBar backgroundColor={bg} barStyle={barStyle} />
      <View style={{ flex: 1, backgroundColor: bg }}>
        {children}
      </View>
    </>
  );
};

export default Screen;
