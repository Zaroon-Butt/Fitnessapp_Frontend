import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BackButton = ({ style}) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity 
      style={[styles.backButton, style]} 
      activeOpacity={0.8} 
      onPress={handleGoBack}
    >
      <Image 
        source={require('../../images/BackButton.png')} 
        style={styles.backButtonImage}
        resizeMode="center"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
   backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2C2C2E',
    justifyContent: 'center',
    alignItems: 'center',
  },
   backButtonImage: {
    width: 24,
    height: 24,
    right:2
  },
});

export default BackButton;