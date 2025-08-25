import React from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { WorkoutDetailImage } from '../../utils';
import { medium, medium24, normal16, regular, regular16, regular9 } from '../../utils/Style';
import RF from 'react-native-responsive-fontsize';

const { width } = Dimensions.get('window');

const ProWorkoutModal = ({ visible, onCancel, onConfirm, workout }) => {
  if (!workout) return null;
    const handleModalConfirm = () => {
    navigation.navigate('ShowAllTrainers');
    setModalVisible(false);
    setSelectedWorkout(null);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setSelectedWorkout(null);
  };

  const handleNormalModalConfirm = () => {
    navigation.navigate('SubscriptionScreen');
    setNormalModalVisible(false);
    setSelectedWorkout(null);
  };

  const handleNormalModalCancel = () => {
    setNormalModalVisible(false);
    setSelectedWorkout(null);
  };


  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Workout Image with Gradient Overlay */}
          <View style={styles.imageContainer}>
            <Image
              source={WorkoutDetailImage}
              style={styles.image}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['rgba(28, 28, 30, 0.1)', 'rgba(28, 28, 30, 0.8)']}
              locations={[0, 1]}
              style={styles.gradientOverlay}
            />
          </View>

          {/* Text Content */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>{workout.title}</Text>
            <Text style={styles.subtitle}>
              <Text style={styles.redLine}>|</Text> {workout.subtitle}
            </Text>
            <View style={styles.proTag}>
              <Text style={styles.proText}>PRO</Text>
            </View>
          </View>

          {/* Buttons */}
          <TouchableOpacity style={styles.primaryButton} onPress={onConfirm}>
            <Text style={[regular16, { color: '#000' }]}>Take Appointment ➤</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onCancel}>
            <Text style={[regular16, { marginBottom: 20 }]}>Cancel </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ProWorkoutModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.9,
    backgroundColor: '#2C2C2E',
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  textContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: '100%',
  },
  title: {
    marginTop: 50,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#D3FF25',
    marginTop: 5,
  },
  redLine: {
    color: 'red',
    fontWeight: 'bold',
  },
  proTag: {
    position: 'absolute',
    right: 20,
    top: 60,
    backgroundColor: 'red',
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
  },
  proText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  primaryButton: {
    backgroundColor: '#D3FF25',
    paddingVertical: 14,
    borderRadius: 50,
    marginTop: 60,
    marginBottom: 15,
    width: '85%',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelText: {
    color: 'white',
    marginBottom: 20,
    fontSize: 16,
  },
});
