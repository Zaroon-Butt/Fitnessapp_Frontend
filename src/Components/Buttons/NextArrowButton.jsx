import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Next } from '../../utils';

const NextArrowButton = ({ style ,onPress }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      style={[styles.nextButton, style]} 
      onPress={onPress}
      activeOpacity={0.8} 
    >
      <Image 
        source={Next} 
        style={styles.nextButtonImage}
        resizeMode="center"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
   nextButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1c1c1e',
    justifyContent: 'center',
    alignItems: 'center',
  },
   nextButtonImage: {
    width: 24,
    height: 24,
    left: 2,
  },
});

export default NextArrowButton;