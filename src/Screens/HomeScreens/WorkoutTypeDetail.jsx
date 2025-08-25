import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import BackButton from '../../Components/Buttons/BackButton';
import BigButton from '../../Components/Buttons/BigButton';
import ExerciseDetailCard from '../../Components/Cards/ExerciseDetailCard';
import { useNavigation, useRoute } from '@react-navigation/native';
import { exerciseApi } from '../../Api/ExerciseApi';
import { normal, normal16, regular16 } from '../../utils/Style';

const WorkoutTypesDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { title } = route.params || {};
  const [exerciseTypes, setExerciseTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFetchingExercise, setIsFetchingExercise] = useState(false); 

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    if (!title) {
      setIsLoading(false);
      setExerciseTypes([]);
      return;
    }

    try {
      const searchResponse = await exerciseApi.searchExercises(title);
      if (searchResponse && searchResponse.data) {
        setExerciseTypes(searchResponse.data);
        console.log('Search successful:', searchResponse.data);
      } else {
        setExerciseTypes([]);
        setError('No exercises found for this type');
      }
    } catch (searchError) {
      console.error('Search failed:', searchError);
      setError('Unable to load exercises. Please try again.');
      setExerciseTypes([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [title]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#b7ff00" />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <BigButton 
            onPress={fetchData}
            style={styles.retryButton}
          >
            <Text style={[regular16, { color: '#000' }]}>Retry</Text>
          </BigButton>
        </View>
      );
    }

    if (exerciseTypes.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No exercises found for "{title}"
          </Text>
          <Text style={styles.emptySubText}>
            Try a different workout type or check back later.
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        data={exerciseTypes}
        keyExtractor={(item, index) =>
          item.id?.toString() || item._id?.toString() || index.toString()
        }
        renderItem={({ item }) => {
          const mappedItem = {
            id: item.exerciseId,
            title: item.name || item.title ,
            image: item.imageUrl ? { uri: item.imageUrl } : null,
            url: item.videoUrl,
          };

          return (
            <View style={{ paddingHorizontal: 20 }}>
              <ExerciseDetailCard
                exercise={mappedItem}
                onPress={() => navigation.navigate('ExerciseDetailScreen', { title: mappedItem.title, image: mappedItem.image ,id: mappedItem.id })}
              />
            </View>
          );
        }}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.headerContainer}>
          <BackButton />
          <Text style={[normal, { flex: 1 }]} >
            {title || 'Workout Detail'}
          </Text>
          <View style={{width: 40}} />
        </View>

        {isFetchingExercise ? ( 
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#b7ff00" />
          </View>
        ) : (
          renderContent()
        )}
      </View>
    </ScrollView>
  );
};

export default WorkoutTypesDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 30,
    marginBottom: 16,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
  errorContainer: {
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    marginTop: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 30,
  },
  emptyText: {
    color: '#cccccc',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
  },
});
