import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

const NextButton = ({ onPress, title = 'Next', style, textStyle, disabled = false, loading = false }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.nextButton, 
        style,
        disabled && styles.disabledButton
      ]} 
      onPress={disabled ? null : onPress}
      disabled={disabled}
    >
      {loading ? (
        <ActivityIndicator color="#000000" size="small" />
      ) : (
        <>
          <Text style={[styles.nextButtonText, textStyle, disabled && styles.disabledText]}>
            {title}
          </Text>
          <Text style={[styles.nextArrow, disabled && styles.disabledText]}>➤</Text>
        </>
      )}
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
  disabledButton: {
    backgroundColor: '#6c6c6c',
    opacity: 0.6,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginRight: 6,
  },
  disabledText: {
    color: '#333333',
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
