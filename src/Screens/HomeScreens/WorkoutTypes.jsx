import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import BackButton from '../../Components/Buttons/BackButton';
import ExerciseDetailCard from '../../Components/Cards/ExerciseDetailCard';
import { useNavigation } from '@react-navigation/native';
import { exerciseApi } from '../../Api/ExerciseApi';
import { normal } from '../../utils/Style';

const WorkoutTypes = () => {
  const navigation = useNavigation();
  const [exerciseTypes, setExerciseTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await exerciseApi.getExerciseTypes();
      setIsLoading(false);
      setExerciseTypes(response.data);
    } catch (error) {
      console.error('Error fetching exercise types:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.headerContainer}>
          <BackButton />
          <Text style={[normal, { flex: 1, textAlign: 'center' }]} numberOfLines={1}>
            Workout Types
          </Text>
          
        </View>
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#b7ff00" />
          </View>
        ) : (
          <FlatList
            data={exerciseTypes}
            keyExtractor={item =>
              item.id?.toString() ||
              item.id?.toString() ||
              Math.random().toString()
            }
            renderItem={({ item }) => {
              const mappedItem = {
                title: item.name,
                image: item.imageUrl ? { uri: item.imageUrl } : null,
                url: item.imageUrl || '',
              };
              return (
                <View style={{ paddingHorizontal: 20 }}>
                  <ExerciseDetailCard
                    exercise={mappedItem}
                    onPress={() => {
                      navigation.navigate('WorkoutTypesDetail', {
                        title: mappedItem.title,
                      });
                    }}
                  />
                </View>
              );
            }}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default WorkoutTypes;

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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
});
