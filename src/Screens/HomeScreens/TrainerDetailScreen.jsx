import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Linking
} from 'react-native';
import BackButton from '../../Components/Buttons/BackButton';
import BigButton from '../../Components/Buttons/BigButton';
import { TrainerDetailImage } from '../../utils';
import { useNavigation, useRoute } from '@react-navigation/native';

const TrainerProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Get trainer data from navigation params, fallback to default data
  const trainerData = route.params?.trainer || {
    name: 'Jennifer James',
    specialty: 'Functional Strength',
    experience: '6 years',
    rating: 4.6,
    image: TrainerDetailImage,
  };
  const reviewerAvatars = [
    { id: 1, name: 'SJ' },
    { id: 2, name: 'MK' },
    { id: 3, name: 'JD' },
    { id: 4, name: 'AL' },
  ];

  const handleBookAppointment = () => {
    navigation.navigate('Appointment', { trainer: trainerData });
    console.log('Book Appointment button pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroContainer}>
          <Image
            source={trainerData.image}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay} />
          <View style={styles.heroBottomOverlay} />

          {/* Navigation */}
          <TouchableOpacity style={styles.backButton}>
            <BackButton />
          </TouchableOpacity>

          {/* Call Button */}
          <TouchableOpacity style={styles.callButton} onPress={() => Linking.openURL(`tel:${trainerData.phone || '1234567890'}`)}>
            <Text style={styles.callButtonText}>📞</Text>
          </TouchableOpacity>

          {/* Trainer Info */}
          <View style={styles.trainerInfo}>
            <Text style={styles.trainerName}>{trainerData.name}</Text>
            <Text style={styles.trainerSpecialty}>{trainerData.specialty}</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          {/* Stats Card */}
          <View style={styles.statsCard}>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {trainerData.experience
                    ? trainerData.experience.replace(/\D/g, '')
                    : ''}
                </Text>
                <Text style={styles.statLabel}>Experience</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>46</Text>
                <Text style={styles.statLabel}>Completed</Text>
              </View>                                                                                                                                                                                                                             
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>25</Text>
                <Text style={styles.statLabel}>Active Clients</Text>
              </View>
            </View>
          </View>

          {/* Reviews Section */}
          <View style={styles.reviewsSection}>
            <View style={styles.reviewsHeader}>
              <Text style={styles.reviewsTitle}>Reviews</Text>
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>{trainerData.rating}</Text>
              </View>
            </View>

            <View style={styles.reviewersRow}>
              <View style={styles.reviewersContainer}>
                <View style={styles.avatarsContainer}>
                  {reviewerAvatars.map((reviewer, index) => (
                    <View
                      key={reviewer.id}
                      style={[
                        styles.avatar,
                        { marginLeft: index > 0 ? -8 : 0 },
                      ]}
                    >
                      <Text style={styles.avatarText}>{reviewer.name}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.reviewCountBadge}>
                  <Text style={styles.reviewCountText}>174</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('AllReviewScreen')}
              >
                <Text style={styles.readAllReviews}>Read all reviews</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Review Card */}
          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <View style={styles.reviewerAvatar}>
                <Text style={styles.reviewerAvatarText}>SJ</Text>
              </View>
              <View style={styles.reviewContent}>
                <View style={styles.reviewMeta}>
                  <View style={styles.reviewerInfo}>
                    <Text style={styles.reviewerName}>Sharon Jem</Text>
                    <View style={styles.reviewRatingBadge}>
                      <Text style={styles.reviewRatingText}>4.8</Text>
                    </View>
                  </View>
                  <Text style={styles.reviewTime}>2d ago</Text>
                </View>
                <Text style={styles.reviewText}>
                  Had such an amazing session with Maria. She instantly picked
                  up on the level of my fitness and adjusted the workout to suit
                  me whilst also pushing me to my limits.
                </Text>
              </View>
            </View>
          </View>

          {/* Book Appointment Button */}
          <BigButton
            text="Book an Appointment"
            onPress={handleBookAppointment}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
  },
  scrollView: {
    flex: 1,
  },
  heroContainer: {
    position: 'relative',
    height: 400,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  heroBottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: '#1C1C1E',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  callButton: {
    position: 'absolute',
    top: 50,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#d0fd3e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  callButtonText: {
    fontSize: 16,
  },
  trainerInfo: {
    position: 'absolute',
    bottom: 5,
    left: 24,
    right: 24,
  },
  trainerName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  trainerSpecialty: {
    fontSize: 18,
    color: '#d0fd3e',
    fontWeight: '500',
  },
  contentContainer: {
    padding: 24,
  },
  statsCard: {
    backgroundColor: '#2c2c2e',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#9ca3af',
  },
  reviewsSection: {
    marginBottom: 24,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  reviewsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  ratingBadge: {
    backgroundColor: '#d0fd3e',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  reviewersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6b7280',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1c1c1e',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  reviewCountBadge: {
    backgroundColor: '#d0fd3e',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 12,
  },
  reviewCountText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  readAllReviews: {
    color: '#d0fd3e',
    fontSize: 16,
    fontWeight: '500',
  },
  reviewCard: {
    backgroundColor: '#2c2c2e',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
  },
  reviewHeader: {
    flexDirection: 'row',
  },
  reviewerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6b7280',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  reviewerAvatarText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  reviewContent: {
    flex: 1,
  },
  reviewMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewerName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 12,
  },
  reviewRatingBadge: {
    backgroundColor: '#d0fd3e',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  reviewRatingText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  reviewTime: {
    color: '#9ca3af',
    fontSize: 14,
  },
  reviewText: {
    color: '#d1d5db',
    fontSize: 15,
    lineHeight: 22,
  },
});

export default TrainerProfile;
