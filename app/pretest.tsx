import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import QuizOption from '../components/QuizOption';
import questionsData from '../data/questions.json';
import { Question } from '../types/quiz';

export default function PreTestScreen() {
  const questions: Question[] = questionsData.pretest;
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const handleSelectOption = (questionId: number, label: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: label,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    // Check if all questions are answered
    const unanswered = questions.filter(q => !answers[q.id]);
    
    if (unanswered.length > 0) {
      Alert.alert(
        'ยังตอบไม่ครบ',
        `กรุณาตอบคำถามข้อที่ ${unanswered.map(q => q.id).join(', ')}`,
        [{ text: 'ตกลง' }]
      );
      return;
    }

    const score = calculateScore();
    router.push({
      pathname: '/result',
      params: {
        score: score.toString(),
        total: questions.length.toString(),
        type: 'pretest',
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pre-test</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {questions.map((question, index) => (
          <View key={question.id} style={styles.questionContainer}>
            <Text style={styles.questionText}>
              {question.id}. {question.question}
            </Text>
            
            {question.options.map(option => (
              <QuizOption
                key={option.label}
                label={option.label}
                text={option.text}
                isSelected={answers[question.id] === option.label}
                onSelect={() => handleSelectOption(question.id, option.label)}
              />
            ))}
          </View>
        ))}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>ส่งคำตอบ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>กลับหน้าหลัก</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5d742',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#8B6914',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  questionContainer: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#4a7c20',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#d4d4d4',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  backButtonText: {
    fontSize: 18,
  },
});