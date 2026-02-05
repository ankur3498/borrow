import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';

import React, { useState, useRef } from 'react';
import { ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { category } from '../../components/data';
import { shops } from '../../components/data';
import BestSellers from './BestSellers';
import QuickPicks from './QuickPicks';
import HomeScreen2 from './FrequentlyOrdered';
import Screen from '../Screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TrackOrderBar from './TrackOrder';
import MyRequestBar from '../MyRequest/MyRequestBar';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const HomeScreen = () => {
  const { width, height } = useWindowDimensions();
  const wp = (v: number) => (v / 390) * width;
  const hp = (v: number) => (v / 812) * height;
  const fp = (v: number) => (v / 390) * width;
  const insets = useSafeAreaInsets();
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const totalQty = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const [activeIndex, setActiveIndex] = useState(0);
  const allCategory = category.find(item => item.name === 'All');
  
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(
    allCategory ? allCategory.id : null,
  );
  const onViewRef = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  });
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const panelAnim = useRef(new Animated.Value(0)).current;

  const openPanel = () => {
    setIsPanelOpen(true);

    Animated.timing(panelAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const closePanel = () => {
    Animated.timing(panelAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start(() => {
      setIsPanelOpen(false);
    });
  };

  const panelTranslateX = panelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [wp(80), 0],
  });

  return (
    <Screen bg="#FFFFFF" barStyle="light-content">
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
        contentContainerStyle={{ paddingBottom: hp(80) }}
      >
        <View
          style={{
            backgroundColor: '#C10349',
            paddingHorizontal: wp(16),
            paddingTop: hp(52),
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View>
              <Text style={{ fontSize: fp(15), color: '#FFF' }}>
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
                  <Text style={{ opacity: 0, fontSize: fp(24) }}>
                    4 minutes
                  </Text>
                </LinearGradient>
              </MaskedView>
            </View>

            <TouchableOpacity
              style={{
                width: wp(36),
                height: wp(36),
                borderRadius: wp(18),
                backgroundColor: 'rgba(255,255,255,0.2)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                source={require('../../assets/Icons/dotsIcon.png')}
                style={{ width: wp(20), height: wp(20), tintColor: '#fff' }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#C10349',
            paddingHorizontal: wp(16),
            paddingTop: insets.top > 0 ? hp(3) : hp(0),
            paddingBottom: hp(14),
            borderBottomLeftRadius: wp(16),
            borderBottomRightRadius: wp(16),
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              marginTop: hp(14),
              alignItems: 'center',
            }}
          >
            <View
              style={{
                height: hp(48),
                borderRadius: hp(14),
                backgroundColor: '#FFF',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: wp(16),
                width: wp(245),
                marginRight: wp(10),
              }}
            >
              <Image
                source={require('../../assets/Icons/SearchIcon.png')}
                style={{ width: wp(18), height: wp(18), marginRight: wp(10) }}
              />
              <TextInput
                placeholder="Search for products..."
                placeholderTextColor="#8A8F9A"
                style={{ flex: 1, fontSize: fp(15), color: '#202735' }}
              />
            </View>

            <View
              style={{
                height: hp(48),
                width: wp(105),
                borderRadius: hp(14),
                backgroundColor: '#FFC43C',
                overflow: 'hidden',
                justifyContent: 'center',
              }}
            >
              <FlatList
                data={shops}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewConfigRef.current}
                renderItem={({ item }) => (
                  <View
                    style={{
                      width: wp(105),
                      height: hp(48),
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Image
                      source={item.image}
                      style={{
                        width: wp(16),
                        height: wp(16),
                        marginRight: wp(6),
                      }}
                    />
                    <Text
                      style={{
                        fontSize: fp(14),
                        fontWeight: '700',
                        color: '#1A1A1A',
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                )}
              />

              <View
                pointerEvents="none"
                style={{
                  position: 'absolute',
                  bottom: hp(4.5),
                  alignSelf: 'center',
                  flexDirection: 'row',
                }}
              >
                {shops.map((_, index) => (
                  <View
                    key={index}
                    style={{
                      width: activeIndex === index ? 6 : 6,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor:
                        activeIndex === index ? '#202735' : '#00000033',
                      marginHorizontal: 2,
                    }}
                  />
                ))}
              </View>
            </View>
          </View>
          <View style={{ marginTop: hp(14) }}>
            <FlatList
              data={category}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              contentContainerStyle={{ gap: wp(24) }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => setActiveCategoryId(item.id)}
                  style={{ alignItems: 'center' }}
                >
                  <Image
                    source={item.image}
                    style={{
                      width: wp(24),
                      height: wp(24),
                      marginBottom: hp(6),
                      tintColor: '#FFF',
                    }}
                  />
                  <Text
                    style={{
                      fontSize: fp(14),
                      fontWeight: activeCategoryId === item.id ? '500' : '400',
                      color:
                        activeCategoryId === item.id ? '#FFF' : '#FFFFFF99',
                    }}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>

        {/* <HomeScreen2 /> */}
        <BestSellers cart={cart} setCart={setCart} />
        <QuickPicks cart={cart} setCart={setCart} />
      </ScrollView>
      {totalQty > 0 && <MyRequestBar quantity={totalQty} cart={cart} />}

      {/* <TrackOrderBar /> */}

      {!isPanelOpen && (
        <TouchableOpacity
          onPress={openPanel}
          style={{
            position: 'absolute',
            right: 0,
            bottom: insets.bottom + hp(120),
            width: wp(16),
            height: wp(47),
            borderTopLeftRadius: wp(8),
            borderBottomLeftRadius: wp(8),
            backgroundColor: '#3EC100',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            elevation: 12,
          }}
        >
          <Image
            source={require('../../assets/Icons/arrowicon.png')}
            style={{
              width: wp(18),
              height: wp(18),
              tintColor: '#fff',
            }}
          />
        </TouchableOpacity>
      )}
      {isPanelOpen && (
        <Animated.View
          style={{
            position: 'absolute',
            right: 0,
            bottom: insets.bottom + hp(120),
            transform: [{ translateX: panelTranslateX }],
            height: wp(47),
            paddingHorizontal: wp(14),
            backgroundColor: '#3EC100',
            borderTopLeftRadius: wp(12),
            borderBottomLeftRadius: wp(12),
            flexDirection: 'row',
            alignItems: 'center',
            zIndex: 999,
            elevation: 11,
          }}
        >
          <TouchableOpacity onPress={closePanel}>
            <Image
              source={require('../../assets/Icons/callIcon.png')}
              style={{
                width: wp(18),
                height: wp(18),
                tintColor: '#fff',
              }}
            />
          </TouchableOpacity>
        </Animated.View>
      )}
    </Screen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
