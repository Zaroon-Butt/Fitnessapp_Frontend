import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import BackButton from '../../Components/Buttons/BackButton';
import { useRoute, useNavigation } from '@react-navigation/native';
import { exerciseApi } from '../../Api/ExerciseApi';
import WebView from 'react-native-webview';
import { normal } from '../../utils/Style';
import { RF } from '../../utils/responsive';

const ExerciseDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { title = '', image: imageUrl, id: exerciseId } = route.params || {};
  // Replace hyphens with spaces in the title
  const formattedTitle = title.replace(/-/g, ' ');

  const [isFetchingExercise, setIsFetchingExercise] = useState(false);
  const [overview, setOverview] = useState('');
  const [instructions, setInstructions] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');
  const [equipment, setEquipment] = useState('');
  const [bodyParts, setBodyParts] = useState([]);

  const fetchExercise = async () => {
    try {
      setIsFetchingExercise(true);
      const response = await exerciseApi.getExerciseById(exerciseId);

      const { overview, instructions, videoUrl, equipments, bodyParts } = response.data;
      setOverview(overview || '');
      setInstructions(instructions || '');
      setVideoUrl(videoUrl || '');
      setEquipment(equipments || '');
      setBodyParts(bodyParts || '');

      console.log('Rendering exercise:', response.data.id);
    } catch (error) {
      console.error('Error fetching exercise:', error);
    } finally {
      setIsFetchingExercise(false);
    }
  };
  console.log('exercise id:', exerciseId);

  useEffect(() => {
    if (exerciseId) {
      fetchExercise();
    }
  }, [exerciseId]);

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.headerContainer}>
          <BackButton />
          <Text style={[normal, { flex: 1, alignItems: 'center', justifyContent: 'center' }]} numberOfLines={2}>
            {formattedTitle || 'Workout Detail'}
          </Text>
          <View style={{ width: RF(40) }} />
        </View>

        {videoUrl ? (
          <WebView source={{ uri: videoUrl }} style={styles.exerciseImage} />
        ) : (
          <WebView 
            source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl}
            style={styles.exerciseImage}
          />
        )}

        {isFetchingExercise ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator
              size="large"
              color="#b7ff00"
            />
          </View>
        ) : (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Overview</Text>
              <Text style={styles.sectionText}>
                {overview || 'No overview available'}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Instructions</Text>
              <Text style={styles.sectionText}>
                {Array.isArray(instructions) && instructions.length > 0 ? (
                  instructions.join('\n')
                ) : (
                  'No instructions available'
                )}
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Equipment</Text>
              <Text style={styles.sectionText}>
                {equipment || 'No equipment information available'}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Body Parts</Text>
              {Array.isArray(bodyParts) && bodyParts.length > 0 ? (
                <Text style={styles.sectionText}>
                  {bodyParts.join('\n')}
                </Text>
              ) : (
                <Text style={styles.sectionText}>
                  No body parts information available
                </Text>
              )}
            </View>
            <View style={{ marginBottom: 40 }}></View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default ExerciseDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    marginBottom: 16,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  exerciseImage: {
    width: '100%',
    height: 350,
    marginTop: 16,
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    color: '#ccc',
    lineHeight: 22,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
});
