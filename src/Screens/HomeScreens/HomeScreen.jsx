import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { WorkoutCard } from '../../Components/Cards/WorkoutCard';
import { normal, regular9 } from '../../utils/Style';
import { useSubscriptionStatus } from '../../utils';
import WorkoutCategoriesBar from '../../Components/Navbar/WorkoutCategoryBar';
import {
  sampleWorkouts,
  todayWorkout,
  newWorkout,
} from '../../SampleData/sampleWorkouts';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import ProUserModal from '../Modals/ProUserModal';
import UserModal from '../Modals/UserModal';
import { useSelector } from 'react-redux';

const { width: screenWidth } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [normalModalVisible, setNormalModalVisible] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  
  // Use the custom hook to check subscription status
  const hasActiveSubscription = useSubscriptionStatus();

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

  const handleWorkoutPress = workout => {
    setSelectedWorkout(workout);
    // Show ProUserModal if user has an active subscription, otherwise show UserModal
    if (hasActiveSubscription) {
      setModalVisible(true);
    } else {
      setNormalModalVisible(true);
    }
  };

  const renderWorkoutItem = ({ item }) => (
    <View style={{ marginRight: 15, width: 320 }}>
      <WorkoutCard
        image={item.image}
        title={item.title} 
        subtitle={item.subtitle}
        onPress={handleWorkoutPress}
      />
    </View>
  );

  const renderNewWorkoutItem = ({ item }) => (
    <View style={{ marginRight: 15, width: 160 }}>
      <WorkoutCard
        image={item.image}
        title={item.title}
        subtitle={item.subtitle}
        onPress={() =>
          navigation.navigate('WebviewScreen', {
            url: item.url,
            title: item.title,
          })
        }
      />
    </View>
  );

  const isUsername = useSelector(state => state.user.isUsername);
  const Today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[normal, { textAlign: 'left' }]}>{isUsername}</Text>
        <Text style={[regular9, { textAlign: 'left', marginTop: 10 }]}>
          Good Morning
        </Text>

        {/* Today Workout Section */}
        <View style={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}
          >
            <Text style={[regular9, { textAlign: 'left' }]}>
             Workout Types {/* Today Workout Plan */}
            </Text>
            <Text style={[regular9, { textAlign: 'right', color: '#D0FD3E' }]}>
              {Today}
            </Text>
          </View>
          <WorkoutCard
            image={todayWorkout.image}
            title={'All Workouts'}
            // title={todayWorkout.title}
            // subtitle={todayWorkout.subtitle}
            onPress={() => navigation.navigate('WorkoutTypes')}
          />
        </View>

        {/* Workout Categories */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          <Text style={[regular9, { textAlign: 'left' }]}>
          Special Trainings {/* // Workout Categories */}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('ShowAllWorkout')}
          >
            <Text style={[regular9, { textAlign: 'right', color: '#D0FD3E' }]}>
              See All
            </Text>
          </TouchableOpacity>
        </View>

        {/*  Workout Navbar */}
        <View style={{ marginTop: 10 }}>
          <WorkoutCategoriesBar />
        </View>

        {/* Featured Workouts */}
        <View style={{ width: screenWidth }}>
          <FlatList
            data={sampleWorkouts}
            renderItem={renderWorkoutItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
            style={{ marginTop: 2 }}
          />
        </View>

        {/* New Workouts */}
        <View style={{ marginTop: 20 }}>
          <Text style={[regular9, { textAlign: 'left', marginBottom: 10 }]}>
            New Workout
          </Text>
          <View style={{ width: screenWidth }}>
            <FlatList
              data={newWorkout}
              renderItem={renderNewWorkoutItem}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 20 }}
              style={{ marginTop: 2 }}
            />
          </View>
        </View>
      </ScrollView>
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

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 60,
  },
});
