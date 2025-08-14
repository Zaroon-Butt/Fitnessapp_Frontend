import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { WorkoutDetailImage, Fire, Play } from '../../utils';
import BackButton from '../../Components/Buttons/BackButton';
import BigButton from '../../Components/Buttons/BigButton';
import ExerciseDetailCard from '../../Components/Cards/ExerciseDetailCard';
import { sampleExercises } from '../../SampleData/sampleExercises';
import { useNavigation } from '@react-navigation/native';

const WorkoutPlanScreen = () => {
  const navigation = useNavigation();

  const handleStartWorkout = () => {
    console.log('Start workout pressed');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={WorkoutDetailImage} style={styles.headerImage} />
        <View style={styles.backButtonContainer}>
          <BackButton />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Day 01 - Warm Up</Text>
        <Text style={styles.subTitle}>04 Workouts for Beginner</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoBox}>
            <Image source={Play} style={{ width: 18, height: 18 }} />
            <Text style={styles.infoText}>60 min</Text>
          </View>
          <View style={styles.infoBox}>
            <Image source={Fire} style={{ width: 18, height: 18 }} />
            <Text style={styles.infoText}>350 Cal</Text>
          </View>
        </View>

        <Text style={styles.description}>
          Want your body to be healthy. Join our program with directions
          according to body's goals. Increasing physical strength is the goal of
          strength training. Maintain body fitness by doing physical exercise at
          least 2-3 times a week.
        </Text>

        <FlatList
          data={sampleExercises}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ExerciseDetailCard
              exercise={item}
              onPress={() => {
                navigation.navigate('WebviewScreen', { url: item.url, title: item.title });
              }}
            />
          )}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <BigButton text="Start Workout" onPress={handleStartWorkout} />
    </ScrollView>
  );
};

export default WorkoutPlanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
  },
  headerContainer: {
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: 280,
    resizeMode: 'cover',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  content: {
    padding: 20,
    backgroundColor: '#121212',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subTitle: {
    color: '#b7ff00',
    fontSize: 16,
    marginVertical: 4,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 16,
    marginVertical: 10,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#222',
    padding: 8,
    borderRadius: 10,
  },
  infoText: {
    color: '#ffffff',
  },
  description: {
    color: '#cccccc',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
  },
});
