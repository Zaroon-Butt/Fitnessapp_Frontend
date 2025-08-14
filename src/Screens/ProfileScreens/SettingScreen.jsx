import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import BackButton from '../../Components/Buttons/BackButton';
import NextArrowButton from '../../Components/Buttons/NextArrowButton';
import { normal16 } from '../../utils/Style';

const SettingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <BackButton />
        <Text style={[normal16, { marginLeft: 70 }]}>Settings</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('UnitSettingScreen')}
        >
          <Text style={styles.buttonText}>Unit of Measure</Text>
          <NextArrowButton
            onPress={() => navigation.navigate('UnitSettingScreen')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('NotificationSettingScreen')}
        >
          <Text style={styles.buttonText}>Notifications</Text>
          <NextArrowButton
            onPress={() => navigation.navigate('NotificationSettingScreen')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('LanguageSettingScreen')}
        >
          <Text style={styles.buttonText}>Language</Text>
          <NextArrowButton
            onPress={() => navigation.navigate('LanguageSettingScreen')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SettingScreen')}
        >
          <Text style={styles.buttonText}>Contact Us</Text>
          <NextArrowButton
            onPress={() => navigation.navigate('SettingScreen')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#1c1c1e',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 30,
  },
  buttonContainer: {
    marginTop: 40,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1c1c1e',
    borderBottomColor: '#2c2c2e',
    borderBottomWidth: 2,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SettingScreen;
