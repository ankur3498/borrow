// components/Screen.tsx
import React from 'react';
import { View, StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const Screen = ({
  children,
  bg = '#FFF',
  barStyle = 'dark-content',
}: any) => {
  const isFocused = useIsFocused();

  return (
    <>
      {isFocused && (
        <StatusBar
          backgroundColor={bg}
          barStyle={barStyle}
        />
      )}

      <View style={{ flex: 1, backgroundColor: bg }}>
        {children}
      </View>
    </>
  );
};

export default Screen;
