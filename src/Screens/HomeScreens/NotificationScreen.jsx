import { View, Text, StyleSheet } from 'react-native';
import NotificationBar from '../../Components/Navbar/NotificationBar';
import { regular, regular16, regular9 } from '../../utils/Style';

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <NotificationBar />
      <Text style={[regular16, { textAlign: 'center' }]}>Notifications</Text>
      <Text style={[styles.subtitle, regular9]}>No new notifications</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
    paddingHorizontal: 24,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#c4c4c4',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default NotificationScreen;
