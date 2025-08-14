import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Next } from '../../utils';
import { useNavigation } from '@react-navigation/native';



const TrainerDetailCard = ({ name, rating, specialty, experience, image, trainer, style, showNextButton = true }) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.trainerCard, style]}>
      <Image source={image} style={styles.trainerImage} />
      <View style={styles.trainerInfo}>
        <View style={styles.nameAndRating}>
          <Text style={styles.trainerName}>{name}</Text>
          <View style={styles.ratingBox}>
            <Text style={styles.trainerRating}>{rating}</Text>
          </View>
        </View>
        <Text style={styles.trainerSpecialty}>{specialty}</Text>

        <Text style={styles.trainerExperience}>
          {experience} 
        </Text>
      </View>
      {showNextButton && (
        <View style={styles.nextButton}>
          <TouchableOpacity onPress={() => navigation.navigate('TrainerDetail', { trainer: trainer || { name, rating, specialty, experience, image } })}>
            <Image source={Next} style={styles.nextIcon} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default TrainerDetailCard;

const styles = StyleSheet.create({
  trainerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
  },
  trainerImage: {
    width: 70,
    height: 70,
    borderRadius: 30,
  },
  trainerInfo: {
    marginLeft: 14,
    flex: 1,
  },
  trainerName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  nameAndRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingBox: {
    backgroundColor: '#D0FD3E',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 4,
  },
  trainerSpecialty: {
    color: '#D0FD3E',
    fontSize: 12,
    marginTop: 2,
  },
  trainerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    alignItems: 'center',
  },
  trainerExperience: {
    color: '#999',
    fontSize: 12,
    marginTop: 4,
  },
  trainerRating: {
    color: 'black',
    fontSize: 11,
    fontWeight: '500',
  },
  nextButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: 40,
    height: 40,
  },
  nextIcon: {
    width: 12,
    height: 20,
  },
});
