import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { useNavigation } from "@react-navigation/native";

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  "PreferredShopsScreen"
>;

interface Props {
  visible: boolean;
  onClose: () => void;
}

const LocationModal: React.FC<Props> = ({ visible, onClose }) => {
  const navigation = useNavigation<NavProp>();

  const handleGrantAccess = () => {
    onClose();
    setTimeout(() => {
      navigation.navigate("PreferredShopsScreen");
    }, 200);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.iconBox}>
            <Image source={require('../assets/images/locationIcon.png')}/>
          </View>

          <Text style={styles.title}>Enable Location Access</Text>
          <Text style={styles.subtitle}>
            We need your location to find nearby shops and deliver items to you
          </Text>

          <View style={styles.row}>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.point}>Find shops nearest to you</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.point}>Accurate delivery location</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.point}>Better service recommendations</Text>
          </View>

          <TouchableOpacity style={styles.btn} onPress={handleGrantAccess}>
            <Text style={styles.btnText}>Grant Location Access →</Text>
          </TouchableOpacity>

          <Text style={styles.privacyText}>
            Your location data is secure and never shared with third parties
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default LocationModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 20,
    padding: 25,
  },
  iconBox: {
    width: 65,
    height: 65,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffe7f3",
    alignSelf: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 15,
  },
  subtitle: {
    textAlign: "center",
    color: "#777",
    marginTop: 6,
    marginBottom: 20,
  },
  row: { flexDirection: "row", alignItems: "center", marginVertical: 4 },
  dot: { fontSize: 24, color: "#ff2d87", marginRight: 6 },
  point: { fontSize: 15, color: "#333" },
  btn: {
    backgroundColor: "#ff2d87",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
  privacyText: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 12,
    color: "#777",
  },
});
