// medicine/[group]/[item].tsx
import { router, useLocalSearchParams } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import data from "../../../data/medicine.json";

export default function ItemDetail() {
  const { group, item } = useLocalSearchParams();

  if (typeof group !== "string" || typeof item !== "string") return null;

  const groupData = data[group as keyof typeof data];
  if (!groupData) return null;

  const herbs = groupData[item as keyof typeof groupData] || [];

  return (
    <View style={{ flex: 1, padding: 20, }}>
      <Text style={{ fontSize: 39, fontWeight: "bold" ,marginTop: 70,textAlign: "center" }}>{item}</Text>

      {herbs.map((h, i) => (
        <TouchableOpacity
          key={i}
          style={{
            padding: 15,
            backgroundColor: "#eee",
            marginTop: 15,
            borderRadius: 15,
          }}
          onPress={() =>
            router.push(
              `/medicine/${group}/${item}/${encodeURIComponent(h.name)}`
            )
          }
        >
          <Text style={{ fontSize: 20,textAlign: "center" }}>{h.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
