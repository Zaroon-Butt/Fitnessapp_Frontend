import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { CardBackground } from '../../utils';

const BankCard = ({ name, number }) => {
  return (
    <ImageBackground
      source={CardBackground}
      style={styles.card}
      imageStyle={styles.image}
    >
      <Text style={styles.visa}>VISA</Text>
      <View style={styles.cardDetails}>
        <Text style={styles.name}>{name || 'HOLDER NAME'}</Text>
        <Text style={styles.number}>{number || '0000 0000 0000 0000'}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 327,
    height: 176,
    borderRadius: 20,
    overflow: 'hidden',
    padding: 20,
    justifyContent: 'space-between',
  },
  image: {
    resizeMode: 'cover',
    borderRadius: 20,
  },
  visa: {
    position: 'absolute',
    top: 20,
    right: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  cardDetails: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  name: {
    color: 'white',
    fontSize: 15,
    marginBottom: 8,
  },
  number: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default BankCard;
