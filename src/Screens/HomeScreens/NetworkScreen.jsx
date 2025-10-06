import React, { useState, useEffect, use } from 'react';
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';
import { setStepGoal } from '../../redux/Reducers/userReducer';

// CircularProgressBar component for steps
const CircularProgressBar = ({
  progress = 0,
  size = 120,
  strokeWidth = 10,
  color,
  label,
  value,
  showText = true,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeColor = color ? color : 'url(#progressGradient)';
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: [{ rotate: '-90deg' }] }}
      >
        <Defs>
          <LinearGradient
            id="progressGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <Stop offset="0%" stopColor="#FF2424" />
            <Stop offset="100%" stopColor="#D0FD3E" />
          </LinearGradient>
        </Defs>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#48484A"
          strokeWidth={strokeWidth}
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>
      {showText && (
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {label ? (
            <>
              <Text
                style={{ fontSize: RF(20), fontWeight: 'bold', color: '#fff' }}
              >
                {value}
              </Text>
              <Text
                style={{ fontSize: RF(12), color: '#D1D5DB', marginTop: 4 }}
              >
                {label}
              </Text>
            </>
          ) : (
            <Text
              style={{ fontSize: RF(24), fontWeight: 'bold', color: '#fff' }}
            >{`${Math.round(progress)}%`}</Text>
          )}
        </View>
      )}
    </View>
  );
};
import BackButton from '../../Components/Buttons/BackButton';
import {
  initialize,
  requestPermission,
  readRecords,
} from 'react-native-health-connect';
import {
  normal,
  normal16,
  medium,
  regular16,
  heading,
  regular,
  regular9,
} from '../../utils/Style';
import { RF } from '../../utils/responsive';
import AlertModal from '../Modals/AlertModal';

