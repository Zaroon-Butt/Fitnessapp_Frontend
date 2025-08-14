import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useState } from 'react';
import BackButton from '../../Components/Buttons/BackButton';
import { normal16 } from '../../utils/Style';
import { OffRadioButton, OnRadioButton } from '../../utils';

const SettingScreen = () => {
  const [selectedUnit, setSelectedUnit] = useState('metric'); // 'metric' or 'imperial'
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <BackButton />
        <Text style={[normal16, { marginLeft: 70 }]}>Settings</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => setSelectedUnit('metric')}
        >
          <Text style={styles.buttonText}>Metric</Text>
          <Image style={styles.radioButton} source={selectedUnit === 'metric' ? OnRadioButton : OffRadioButton}></Image>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => setSelectedUnit('imperial')}
        >
          <Text style={styles.buttonText}>Imperial</Text>
          <Image style={styles.radioButton} source={selectedUnit === 'imperial' ? OnRadioButton : OffRadioButton}></Image>
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
    paddingVertical: 15,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 15,},
  radioButton: {
    width: 20,
    height: 20,
    marginRight: 20,
    resizeMode: 'contain',
  },
});

export default SettingScreen;
