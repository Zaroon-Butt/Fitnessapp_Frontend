import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Workout } from '../../utils';

export const WorkoutCard = ({ title, image, subtitle, onPress }) => {
  return (
    <TouchableOpacity style={styles.workoutCard} onPress={onPress}>
      <Image source={image ? image : Workout} style={styles.workoutImage} resizeMode="cover" />
      <View style={styles.workoutOverlay} />
      <View style={styles.workoutContent}>
        <Text style={styles.workoutTitle}>
          {title ? title : 'Workout Name'}
        </Text>
        <Text style={styles.workoutTime}>
          {subtitle ? subtitle : '30 mins'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  workoutCard: {
    backgroundColor: '#2c2c2e',
    borderRadius: 12,
    overflow: 'hidden',
    height: 192,
    position: 'relative',
  },
  workoutImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  workoutOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  workoutContent: {
    position: 'absolute',
    bottom: 16,
    left: 16,
  },
  workoutTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
    marginRight: 16,
  },
  workoutTime: {
    fontSize: 14,
    fontWeight: '500',
    color: '#d0fd3e',
  },
});
