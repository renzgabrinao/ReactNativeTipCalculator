import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { scale } from "react-native-size-matters";

const TIP_LIST = [
  {
    id: 0,
    name: "10%",
    value: 10,
  },
  {
    id: 1,
    name: "15%",
    value: 15,
  },
  {
    id: 2,
    name: "18%",
    value: 18,
  },
  {
    id: 3,
    name: "25%",
    value: 25,
  },
];

const ListItem = ({
  item,
  onPress,
  backgroundColor,
  textColor,
  borderColor,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, { backgroundColor, borderWidth: 2, borderColor }]}
  >
    <Text style={[styles.itemText, { color: textColor }]}>{item.name}</Text>
  </TouchableOpacity>
);

const ListHeader = () => (
  <View
    style={{
      paddingVertical: 10,
      paddingHorizontal: 20,
      flexDirection: "row",
      justifyContent: "center",
    }}
  >
    <Text style={{ fontSize: 25, color: "#fff" }}>Tip Options</Text>
  </View>
);

export default function App() {
  const [billAmount, setBillAmount] = useState(0);
  const [tipPercent, setTipPercent] = useState(0);

  const tipAmount = (billAmount * (tipPercent / 100)).toFixed(2);
  const total = parseFloat(billAmount + Number(tipAmount));

  const renderItem = ({ item }) => {
    const backgroundColor = item.value === tipPercent ? "#9E4784" : "#66347F";
    const borderColor = item.value === tipPercent ? "#D27685" : "#9E4784";
    const color = "white";
    return (
      <ListItem
        item={item}
        onPress={() => setTipPercent(item.value)}
        backgroundColor={backgroundColor}
        textColor={color}
        borderColor={borderColor}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bill Amount</Text>
      <Text style={styles.text}>${billAmount}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter bill amount"
        placeholderTextColor="#fff"
        keyboardType="numeric"
        onChangeText={(num) =>
          setBillAmount(() => {
            if (num === "") {
              return 0;
            } else {
              return Number(num);
            }
          })
        }
      />
      <FlatList
        style={{ width: scale(200), flexGrow: 0, marginVertical: scale(20) }}
        data={TIP_LIST}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={<ListHeader />}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        scrollEnabled={false}
        numColumns={2}
        horizontal={false}
      />

      <Text style={styles.text}>Tip Amount: ${tipAmount}</Text>
      <Text style={styles.text}>Total: ${total}</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#37306B",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: scale(35),
    marginBottom: scale(10),
  },
  input: {
    height: scale(50),
    width: scale(200),
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "#D27685",
    backgroundColor: "#66347F",
    textAlign: "center",
    fontSize: scale(20),
    color: "white",
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 32,
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(100),
    margin: scale(2),
  },
  itemText: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
