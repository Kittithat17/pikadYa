import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import data from "../../../../data/medicine.json";

export default function HerbPage() {
  const { group, item, herb } = useLocalSearchParams();

  if (
    typeof group !== "string" ||
    typeof item !== "string" ||
    typeof herb !== "string"
  )
    return null;

  // ✅ TYPE SAFE
  const groupData = data[group as keyof typeof data];
  if (!groupData) return null;

  // ✅ TYPE SAFE
  const herbs =
    groupData[item as keyof typeof groupData] || [];

  const herbData = herbs.find((h) => h.name === herb);

  if (!herbData) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, color: "red" }}>
          ไม่พบข้อมูลสมุนไพร: {herb}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      {/* ชื่อสมุนไพร */}
      <Text style={{ fontSize: 35, fontWeight: "bold" }}>
        ชื่อ:{herbData.name}
      </Text>

      {/* ไม่มีรูปตอนนี้ → ข้ามไป */}

      {/* รายละเอียดสมุนไพร */}
      <Text style={{ marginTop: 20, fontSize: 18, lineHeight: 26 }}>
        สรรพคุณ:{herbData.detail || "ยังไม่มีรายละเอียด"}
      </Text>
    </ScrollView>
  );
}
