import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

export default function ResultScreen() {
  const { score, total, type } = useLocalSearchParams<{
    score: string;
    total: string;
    type: string;
  }>();

  const scoreNum = parseInt(score || '0');
  const totalNum = parseInt(total || '0');
  const percentage = Math.round((scoreNum / totalNum) * 100);

  const getMessage = () => {
    if (percentage >= 80) return 'ยอดเยี่ยม! 🎉';
    if (percentage >= 60) return 'ดีมาก! 👍';
    if (percentage >= 40) return 'พอใช้ ลองอ่านเพิ่มเติมนะ 📚';
    return 'ต้องปรับปรุง ลองศึกษาเนื้อหาอีกครั้ง 💪';
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          ผลคะแนน {type === 'pretest' ? 'Pre-test' : 'Post-test'}
        </Text>

        <View style={styles.scoreCircle}>
          <Text style={styles.scoreText}>{score}/{total}</Text>
          <Text style={styles.percentText}>{percentage}%</Text>
        </View>

        <Text style={styles.message}>{getMessage()}</Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.replace('/')}
        >
          <Text style={styles.primaryButtonText}>กลับหน้าหลัก</Text>
        </TouchableOpacity>

        {type === 'pretest' && (
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.replace('/start')}
          >
            <Text style={styles.secondaryButtonText}>เริ่มเรียนรู้</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5d742',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scoreCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#f5d742',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  percentText: {
    fontSize: 24,
    color: '#666',
  },
  message: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: '#4a7c20',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#d4d4d4',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});