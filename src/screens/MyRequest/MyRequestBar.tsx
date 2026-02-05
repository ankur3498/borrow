// import {
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
//   useWindowDimensions,
// } from 'react-native';
// import React from 'react';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { RootStackParamList } from '../../navigation/types';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// type NavProp = NativeStackNavigationProp<RootStackParamList, 'MyRequest'>;

// const MyRequestBar = () => {
//   const { width, height } = useWindowDimensions();
//   const insets = useSafeAreaInsets();
//   const wp = (v: number) => (v / 390) * width;
//   const hp = (v: number) => (v / 812) * height;
//   const fp = (v: number) => (v / 390) * width;
//    const navigation = useNavigation<NavProp>();

//   return (
//     <View
//       style={{
//         position: 'absolute',
//         bottom: insets.bottom + hp(110),
//         left: wp(8),
//         right:wp(8),
//         flexDirection: 'row',
//         alignItems: 'center',
//         zIndex: 999,
//         elevation: 10,
//       }}
//     >
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: '#C10349',
//           borderRadius: wp(16),
//           paddingVertical: hp(15),
//           paddingHorizontal: wp(14),
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//         }}
//       >
//         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//           <View>
//             <Text
//               style={{
//                 color: '#f7f6f6',
//                 fontWeight: '400',
//                 fontSize: fp(14),
//               }}
//             >
//               1 item in cart
//             </Text>
//             <Text
//               style={{
//                 color: '#fff',
//                 fontSize: fp(16),
//                 opacity: 0.9,
//                 marginTop: hp(2),
//                 fontWeight: '700',
//               }}
//             >
//               ₹ 200
//             </Text>
//           </View>
//         </View>

//         <TouchableOpacity
//           style={{
//             backgroundColor: '#fff',
//             paddingHorizontal: wp(16),
//             paddingVertical: hp(6),
//             borderRadius: wp(8),
//             flexDirection:'row',
//             gap:5,
//             alignItems:'center'
//           }}
//           onPress={()=>navigation.navigate('MyRequest')}
//         >
//           <Text
//             style={{
//               color: '#FC156A',
//               fontWeight: '700',
//               fontSize: fp(12),
//             }}
//           >
//             Proceed
//           </Text>
//           <Image source={require('../../assets/Icons/cartIcon.png')} style={{height:16,width:16}}/>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default MyRequestBar;

import {
  Text,
  View,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'MyRequest'>;

type CartType = {
  [key: number]: number;
};

type Props = {
  cart: CartType;
  quantity: number;
};


const MyRequestBar: React.FC<Props> = ({ cart ,quantity }) => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const wp = (v: number) => (v / 390) * width;
  const hp = (v: number) => (v / 812) * height;
  const fp = (v: number) => (v / 390) * width;

  const navigation = useNavigation<NavProp>();

  if (quantity === 0) return null;

  return (
    <View
      style={{
        position: 'absolute',
        bottom: insets.bottom + hp(110),
        left: wp(8),
        right: wp(8),
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 999,
        elevation: 10,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: '#C10349',
          borderRadius: wp(16),
          paddingVertical: hp(15),
          paddingHorizontal: wp(14),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Text
            style={{
              color: '#f7f6f6',
              fontWeight: '400',
              fontSize: fp(14),
            }}
          >
            {quantity} item{quantity > 1 ? 's' : ''} in cart
          </Text>

          <Text
            style={{
              color: '#fff',
              fontSize: fp(16),
              opacity: 0.9,
              marginTop: hp(2),
              fontWeight: '700',
            }}
          >
            ₹ {quantity*450}
          </Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            paddingHorizontal: wp(16),
            paddingVertical: hp(6),
            borderRadius: wp(8),
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
          }}
          onPress={() =>
            navigation.navigate('MyRequest', {
              cart,
            })
          }
        >
          <Text
            style={{
              color: '#FC156A',
              fontWeight: '700',
              fontSize: fp(12),
            }}
          >
            Proceed
          </Text>

          <Image
            source={require('../../assets/Icons/cartIcon.png')}
            style={{ height: 16, width: 16 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyRequestBar;