const NetworkScreen = () => {
  const [healthData, setHealthData] = useState({
    steps: 0,
    calories: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [stepGoal, setStepGoal] = useState(0);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [goalInput, setGoalInput] = useState('1000');

  // Alert modal state
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const showAlert = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  useEffect(() => {
    initializeHealthConnect();
    setTimeout(() => {
      if (setStepGoal == false) setShowGoalModal(true);
    }, 10000); // Short delay to ensure initialization completes
  }, []);

  useEffect(() => {
    calculateCalories(healthData);
  }, [healthData.steps]);

  const calculateCalories = healthData => {
    return Math.round(healthData.steps * 0.05);
  };

  const initializeHealthConnect = async () => {
    try {
      setLoading(true);

      // Initialize the client
      const isInitialized = await initialize();

      if (!isInitialized) {
        showAlert('Error', 'Failed to initialize Health Connect');
        return;
      }

      // Request permissions for steps and calories
      const permissions = [
        { accessType: 'read', recordType: 'Steps' },
        { accessType: 'read', recordType: 'ActiveCaloriesBurned' },
      ];

      const grantedPermissions = await requestPermission(permissions);

      if (grantedPermissions && grantedPermissions.length > 0) {
        setPermissionsGranted(true);
        await fetchHealthData();
      } else {
        showAlert(
          'Permissions Required',
          'Please grant health permissions to view your fitness data',
        );
      }
    } catch (error) {
      console.error('Health Connect initialization error:', error);
      showAlert(
        'Attention',
        'Failed to initialize health tracking make sure you have Google Fit and Health Connect Downloaded on Your Phone',
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchHealthData = async () => {
    try {
      const today = new Date();
      const startOfDay = new Date(today);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(today);
      endOfDay.setHours(23, 59, 59, 999);

      const timeRangeFilter = {
        operator: 'between',
        startTime: startOfDay.toISOString(),
        endTime: endOfDay.toISOString(),
      };

      // Fetch steps data
      const stepsData = await readRecords('Steps', { timeRangeFilter });
      const totalSteps = stepsData.records.reduce(
        (sum, record) => sum + record.count,
        0,
      );

      // Fetch calories data
      // const caloriesData = await readRecords('ActiveCaloriesBurned', { timeRangeFilter });
      // const totalCalories = caloriesData.records.reduce((sum, record) => {
      //   console.log('Record:', record);
      //         console.log('Calories Data:', caloriesData);

      //   console.log('sum before:', sum);
      //   return sum + (record.energy ? record.energy.inKilocalories || 0 : 0);
      // }, 0);

      // Temporary calories calculation based on steps because
      //  the google fit was not providing calories data
      // const totalCalories = healthData.steps * 0.05;

      setHealthData({
        steps: totalSteps,
        calories: calculateCalories({ steps: totalSteps }),
      });

      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error fetching health data:', error);
      showAlert('Error', 'Failed to fetch health data');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    if (permissionsGranted) {
      await fetchHealthData();
    }
    setRefreshing(false);
  };

  const requestPermissionsAgain = () => {
    showAlert(
      'Attention',
      'Failed to initialize health tracking make sure you have Google Fit and Health Connect Downloaded on Your Phone',
    );

    // showAlert('Health Permissions', 'This app needs access to your health data to display steps and calories burned.');
  };

  const handleSaveGoal = () => {
    const newGoal = parseInt(goalInput);
    if (isNaN(newGoal) || newGoal <= 0) {
      showAlert('Invalid Goal', 'Please enter a valid number greater than 0');
      return;
    }
    setStepGoal(newGoal);
    setShowGoalModal(false);
    showAlert(
      'Goal Set!',
      `Your daily step goal has been set to ${newGoal.toLocaleString()} steps`,
    );
  };

  const openGoalModal = () => {
    setGoalInput(stepGoal.toString());
    setShowGoalModal(true);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#D0FD3E" />
        <Text style={[normal16, { marginTop: 16 }]}>
          Initializing Health Connect...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#D0FD3E"
          />
        }
      >
        <View style={styles.headerContainer}>
          <BackButton />
          <Text style={[medium, { flex: 1, textAlign: 'center' }]}>
            Step Counter
          </Text>
        </View>

        {!permissionsGranted ? (
          <View style={styles.permissionContainer}>
            <Text style={[normal16, { textAlign: 'center', marginBottom: 20 }]}>
              Health permissions are required to display your fitness data
            </Text>
            {/* <Text style={[normal16, { textAlign: 'center', marginBottom: 20 }]}>
            Download Google Fit and Health Connect from the Play Store if you havent already.
          </Text> */}
            <TouchableOpacity
              style={styles.permissionButton}
              onPress={requestPermissionsAgain}
            >
              <Text style={[normal16, { color: '#000000' }]}>
                Grant Permissions
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={{ alignItems: 'center', marginBottom: 40 }}>
              <View
                style={{
                  alignItems: 'center',
                  marginBottom: 40,
                  marginTop: 32,
                }} //make this touchableOpacity if you want to open modal on click
                // onPress={openGoalModal}
              >
                <CircularProgressBar
                  progress={Math.min((healthData.steps / stepGoal) * 100, 100)}
                  size={200}
                  strokeWidth={18}
                  color="#D0FD3E"
                  label="Steps"
                  value={healthData.steps.toLocaleString()}
                />
                {/* <Text style={[regular16, { opacity: 0.5, marginTop: 12, fontSize: RF(14) }]}> 
                Goal: {stepGoal.toLocaleString()}
              </Text> */}
                {/* Changed font family for step goal text */}
                <Text
                  style={[
                    regular16,
                    {
                      opacity: 0.5,
                      marginTop: 12,
                      fontSize: RF(14),
                      fontFamily: 'IntegralCF-Regular',
                    },
                  ]}
                >
                  Goal: {stepGoal.toLocaleString()} steps
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <CircularProgressBar
                  progress={
                    stepGoal > 0
                      ? Math.min(
                          (healthData.calories / (stepGoal * 0.05)) * 100,
                          100,
                        )
                      : 0
                  }
                  size={200}
                  strokeWidth={18}
                  color="#FF2424"
                  label="Calories"
                  value={healthData.calories}
                />
                {/* <Text style={[regular16, { opacity: 0.5, marginTop: 12 }]}> 
                Calories: {healthData.calories} kcal
              </Text> */}
                {/* Changed font family for calories text */}
                <Text
                  style={[
                    regular16,
                    {
                      opacity: 0.5,
                      marginTop: 12,
                      fontFamily: 'IntegralCF-Regular',
                    },
                  ]}
                >
                  Calories: {healthData.calories} kcal
                </Text>
              </View>
            </View>

            {/* Tap to set goal at the bottom */}
            <TouchableOpacity
              onPress={openGoalModal}
              style={{ alignItems: 'center', marginBottom: 24 }}
            >
              <Text style={[regular16, { opacity: 0.7, fontSize: RF(14) }]}>
                Tap to set goal
              </Text>
            </TouchableOpacity>

            {/* {lastUpdated && (
            <Text style={[regular16, { textAlign: 'center', opacity: 0.5, marginTop: 20 }]}>
              Last updated: {lastUpdated}
            </Text>
          )} */}
          </>
        )}

        {/* Goal Setting Modal */}
        <Modal
          visible={showGoalModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowGoalModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={[medium, { marginBottom: 20, textAlign: 'center' }]}>
                Set Daily Step Goal
              </Text>

              <Text style={[regular, { marginBottom: 16, opacity: 0.7 }]}>
                Current Goal: {stepGoal.toLocaleString()} steps
              </Text>

              <TextInput
                style={styles.goalInput}
                value={goalInput}
                onChangeText={setGoalInput}
                placeholder="Enter your daily step goal"
                placeholderTextColor="#666"
                keyboardType="numeric"
                autoFocus={true}
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setShowGoalModal(false)}
                >
                  <Text style={[regular16, { color: '#fff' }]}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={handleSaveGoal}
                >
                  <Text style={[normal16, { color: '#000' }]}>Save Goal</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {/* Alert Modal for all alerts */}
        <AlertModal
          visible={alertVisible}
          alertTitle={alertTitle}
          alertMessage={alertMessage}
          onClose={() => setAlertVisible(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
  },
  permissionContainer: {
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    padding: 24,
    marginVertical: 20,
    alignItems: 'center',
  },
  permissionButton: {
    backgroundColor: '#D0FD3E',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  dataCard: {
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    padding: 20,
    flex: 0.48,
    alignItems: 'center',
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  cardIcon: {
    fontSize: RF(32),
    marginBottom: 8,
  },
  dataValue: {
    fontSize: RF(32),
    fontWeight: 'bold',
    color: '#D0FD3E',
    marginBottom: 4,
  },
  summaryContainer: {
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  progressContainer: {
    gap: 20,
  },
  progressItem: {
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#48484A',
    borderRadius: 4,
    marginVertical: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#D0FD3E',
    borderRadius: 4,
  },
  headerContainer: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    padding: 24,
    width: '85%',
    alignItems: 'center',
  },
  goalInput: {
    backgroundColor: '#48484A',
    borderRadius: 8,
    padding: 16,
    fontSize: RF(16),
    color: '#fff',
    width: '100%',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#48484A',
  },
  saveButton: {
    backgroundColor: '#D0FD3E',
  },
});

export default NetworkScreen;
