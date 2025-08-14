import React from 'react';
import { View, Text, Image, StyleSheet, Touchable, TouchableOpacity } from 'react-native';


const ExerciseDetailCard = ({ exercise, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Image source={exercise.image} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{exercise.title}</Text>
          {exercise.duration && (
            <Text style={styles.duration}>{exercise.duration}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ExerciseDetailCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 10,
    marginBottom: 16, // use marginBottom for spacing instead of marginTop
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  info: {
    marginLeft: 14,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  duration: {
    color: '#999',
    fontSize: 14,
  },
});
