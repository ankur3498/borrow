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

type NavProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

const shops = [
  {
    id: '1',
    name: 'Reddy Kirana & General Stores',
    area: 'Jayanagar, Bangalore',
    distance: '3.5 km',
  },
  {
    id: '2',
    name: 'Reddy Kirana & General Stores',
    area: 'Jayanagar, Bangalore',
    distance: '3.5 km',
  },
  {
    id: '3',
    name: 'Reddy Kirana & General Stores',
    area: 'Jayanagar, Bangalore',
    distance: '3.5 km',
  },
];

const PreferredShopsScreen = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const navigation = useNavigation<NavProp>();

  const { width, height } = useWindowDimensions();
  const wp = (v: number) => (v / 390) * width;
  const hp = (v: number) => (v / 812) * height;
  const fp = (v: number) => (v / 390) * width;

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id],
    );
  };

  return (
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
            <Text style={[styles.locationText, { fontSize: fp(15) }]}>
              Koramangala
            </Text>
            <Text style={[styles.locationText, { fontSize: fp(15) }]}>
              Bangalore Karnataka
            </Text>
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
              onPress={() => toggleSelect(item.id)}
              style={[
                styles.shopCard,
                {
                  padding: wp(12),
                  marginTop: hp(16),
                  borderRadius: wp(10),
                },
                isSelected && styles.shopCardSelected,
              ]}
            >
              <View
                style={[
                  styles.iconWrapper,
                  {
                    width: wp(40),
                    height: wp(40),
                    borderRadius: wp(20),
                    marginRight: wp(15),
                  },
                  isSelected && styles.iconWrapperSelected,
                ]}
              >
                <Image
                  source={require('../assets/Icons/ShopsIcon.png')}
                  style={{
                    width: wp(28),
                    height: wp(28),
                    tintColor: isSelected ? '#fff' : '#7b7b7b',
                  }}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  numberOfLines={1}
                  style={[styles.shopName, { fontSize: fp(15) }]}
                >
                  {item.name}
                </Text>
                <Text
                  style={[
                    styles.shopArea,
                    { fontSize: fp(13), marginTop: hp(2) },
                  ]}
                >
                  {item.area}
                </Text>
              </View>

              <Text
                style={[
                  styles.distanceText,
                  { fontSize: fp(14), marginBottom: hp(15) },
                ]}
              >
                {item.distance}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      <View
        style={[
          styles.bottomBtnWrapper,
          {
            paddingHorizontal: wp(22),
            bottom: hp(24),
          },
        ]}
      >
        <TouchableOpacity
          disabled={selectedIds.length === 0}
          onPress={() => navigation.replace('MainTabs')}
          style={[
            styles.bottomBtn,
            {
              paddingVertical: hp(16),
              borderRadius: wp(14),
            },
            selectedIds.length > 0 && styles.bottomBtnActive,
          ]}
        >
          <Text style={[styles.bottomBtnText, { fontSize: fp(17) }]}>
            Verify & Login →
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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

  shopCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },

  shopCardSelected: {
    borderColor: '#ff2d87',
    borderWidth: 2,
    backgroundColor: '#fff0f6',
  },

  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },

  iconWrapperSelected: { backgroundColor: '#FC156A' },

  shopName: { fontWeight: '600', color: '#000' },
  shopArea: { color: '#606060' },
  distanceText: { color: '#FC156A', fontWeight: '600' },

  bottomBtnWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
  },

  bottomBtn: {
    backgroundColor: '#d5d5d5',
    alignItems: 'center',
  },

  bottomBtnActive: { backgroundColor: '#FC156A' },
  bottomBtnText: { color: '#fff', fontWeight: '700' },
});
