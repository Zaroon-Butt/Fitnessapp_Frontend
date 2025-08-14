import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import BackButton from '../../Components/Buttons/BackButton';
import { normal16 } from '../../utils/Style';

const Policy = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <BackButton />
        <Text style={[normal16,{marginLeft: 40}]}>Privacy Policy</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.policyText}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque, iste a libero quis alias qui optio error blanditiis laboriosam officiis rem impedit nobis tempora est facilis repudiandae ipsa perferendis porro. Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo sunt quis pariatur est quidem architecto! Nulla ipsum quibusdam consequatur accusantium, maiores minima, nesciunt voluptates voluptate quia ducimus, impedit deserunt dignissimos.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 30,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  policyText: {
    color: '#B5B5B5',
    fontSize: 16,
    textAlign: 'flex-start',
  },
});

export default Policy;
