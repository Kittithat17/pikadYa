//medicine/[group]/index.tsx
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import data from "../../../data/medicine.json";
// import pic from "@assets/";

export default function GroupPage() {
  const { group } = useLocalSearchParams();
  const categories = Object.keys(data[group as keyof typeof data]);
  
  return (
    <LinearGradient colors={["#f5d742", "#f7e9b3"]} style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 60, fontWeight: "900", textAlign: "center", marginTop: 90 }}>
        {group}
      </Text>

      {categories.map((cat) => (
        <TouchableOpacity
          key={cat}
          style={{
            padding: 15,
            backgroundImage: "",
            backgroundColor: "#ddd",
            marginTop: 15,
            borderRadius: 20,
            marginVertical: 15,
          }}
          onPress={() => router.push(`/medicine/${group}/${cat}` as any)} // Use type assertion
        >
          <Text style={{ textAlign: "center", fontSize: 20 }}>{cat}</Text>
        </TouchableOpacity>
      ))}
    </LinearGradient>
  );
}
