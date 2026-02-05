import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';
import Screen from './Screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Modal } from 'react-native';
import MapScreen from './MapScreen';
type NavProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

const shops = [
  {
    id: '1',
    ownerName: 'Anjali Sharma',
    name: 'Reddy Kirana & General Stores',
    area: 'Jayanagar, Bangalore',
    distance: '3.5 km',
  },
  {
    id: '2',
    ownerName: 'Rajesh Pal',
    name: 'Reddy Kirana & General Stores',
    area: 'Jayanagar, Bangalore',
    distance: '3.5 km',
  },
  {
    id: '3',
    ownerName: 'Sneha Verma',
    name: 'Reddy Kirana & General Stores',
    area: 'Jayanagar, Bangalore',
    distance: '3.5 km',
  },
];
import { Animated, PanResponder, Dimensions } from 'react-native';

const PreferredShopsScreen = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const navigation = useNavigation<NavProp>();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const wp = (v: number) => (v / 390) * width;
  const hp = (v: number) => (v / 812) * height;
  const fp = (v: number) => (v / 390) * width;
  const [showMap, setShowMap] = useState(false);
  const SCREEN_HEIGHT = Dimensions.get('window').height;

  const COLLAPSED_HEIGHT = SCREEN_HEIGHT * 0.45; // half
  const EXPANDED_HEIGHT = SCREEN_HEIGHT * 0.85; // almost full
  const sheetHeight = React.useRef(
    new Animated.Value(COLLAPSED_HEIGHT),
  ).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gesture) => {
      return Math.abs(gesture.dy) > 10;
    },

    onPanResponderMove: (_, gesture) => {
      let newHeight = COLLAPSED_HEIGHT - gesture.dy;

      if (newHeight < COLLAPSED_HEIGHT) newHeight = COLLAPSED_HEIGHT;

      if (newHeight > EXPANDED_HEIGHT) newHeight = EXPANDED_HEIGHT;

      sheetHeight.setValue(newHeight);
    },

    onPanResponderRelease: (_, gesture) => {
      if (gesture.dy < -50) {
        // swipe up
        Animated.spring(sheetHeight, {
          toValue: EXPANDED_HEIGHT,
          useNativeDriver: false,
        }).start();
      } else if (gesture.dy > 50) {
        // swipe down
        Animated.spring(sheetHeight, {
          toValue: COLLAPSED_HEIGHT,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id],
    );
  };
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 28.6139,
    longitude: 77.209,
  });

  const [selectedAddress, setSelectedAddress] = useState(
    'Koramangala, Bangalore',
  );

  return (
    <Screen bg="#F3F3F3" barStyle="dark-content">
      <SafeAreaView style={[styles.container, { paddingHorizontal: wp(24) }]}>
        <View
          style={[
            styles.headerIconBox,
            {
              width: wp(72),
              height: wp(72),
              borderRadius: wp(36),
              marginTop: hp(32),
            },
          ]}
        >
          <Image
            source={require('../assets/Icons/ShopsIcon.png')}
            style={{ width: wp(32), height: wp(32), tintColor: '#ff2d87' }}
          />
        </View>

        <Text style={[styles.title, { fontSize: fp(26), marginTop: hp(20) }]}>
          Select Preferred Shops
        </Text>

        <Text style={[styles.subtitle, { fontSize: fp(15), marginTop: hp(4) }]}>
          Choose shops you want to borrow items from
        </Text>

        <View
          style={[
            styles.locationCard,
            {
              marginTop: hp(25),
              marginBottom: hp(20),
              padding: wp(18),
              borderRadius: wp(14),
            },
          ]}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <Image
              source={require('../assets/Icons/locationIcon.png')}
              style={{
                width: wp(20),
                height: wp(20),
                marginRight: wp(15),
              }}
            />
            <View>
              <Text style={styles.locationText}>{selectedAddress}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.changeBtn,
              {
                paddingHorizontal: wp(18),
                paddingVertical: hp(8),
                borderRadius: wp(10),
              },
            ]}
            onPress={() => setShowMap(true)}
          >
            <Text style={[styles.changeBtnText, { fontSize: fp(14) }]}>
              Change
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={shops}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: hp(160) }}
          renderItem={({ item }) => {
            const isSelected = selectedIds.includes(item.id);
            return (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => toggleSelect(item.id)}
                style={[styles.shopCard, isSelected && styles.shopCardSelected]}
              >
                <View style={styles.shopTopRow}>
                  <View style={styles.shopIconWrap}>
                    <Image
                      source={require('../assets/Icons/ShopsIcon.png')}
                      style={styles.shopIcon}
                    />
                  </View>

                  <Text style={styles.ownerName}>{item.ownerName}</Text>
                </View>
                <View style={styles.shopDivider} />
                <View style={styles.shopBottomRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.shopName}>{item.name}</Text>
                    <Text style={styles.shopArea}>{item.area}</Text>
                  </View>

                  <Text style={styles.distanceText}>{item.distance}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />

        <View
          style={{
            paddingBottom: Math.max(insets.bottom, hp(34)),
            paddingTop: hp(12),
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            disabled={selectedIds.length === 0}
            onPress={() => navigation.replace('MainTabs')}
            style={[
              styles.bottomBtn,
              {
                paddingVertical: hp(16),
                borderRadius: wp(14),
                width: wp(345),
                flexDirection: 'row',
                gap: wp(8),
                justifyContent: 'center',
              },
              selectedIds.length > 0 && styles.bottomBtnActive,
            ]}
          >
            <Text style={[styles.buttonText, { fontSize: fp(16) }]}>
              Verify & Login
            </Text>
            <Image
              source={require('../assets/Icons/sideArrow.png')}
              style={{ height: hp(20), width: wp(20) }}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <Modal
        visible={showMap}
        animationType="slide"
        transparent
        onRequestClose={() => setShowMap(false)}
      >
        <View style={styles.overlay}>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={() => setShowMap(false)}
          />

          <View style={styles.sheet}>
            <View style={styles.sheetHeader}>
              <View style={styles.dragHandle} />
              <TouchableOpacity onPress={() => setShowMap(false)}>
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <MapScreen
                location={selectedLocation}
                onLocationChange={setSelectedLocation}
                onAddressChange={setSelectedAddress}
              />
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  );
};

export default PreferredShopsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  headerIconBox: {
    backgroundColor: '#ffe7f3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  title: { fontWeight: '700', color: '#000' },
  subtitle: { color: '#6b6b6b' },

  locationCard: {
    backgroundColor: '#f7f7f7',
    flexDirection: 'row',
    alignItems: 'center',
  },

  locationText: { color: '#333', fontWeight: '500' },

  changeBtn: { backgroundColor: '#FC156A' },
  changeBtnText: { color: '#fff', fontWeight: '600' },

  // shopCard: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   borderWidth: 1,
  //   borderColor: '#eee',
  //   backgroundColor: '#fff',
  // },

  // shopCardSelected: {
  //   borderColor: '#ff2d87',
  //   borderWidth: 1,
  //   backgroundColor: '#fff0f6',
  // },

  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },

  iconWrapperSelected: { backgroundColor: '#FC156A' },

  // shopName: { fontWeight: '600', color: '#000' },
  // shopArea: { color: '#606060' },
  // distanceText: { color: '#FC156A', fontWeight: '600' },

  bottomBtn: {
    backgroundColor: '#d5d5d5',
    alignItems: 'center',
  },

  bottomBtnActive: { backgroundColor: '#FC156A' },
  bottomBtnText: { color: '#fff', fontWeight: '700' },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },

  sheet: {
    height: '60%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },

  sheetHeader: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ccc',
    marginBottom: 6,
  },

  closeText: {
    color: '#FC156A',
    fontWeight: '600',
  },
  shopCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginTop: 16,
    borderWidth: 1.2,
    borderColor: '#E5E7EB',
  },

  shopCardSelected: {
    borderColor: '#FC156A',
    borderWidth: 1,
    backgroundColor: '#fff0f6',
  },

  shopTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  shopIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FC156A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  shopIcon: {
    width: 24,
    height: 24,
    tintColor: '#ffff',
  },
  
  ownerName: {
    fontSize: 16,
    fontWeight: '400',
    color: '#111827',
  },

  shopDivider: {
    height: 1,
    backgroundColor: '#EDEEF0',
    marginVertical: 14,
  },

  shopBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  shopName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },

  shopArea: {
    fontSize: 15,
    color: '#6B7280',
    marginTop: 6,
  },

  distanceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FC156A',
    marginLeft: 14,
  },
});
