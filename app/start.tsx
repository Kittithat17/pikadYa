//app/start.tsx
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Startpage() {
  const groups = ["พิกัดยา 5", "พิกัดยา 7", "พิกัดยา 9", "พิกัดยา 10", "พิกัดยาพิเศษ"];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>พิกัดยา</Text>

      {groups.map((g) => (
        <TouchableOpacity
          key={g}
          style={styles.button}
          onPress={() => router.push(`/medicine/${g}` as any)} // Use type assertion
        >
          <Text style={styles.text}>{g}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 64, fontWeight: "bold", marginBottom: 20 },
  button: { padding: 15, backgroundColor: "#eee", borderRadius: 20, marginBottom: 10 ,width: "70%",marginVertical: 15},
  text: { fontSize: 18 , textAlign: "center" },
});
