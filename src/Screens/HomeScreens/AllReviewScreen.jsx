import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { medium } from '../../utils/Style';
import ReviewNavbar from '../../Components/Navbar/ReviewNavbar';
import BackButton from '../../Components/Buttons/BackButton';
import BigButton from '../../Components/Buttons/BigButton';
import ReviewCard from '../../Components/Cards/ReviewCard';
import { trainerReviews } from '../../SampleData/sampleReviewData';
import { RatingImage } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import ReviewProgressBar from '../../Components/Navbar/ReviewBar';

const AllReviewScreen = () => {
  const navigation = useNavigation();

  const renderReviewItem = ({ item }) => <ReviewCard review={item} />;

  const handleBottomButtonPress = () => {
    navigation.navigate('AddReview');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <BackButton />
        <Text style={[medium, styles.titleText]}>Reviews</Text>
      </View>
      <ReviewNavbar />

      <FlatList
        data={trainerReviews}
        renderItem={renderReviewItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        ListHeaderComponent={() => (
          <View style={styles.imageContainer}>
            <ReviewProgressBar />
          </View>
        )}
      />

      {/* Fixed Bottom Button */}
      <View style={styles.bottomButtonContainer}>
        <BigButton text="Write Review" onPress={handleBottomButtonPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
    paddingHorizontal: 24,
    paddingTop: 50,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleText: {
    flex: 1,
    textAlign: 'center',
    marginRight: 40,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  ratingImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  flatListContent: {
    paddingBottom: 100,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default AllReviewScreen;
