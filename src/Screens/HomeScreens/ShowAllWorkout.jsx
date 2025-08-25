import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useState } from 'react';
import WorkoutCategoriesBar from '../../Components/Navbar/WorkoutCategoryBar';
import BackButton from '../../Components/Buttons/BackButton';
import { WorkoutCard } from '../../Components/Cards/WorkoutCard';
import { normal16 } from '../../utils/Style';
import { useSubscriptionStatus } from '../../utils';
import { sampleWorkouts } from '../../SampleData/sampleWorkouts';
import ProUserModal from '../Modals/ProUserModal';
import UserModal from '../Modals/UserModal';
import { useNavigation } from '@react-navigation/native';

const ShowAllWorkout = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [normalModalVisible, setNormalModalVisible] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  
  // Use the custom hook to check subscription status
  const hasActiveSubscription = useSubscriptionStatus();

  const handleWorkoutPress = (workout) => {
    setSelectedWorkout(workout);
    // Show ProUserModal if user has an active subscription, otherwise show UserModal
    if (hasActiveSubscription) {
      setModalVisible(true);
    } else {
      setNormalModalVisible(true);
    }
  };

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

  const renderWorkoutItem = ({ item }) => (
    <View style={styles.workoutCardWrapper}>
      <WorkoutCard
        image={item.image}
        title={item.title}
        subtitle={item.subtitle}
        onPress={() => handleWorkoutPress(item)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <BackButton />
        <Text style={[normal16, { flex: 1, textAlign: 'center' }]}>Workout Categories</Text>
      </View>

      <View style={styles.categoriesBarWrapper}>
        <WorkoutCategoriesBar />
      </View>

      <FlatList
        contentContainerStyle={styles.flatListContent}
        data={sampleWorkouts}
        renderItem={renderWorkoutItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

      <ProUserModal
        visible={modalVisible}
        onCancel={handleModalCancel}
        onConfirm={handleModalConfirm}
        workout={selectedWorkout}
      />

      <UserModal
        visible={normalModalVisible}
        onCancel={handleNormalModalCancel}
        onConfirm={handleNormalModalConfirm}
        workout={selectedWorkout}
      />
    </View>
  );
};

export default ShowAllWorkout;

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
  categoriesBarWrapper: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  flatListContent: {
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  workoutCardWrapper: {
    marginBottom: 15,
    width: '100%',
  },
});
