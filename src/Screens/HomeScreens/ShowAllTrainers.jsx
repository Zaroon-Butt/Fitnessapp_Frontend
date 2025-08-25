import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import BackButton from '../../Components/Buttons/BackButton';
import TrainerDetailCard from '../../Components/Cards/TrainerDetailCard';
import { medium } from '../../utils/Style';
import { sampleTrainers } from '../../SampleData/SampleTrainerData';
import { useNavigation } from '@react-navigation/native';

const ShowAllTrainers = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <BackButton />
        <Text style={[medium, { flex: 1, textAlign: 'center' }]}>Fitness Trainers</Text>
      </View>

      <FlatList
        data={sampleTrainers}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('TrainerDetail', { trainer: item })
            }
          >
            <TrainerDetailCard
              name={item.name}
              rating={item.rating}
              specialty={item.specialty}
              experience={item.experience}
              image={item.image}
              trainer={item}
            />
          </TouchableOpacity>
        )}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </ScrollView>
  );
};

export default ShowAllTrainers;

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
});
