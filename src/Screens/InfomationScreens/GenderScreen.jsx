import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Female, Male } from '../../utils';
import { bold, light, normal, regular, medium } from '../../utils/Style';
import NextButton from '../../Components/Buttons/NextButton';
import { RF } from '../../utils/responsive';

export default function GenderSelectionScreen() {
  const [selectedGender, setSelectedGender] = useState('male');
  const navigation = useNavigation();

  const handleNext = () => {
    console.log('Gender selected:', selectedGender);
    navigation.navigate('AgeScreen');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={[medium, { fontSize: RF(16) }]}>TELL US ABOUT YOURSELF</Text>
        <Text style={[regular, { marginTop: 10 }]}>TO GIVE YOU A BETTER EXPERIENCE WE NEED</Text>
        <Text style={[regular, { fontSize: RF(10) }]}>TO KNOW YOUR GENDER</Text>
      </View>

      {/* Gender Selection */}
      <View style={styles.genderContainer}>
        {/* Male Option */}
        <TouchableOpacity
          onPress={() => setSelectedGender('male')}
          style={[
            styles.genderButton,
            selectedGender === 'male'
              ? styles.selectedGender
              : styles.unselectedGender,
          ]}
        >
          <Image resizeMode='contain'
            source={Male}
            style={[
              styles.icon,
              { tintColor: selectedGender === 'male' ? 'black' : 'white', },
            ]}
          />
          <Text
            style={[
              styles.genderText,
              selectedGender === 'male'
                ? styles.selectedText
                : styles.unselectedText,
            ]}
          >
            Male
          </Text>
        </TouchableOpacity>

        {/* Female Option */}
        <TouchableOpacity
          onPress={() => setSelectedGender('female')}
          style={[
            styles.genderButton,
            selectedGender === 'female'
              ? styles.selectedGender
              : styles.unselectedGender,
          ]}
        >
          <Image
            source={Female}
            style={[
              styles.icon,
              { tintColor: selectedGender === 'female' ? 'black' : 'white' },
            ]}
          />
          <Text
            style={[
              styles.genderText,
              selectedGender === 'female'
                ? styles.selectedText
                : styles.unselectedText,
            ]}
          >
            Female
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <NextButton 
          onPress={handleNext}
          style={styles.nextButtonPosition}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 64,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 24,
  },
  genderContainer: {
    alignItems: 'center',
    gap: 32,
    marginBottom: 80,
  },
  genderButton: {
    width: 192,
    height: 192,
    borderRadius: 192 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedGender: {
    backgroundColor: '#d0fd3e',
  },
  unselectedGender: {
    backgroundColor: '#2c2c2e',
  },
  icon: {
    marginBottom: 12,
  },
  genderText: {
    fontSize: 20,
    fontWeight: '600',
  },
  selectedText: {
    color: 'black',
  },
  unselectedText: {
    color: 'white',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 32,
    right: 24,
  },

});
