import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type MenuRowProps = {
  label: string;
  path: string;
  leftIcon: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  color: "gray" | "green";
};

export default function HomeScreen() {
  return (
    <LinearGradient colors={["#f5d742", "#f7e9b3"]} style={styles.container}>
      <Text style={styles.title}>พิกัดยา</Text>

      <MenuRow
        label="Pre-test"
        path="/pretest"
        leftIcon={require("../assets/home/pretest.png")}
        color="gray"
      />

      <MenuRow
        label="Start"
        path="/start"
        leftIcon={require("../assets/home/herb.png")}
        rightIcon={require("../assets/home/click.png")}
        color="green"
      />

      <MenuRow
        label="Post-test"
        path="/posttest"
        leftIcon={require("../assets/home/pretest.png")}
        color="gray"
      />
    </LinearGradient>
  );
}

function MenuRow({ label, path, leftIcon, rightIcon, color }: MenuRowProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const tilt = useRef(new Animated.Value(0)).current;

  // 🔄 Tilt Animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(tilt, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(tilt, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [tilt]);

  const tiltRotation = tilt.interpolate({
    inputRange: [0, 1],
    outputRange: ["-10deg", "10deg"],
  });

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => router.push(path as any));
  };

  return (
    <View style={styles.row}>
      {/* Left icon animation */}
      <Animated.Image
        source={leftIcon}
        style={[
          styles.leftIcon,
          { transform: [{ rotate: tiltRotation }] }
        ]}
      />

      {/* Button */}
      <TouchableWithoutFeedback onPressIn={pressIn} onPressOut={pressOut}>
        <Animated.View
          style={[
            styles.button,
            color === "gray" && styles.grayButton,
            color === "green" && styles.greenButton,
            { transform: [{ scale }] },
          ]}
        >
          <Text style={styles.text}>{label}</Text>
        </Animated.View>
      </TouchableWithoutFeedback>

      {/* Right icon */}
      {rightIcon && <Image source={rightIcon} style={styles.rightIcon} />}
    </View>
  );
}

// ---------------- STYLES ----------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 60,
    fontWeight: "800",
    marginBottom: 40,
    alignContent: "center",
  },

  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 25,
  },

  button: {
    width: 300,
    height: 70,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20, // ⭐ ปรับเพื่อให้ icon ซ้ายไม่บังปุ่ม

    shadowColor: "#000",
    shadowOpacity: 4,
    shadowRadius: 2,
    shadowOffset: { width: 7, height: 9 },
    elevation: 6,
  },

  grayButton: {
    backgroundColor: "#d4d4d4",
  },

  greenButton: {
    backgroundColor: "#8bd969",
  },

  text: {
    fontSize: 46,
    fontWeight: "bold",
  },

  leftIcon: {
    width: 65,
    height: 65,
    resizeMode: "contain",
    marginRight: -35,
    zIndex: 10,
  },

  rightIcon: {
    width: 62,
    height: 62,
    marginLeft: -65,
    marginTop: 67,
    resizeMode: "contain",
  },
});
