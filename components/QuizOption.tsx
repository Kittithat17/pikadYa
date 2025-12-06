import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface QuizOptionProps {
  label: string;
  text: string;
  isSelected: boolean;
  onSelect: () => void;
}

export default function QuizOption({ label, text, isSelected, onSelect }: QuizOptionProps) {
  return (
    <TouchableOpacity style={styles.optionContainer} onPress={onSelect}>
      <View style={[styles.radio, isSelected && styles.radioSelected]}>
        {isSelected && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.optionText}>
        {label}. {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#666',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#4a7c20',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4a7c20',
  },
  optionText: {
    fontSize: 18,
    flex: 1,
  },
});