import React, { use, useRef, useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import BackButton from '../../Components/Buttons/BackButton';
import NextButton from '../../Components/Buttons/NextButton';
import { medium, regular } from '../../utils/Style';
import { setIsLogin, setIsOnboarding, setIsPro } from '../../redux/Reducers/userReducer';
import { ProvideContext } from '../../context/ProvideContext';

const { width: screenWidth } = Dimensions.get('window');
const ITEM_WIDTH = 14;
const MIN_WEIGHT = 30;
const MAX_WEIGHT = 200;
const weights = Array.from(
  { length: MAX_WEIGHT - MIN_WEIGHT + 1 },
  (_, i) => i + MIN_WEIGHT,
);

const DynamicWeightSelector = ({ selectedWeight, onWeightChange }) => {
  const flatListRef = useRef(null);

  const handleScroll = event => {
    const x = event.nativeEvent.contentOffset.x;
    const centerIndex = Math.round((x - 20) / ITEM_WIDTH);
    const clampedIndex = Math.max(0, Math.min(centerIndex, weights.length - 1));
    const newWeight = weights[clampedIndex];
    if (newWeight !== selectedWeight && newWeight !== undefined) {
      onWeightChange(newWeight);
    }
  };

  const renderItem = ({ item }) => {
    const distance = Math.abs(item - selectedWeight);
    const isSelected = distance === 0;
    const isNear = distance <= 2;

    const barHeight = isSelected ? 80 : isNear ? 50 : 35;
    const opacity = isSelected ? 1 : isNear ? 0.6 : 0.3;
    const width = isSelected ? 5 : 3;
    const color = '#d0fd3e';

    return (
      <View
        style={{
          height: 80,
          width,
          marginHorizontal: (ITEM_WIDTH - width) / 2,
          justifyContent: 'flex-end',
        }}
      >
        <View
          style={{
            height: barHeight,
            width: '100%',
            backgroundColor: color,
            borderRadius: 2,
            opacity,
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.selectorContainer}>
      <FlatList
        ref={flatListRef}
        data={weights}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        onScroll={handleScroll}
        getItemLayout={(_, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
        contentContainerStyle={{
          paddingHorizontal: screenWidth / 2 - ITEM_WIDTH / 2,
        }}
        renderItem={renderItem}
        keyExtractor={item => item.toString()}
        onMomentumScrollEnd={handleScroll}
      />
      <View style={styles.centerIndicator} />
    </View>
  );
};

const WeightInputScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedWeight, setSelectedWeight] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const { isLogin } = useSelector(state => state.user);
  const { submitOnboarding, updateOnboarding } = useContext(ProvideContext);

  const handleNextPress = async () => {
    if (isLoading) return; // Prevent multiple calls

    console.log('=== WEIGHT SUBMISSION START ===');
    console.log('Next pressed with weight:', selectedWeight);
    
    setIsLoading(true);

    try {
      // Update weight in onboarding context
      updateOnboarding({ weight: selectedWeight });
      
      // Submit complete onboarding data to API
      console.log('Submitting onboarding data to API...');
      const response = await submitOnboarding({ weight: selectedWeight });
      
      console.log('API response:', response);
      
      // Complete onboarding and set login state
      console.log('Setting onboarding complete and login to true');
      dispatch(setIsLogin(true));
      dispatch(setIsPro(false)); // hardcoded false for testing
      
      console.log('Redux dispatch completed successfully');
      console.log('=== WEIGHT SUBMISSION SUCCESS ===');
    } catch (error) {
      console.log('Error during weight submission:', error);
      Alert.alert('Signup Failed', error.message || 'An error occurred during signup');
      
      console.log('=== WEIGHT SUBMISSION COMPLETED WITH ERRORS ===');
    } finally {
      setIsLoading(false);
      console.log('Loading state set to false');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.headerSection}>
          <Text style={medium}>WHATS YOUR WEIGHT?</Text>
          <Text style={[regular, { marginTop: 10 }]}>
            YOU CAN ALWAYS CHANGE THIS LATER
          </Text>
        </View>

        {/* Weight Display */}
        <View style={styles.weightSection}>
          <View style={styles.weightDisplay}>
            <Text style={styles.weightNumber}>{selectedWeight}</Text>
            <Text style={styles.weightUnit}>kg</Text>
          </View>

          <DynamicWeightSelector
            selectedWeight={selectedWeight}
            onWeightChange={setSelectedWeight}
          />
        </View>

        {/* Bottom Nav */}
        <View style={styles.bottomNavigation}>
          <BackButton style={{ backgroundColor: '#2C2C2E' }} />

          <NextButton
            onPress={handleNextPress}
            disabled={isLoading}
            loading={isLoading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  headerSection: {
    alignItems: 'center',
    marginTop: 60,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.7,
    textAlign: 'center',
    fontWeight: '500',
  },
  weightSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weightDisplay: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 60,
  },
  weightNumber: {
    fontSize: 96,
    fontWeight: '300',
    color: '#ffffff',
    letterSpacing: -2,
  },
  weightUnit: {
    fontSize: 24,
    fontWeight: '300',
    color: '#ffffff',
    opacity: 0.8,
    marginLeft: 8,
  },
  selectorContainer: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
  },
});

export default WeightInputScreen;
