import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Startpage() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Start</Text>
  
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text>กลับหน้าหลัก</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
    },
    backButton: {
      marginTop: 20,
      padding: 15,
      backgroundColor: '#ddd',
      borderRadius: 10,
    },
  });