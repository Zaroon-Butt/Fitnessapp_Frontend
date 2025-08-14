import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const BigButton = ({ text, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 12,
  },
  button: {
    width: 263,
    height: 50,
    backgroundColor: '#d0fd3e',
    borderRadius: 24,
    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#1c1c1e',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default BigButton;
