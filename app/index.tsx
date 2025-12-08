import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>พิกัดยา</Text>

      <TouchableOpacity
        style={styles.buttonGray}
        onPress={() => router.push('/pretest')}
      >
        <Text style={styles.buttonText}>Pre-test</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonGray}
        onPress={() => router.push('/start')}
      >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonGray}
        onPress={() => router.push('/posttest')}
      >
        <Text style={styles.buttonText}>Post-test</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5d742',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  buttonGray: {
    backgroundColor: '#d4d4d4',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonGreen: {
    backgroundColor: '#7ed957',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});