import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Image } from 'react-native';

// Screens
import HomeScreen from '../screens/homescreen/HomeScreen';
import OrdersScreen from '../screens/orders/OrdersScreen';
import BillsScreen from '../screens/bills/BillsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 72,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute',
        },
      }}
    >
      {/* SHOP */}
      <Tab.Screen
        name="Shop"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabItem
              focused={focused}
              label="Shop"
              icon={require('../assets/Icons/Shops.png')}
            />
          ),
        }}
      />

      {/* ORDERS */}
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabItem
              focused={focused}
              label="Orders"
              icon={require('../assets/Icons/Shops.png')}
            />
          ),
        }}
      />

      {/* BILLS */}
      <Tab.Screen
        name="Bills"
        component={BillsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabItem
              focused={focused}
              label="Bills"
              icon={require('../assets/Icons/Shops.png')}
            />
          ),
        }}
      />

      {/* PROFILE */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabItem
              focused={focused}
              label="Profile"
              icon={require('../assets/Icons/Shops.png')}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

/* 🔹 Reusable tab item */
const TabItem = ({ focused, icon, label }: any) => (
  <View style={{ alignItems: 'center' }}>
    <Image
      source={icon}
      style={{
        width: 22,
        height: 22,
        tintColor: focused ? '#FC156A' : '#8A8F9A',
      }}
    />
    <Text
      style={{
        fontSize: 12,
        marginTop: 4,
        color: focused ? '#FC156A' : '#8A8F9A',
      }}
    >
      {label}
    </Text>
  </View>
);
