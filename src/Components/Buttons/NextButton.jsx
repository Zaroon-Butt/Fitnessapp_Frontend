import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const NextButton = ({ onPress, title = 'Next', style, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.nextButton, style]} onPress={onPress}>
      <Text style={[styles.nextButtonText, textStyle]}>{title}</Text>
      <Text style={styles.nextArrow}>➤</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d0fd3e',
    width: 100,
    height: 48,
    borderRadius: 24,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginRight: 6,
  },
  nextArrow: {
    color: '#000000',
    fontSize: 24,
    lineHeight: 24,
    fontWeight: '600',
    textAlign: 'center',
    textAlignVertical: 'center', // Android vertical align
    includeFontPadding: false, // Android: tighter vertical alignment
  },
});

export default NextButton;
