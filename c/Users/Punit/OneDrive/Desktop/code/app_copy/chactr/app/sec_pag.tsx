
import { Text, View } from "react-native";
import QRCode from 'react-native-qrcode-svg';

export default function sec_pag() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>this is second page</Text>
      <QRCode
        value="http://awesome.link.qr"
        size={200}
      />
    </View>
  );
}
