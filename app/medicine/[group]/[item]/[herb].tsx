import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import data from "../../../../data/medicine.json";

// 1. Define the shape of your data
interface Herb {
  name: string;
  image: string;
  detail: string;
}

// 2. Define the shape of your route parameters
type HerbPageParams = {
  group: string;
  item: string;
  herb: string;
};

export default function HerbPage() {
  // 3. Use Generics for strict typing on params
  const { group, item, herb } = useLocalSearchParams<HerbPageParams>();
  const insets = useSafeAreaInsets();

  // Guard clause: Ensure params exist and are strings
  if (typeof group !== "string" || typeof item !== "string" || typeof herb !== "string") {
    return null;
  }

  // 4. Safe Data Access in TypeScript
  // We treat 'data' as a flexible Record to avoid "Element implicitly has an 'any' type" errors.
  const typedData = data as Record<string, Record<string, Herb[]>>;

  const groupData = typedData[group];
  
  // If group not found
  if (!groupData) return null;

  const herbs = groupData[item] || [];
  const herbData = herbs.find((h) => h.name === herb);

  // 5. Handle "Not Found" state
  if (!herbData) {    
    return (    
      <View style={{ flex: 1, backgroundColor: 'white', paddingTop: insets.top, paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 20, color: "red" }}>
          ไม่พบข้อมูลสมุนไพร: {herb}
        </Text>
      </View>
    );
  }   

  return (
    <LinearGradient colors={["#f5d742", "#f7e9b3"]} style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 20,
          // 6. Apply safe area insets via padding
          paddingTop: insets.top + 20, 
          paddingBottom: insets.bottom + 20,
        }}
      >
        <Text style={{ fontSize: 35, fontWeight: "bold" }}>
          ชื่อ: {herbData.name}
        </Text>

        {/* Image placeholder */}
        {/* <Image source={{ uri: herbData.image }} ... /> */}

        <Text style={{ marginTop: 20, fontSize: 18, lineHeight: 26 }}>
          สรรพคุณ: {herbData.detail || "ยังไม่มีรายละเอียด"}
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}