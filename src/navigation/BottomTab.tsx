import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Image, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Screens
import HomeScreen from '../screens/homescreen/HomeScreen';
import OrdersScreen from '../screens/orders/OrdersScreen';
import BillsScreen from '../screens/bills/BillsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
    const wp = (v: number) => (v / 390) * width;
    const hp = (v: number) => (v / 812) * height;
    const fp = (v: number) => (v / 390) * width;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          height: 65 + insets.bottom,
          paddingTop: hp(13),
          paddingBottom: insets.bottom + 10,

          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: hp(16),
          borderTopRightRadius: hp(16),
          position: 'absolute',

          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.08,
          shadowRadius: 10,
          elevation: 20,
        },
      }}
    >
      <Tab.Screen
        name="Shop"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabItem
              focused={focused}
              label="Shop"
              icon={require('../assets/Icons/Shops.png')}
              activeIcon = {require('../assets/Icons/activeShops.png')}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabItem
              focused={focused}
              label="Orders"
              icon={require('../assets/Icons/Orders.png')}
              activeIcon = {require('../assets/Icons/activeOrders.png')}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Bills"
        component={BillsScreen}
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabItem
              focused={focused}
              label="Bills"
              icon={require('../assets/Icons/Bills.png')}
              activeIcon = {require('../assets/Icons/activeBills.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabItem
              focused={focused}
              label="Profile"
              icon={require('../assets/Icons/Profile.png')}
              activeIcon = {require('../assets/Icons/activeProfile.png')}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

const TabItem = ({
  focused,
  icon,
  label,
  activeIcon
}: {
  focused: boolean;
  icon: any;
  label: string;
  activeIcon:any;
}) => (
  <View style={{ alignItems: 'center', justifyContent: 'center',width:50 }}>
    <Image
      source={focused? activeIcon : icon}
      style={{
        width: 28,
        height: 24,
        tintColor: focused ? '#FC156A' : '#808daaff',
      }}
       resizeMode="contain"
    />
    <Text
      style={{
        fontSize: 13,
        marginTop: 6,
        color: focused ? '#FC156A' : '#8A8F9A',
        fontWeight: focused ? '600' : '500',
      }}
      numberOfLines={1}
    >
      {label}
    </Text>
  </View>
);
