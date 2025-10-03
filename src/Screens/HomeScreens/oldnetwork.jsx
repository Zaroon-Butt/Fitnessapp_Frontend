// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

// const CircularProgressBar = ({
//   progress = 0,
//   size = 150,
//   strokeWidth = 10,
//   color,
//   label,
//   value,
//   showText = true,
// }) => {
//   const radius = (size - strokeWidth) / 2;
//   const circumference = 2 * Math.PI * radius;

//   const strokeColor = color ? color : 'url(#progressGradient)';
//   const strokeDashoffset = circumference - (progress / 100) * circumference;
//   return (
//     <View style={[{ width: size, height: size }, styles.progressContainer]}>
//       <Svg
//         width={size}
//         height={size}
//         viewBox={`0 0 ${size} ${size}`}
//         style={{ transform: [{ rotate: '-90deg' }] }}
//       >
//         <Defs>
//           <LinearGradient
//             id="progressGradient"
//             x1="0%"
//             y1="0%"
//             x2="100%"
//             y2="100%"
//           >
//             <Stop offset="0%" stopColor="#FF2424" />
//             <Stop offset="100%" stopColor="#D9FD00" />
//           </LinearGradient>
//         </Defs>
//         <Circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           fill="transparent"
//           stroke="#4B5563"
//           strokeWidth={strokeWidth}
//         />
//         <Circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           fill="transparent"
//           stroke={strokeColor}
//           strokeWidth={strokeWidth}
//           strokeLinecap="round"
//           strokeDasharray={circumference}
//           strokeDashoffset={strokeDashoffset}
//         />
//       </Svg>
//       {showText && (
//         <View style={styles.textContainer}>
//           {label ? (
//             <>
//               <Text style={styles.valueText}>{value}</Text>
//               <Text style={styles.labelText}>{label}</Text>
//             </>
//           ) : (
//             <Text style={styles.progressText}>{`${Math.round(
//               progress,
//             )}%`}</Text>
//           )}
//         </View>
//       )}
//     </View>
//   );
// };

// const WorkoutCard = ({ title, time, completed = false }) => {
//   return (
//     <View style={styles.card}>
//       <View>
//         <Text style={styles.cardTitle}>{title}</Text>
//         {time && <Text style={styles.cardTime}>{time}</Text>}
//       </View>
//       {completed && <Text style={styles.checkmark}>✓</Text>}
//     </View>
//   );
// };

// export default function FitnessDashboard() {
//   const currentDate = new Date();
//   const [selectedDate, setSelectedDate] = useState(currentDate.getDate());
//   const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
//   const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
//   // Set fixed values for the progress bars
//   const [activeCalories] = useState(65);
//   const [steps] = useState(80);
//   const [time] = useState(60);
//   const [heartRate] = useState(90);

//   const dateScrollViewRef = useRef(null);

//   const months = [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December',
//   ];

//   const generateCalendarDates = () => {
//     const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
//     const dates = [];
//     const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
//     const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();
//     const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Convert Sunday (0) to 6, Monday (1) to 0, etc.
    
//     for (let i = 1; i <= daysInMonth; i++) {
//       const dayIndex = (i + startDay - 1) % 7;
//       dates.push({
//         day: daysOfWeek[dayIndex],
//         date: i,
//         active: i === selectedDate,
//       });
//     }
//     return dates;
//   };
//   const dates = generateCalendarDates();

//   const handlePreviousMonth = () => {
//     setSelectedMonth(prevMonth => {
//       if (prevMonth === 0) {
//         setSelectedYear(prevYear => prevYear - 1);
//         return 11;
//       }
//       return prevMonth - 1;
//     });
//   };
//   const handleNextMonth = () => {
//     setSelectedMonth(prevMonth => {
//       if (prevMonth === 11) {
//         setSelectedYear(prevYear => prevYear + 1);
//         return 0;
//       }
//       return prevMonth + 1;
//     });
//   };

//   // Scroll to selected date when component mounts or date changes
//   useEffect(() => {
//     if (dateScrollViewRef.current) {
//       const datePillWidth = 60; // 48 (width) + 12 (marginRight)
//       const scrollPosition = Math.max(0, (selectedDate - 3) * datePillWidth);
      
//       setTimeout(() => {
//         dateScrollViewRef.current?.scrollTo({
//           x: scrollPosition,
//           animated: true,
//         });
//       }, 100);
//     }
//   }, [selectedDate, selectedMonth, selectedYear]);

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={handlePreviousMonth}>
//             <Text style={styles.arrow}>‹</Text>
//           </TouchableOpacity>
//           <Text style={styles.headerText}>{months[selectedMonth]} {selectedYear}</Text>
//           <TouchableOpacity onPress={handleNextMonth}>
//             <Text style={styles.arrow}>›</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Date Pills - Horizontal ScrollView */}
//         <ScrollView
//           ref={dateScrollViewRef}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.dateScrollContainer}
//           style={styles.dateScrollView}
//         >
//           {dates.map((item, index) => (
//             <TouchableOpacity
//               key={index}
//               onPress={() => setSelectedDate(item.date)}
//             >
//               <View
//                 style={[styles.datePill, item.active && styles.datePillActive]}
//               >
//                 <Text
//                   style={[styles.dateDay, item.active && styles.dateDayActive]}
//                 >
//                   {item.day}
//                 </Text>
//                 <Text
//                   style={[
//                     styles.dateNumber,
//                     item.active && styles.dateNumberActive,
//                   ]}
//                 >
//                   {item.date}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>

//         {/* Main Calorie Circle */}
//         <View style={styles.centeredSection}>
//           <View style={styles.mainProgressBarContainer}>
//             <CircularProgressBar
//               progress={activeCalories}
//               size={250}
//               strokeWidth={20}
//               showText={false}
//             />
//             <View style={styles.mainTextContainer}>
//               <Text style={styles.mainValueText}>652 Cal</Text>
//               <Text style={styles.mainLabelText}>Active Calories</Text>
//             </View>
//           </View>
//         </View>

//         {/* Stats Row */}
//         <View style={styles.statsRow}>
//           <CircularProgressBar
//             progress={steps}
//             size={120}
//             strokeWidth={6}
//             color="#D0FD3E" // Greenish color
//             label="Steps"
//             value="6540"
//           />
//           <CircularProgressBar
//             progress={time}
//             size={120}
//             strokeWidth={6}
//             color="#FF2424" // Reddish color
//             label="Time"
//             value="45 min"
//           />
//           <CircularProgressBar
//             progress={heartRate}
//             size={120}
//             strokeWidth={6}
//             color="#E79332" // Orange color
//             label="Heart"
//             value="72 bpm"
//           />
//         </View>

//         {/* Finished Workout */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Finished Workout</Text>
//           <WorkoutCard
//             title="Stability Training"
//             time="10:00"
//             completed={true}
//           />
//           <WorkoutCard title="Flash Cycling" time="10:00" completed={false} />
//         </View>
//       </ScrollView>

//       {/* Bottom Nav Placeholder */}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1c1c1e',
//     paddingTop: 20,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 24,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   headerText: {
//     fontSize: 18,
//     color: 'white',
//     fontWeight: '500',
//   },
//   arrow: {
//     color: '#c4c4c4',
//     fontSize: 24,
//     padding: 8,
//   },
//   dateScrollView: {
//     marginBottom: 20,
//   },
//   dateScrollContainer: {
//     paddingHorizontal: 24,
//     paddingRight: 24,
//   },
//   datePill: {
//     width: 48,
//     height: 64,
//     borderRadius: 24,
//     backgroundColor: '#2c2c2e',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   datePillActive: {
//     backgroundColor: '#d0fd3e',
//   },
//   dateDay: {
//     color: '#c4c4c4',
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   dateDayActive: {
//     color: '#000',
//   },
//   dateNumber: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   dateNumberActive: {
//     color: '#000',
//   },
//   centeredSection: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   mainProgressBarContainer: {
//     position: 'relative',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   mainTextContainer: {
//     position: 'absolute',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   mainValueText: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   mainLabelText: {
//     fontSize: 16,
//     color: '#D1D5DB',
//   },
//   statsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//     paddingHorizontal: 20,
//     marginBottom: 24,
//   },
//   section: {
//     paddingHorizontal: 24,
//     marginBottom: 80,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     color: 'white',
//     fontWeight: '600',
//     marginBottom: 12,
//   },
//   card: {
//     backgroundColor: '#2c2c2e',
//     borderRadius: 20,
//     padding: 16,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   cardTitle: {
//     fontSize: 16,
//     color: 'white',
//     fontWeight: '500',
//   },
//   cardTime: {
//     fontSize: 14,
//     color: '#d0fd3e',
//     marginTop: 4,
//   },
//   checkmark: {
//     fontSize: 18,
//     color: '#A7F3D0',
//     fontWeight: 'bold',
//   },
//   // CircularProgressBar specific styles
//   progressContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   textContainer: {
//     position: 'absolute',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   progressText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   valueText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   labelText: {
//     fontSize: 12,
//     color: '#D1D5DB',
//     marginTop: 4,
//   },
// });

// //=============================================================================


// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
//   Platform,
//   PermissionsAndroid,
//   NativeEventEmitter,
//   NativeModules,
// } from 'react-native';
// import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

// // Import step counter with better error handling
// let StepCounter = null;
// let isStepCounterAvailable = false;

// try {
//   console.log('🔄 Attempting to load step counter library...');
//   // Try different import methods for better compatibility
//   const stepCounterModule = require('@mere1y/react-native-step-counter');
//   StepCounter = stepCounterModule.default || stepCounterModule.StepCounter || stepCounterModule;
  
//   if (StepCounter && (StepCounter.startStepCounterUpdate || StepCounter.startCounter)) {
//     isStepCounterAvailable = true;
//     console.log('✅ Step counter library loaded successfully');
//     console.log('📦 StepCounter methods available:', Object.keys(StepCounter || {}));
//   } else {
//     console.error('⚠️ Step counter module loaded but methods not found');
//   }
// } catch (e) {
//   console.error('❌ Step counter library failed to load:', e);
//   console.error('Error details:', e.message);
//   console.error('Make sure the library is installed and linked properly');
// }

// const CircularProgressBar = ({
//   progress = 0,
//   size = 150,
//   strokeWidth = 10,
//   color,
//   label,
//   value,
//   showText = true,
// }) => {
//   const radius = (size - strokeWidth) / 2;
//   const circumference = 2 * Math.PI * radius;
//   const strokeColor = color ? color : 'url(#progressGradient)';
//   const strokeDashoffset = circumference - (progress / 100) * circumference;
  
//   return (
//     <View style={[{ width: size, height: size }, styles.progressContainer]}>
//       <Svg
//         width={size}
//         height={size}
//         viewBox={`0 0 ${size} ${size}`}
//         style={{ transform: [{ rotate: '-90deg' }] }}
//       >
//         <Defs>
//           <LinearGradient
//             id="progressGradient"
//             x1="0%"
//             y1="0%"
//             x2="100%"
//             y2="100%"
//           >
//             <Stop offset="0%" stopColor="#FF2424" />
//             <Stop offset="100%" stopColor="#D9FD00" />
//           </LinearGradient>
//         </Defs>
//         <Circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           fill="transparent"
//           stroke="#4B5563"
//           strokeWidth={strokeWidth}
//         />
//         <Circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           fill="transparent"
//           stroke={strokeColor}
//           strokeWidth={strokeWidth}
//           strokeLinecap="round"
//           strokeDasharray={circumference}
//           strokeDashoffset={strokeDashoffset}
//         />
//       </Svg>
//       {showText && (
//         <View style={styles.textContainer}>
//           {label ? (
//             <>
//               <Text style={styles.valueText}>{value}</Text>
//               <Text style={styles.labelText}>{label}</Text>
//             </>
//           ) : (
//             <Text style={styles.progressText}>{`${Math.round(progress)}%`}</Text>
//           )}
//         </View>
//       )}
//     </View>
//   );
// };

// export default function FitnessDashboard() {
//   const currentDate = new Date();
//   const [selectedDate, setSelectedDate] = useState(currentDate.getDate());
//   const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
//   const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  
//   // Step counter state
//   const [stepCount, setStepCount] = useState(0);
//   const [isCounting, setIsCounting] = useState(false);
//   const [steps, setSteps] = useState(0);
//   const [dailyGoal] = useState(500);
//   const [lastStepTime, setLastStepTime] = useState(null);
//   const [sensorActive, setSensorActive] = useState(false);
//   const [initialSteps, setInitialSteps] = useState(0);
//   const [sessionSteps, setSessionSteps] = useState(0);

//   const dateScrollViewRef = useRef(null);
//   const stepCounterSubscription = useRef(null);
//   const sensorTimeoutRef = useRef(null);

//   const months = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December',
//   ];

//   // Initialize and check step counter on mount
//   useEffect(() => {
//     console.log('🚀 FitnessDashboard component mounted');
//     console.log('📱 Running on:', Platform.OS, 'version', Platform.Version);
//     console.log('📊 Step counter available:', isStepCounterAvailable);
    
//     if (isStepCounterAvailable) {
//       console.log('✅ Step counter library is ready');
//       // Try to get today's steps on mount
//       getTodaySteps();
//     } else {
//       console.warn('⚠️ Step counter library is not available');
//     }
    
//     return () => {
//       console.log('🧹 Cleaning up FitnessDashboard component');
//       if (stepCounterSubscription.current) {
//         console.log('🎧 Removing step counter subscription');
//         stepCounterSubscription.current.remove();
//       }
//       if (sensorTimeoutRef.current) {
//         clearTimeout(sensorTimeoutRef.current);
//       }
//       if (isCounting && isStepCounterAvailable) {
//         console.log('⏹️ Stopping step counter on unmount');
//         stopStepCountingInternal();
//       }
//     };
//   }, []);

//   // Get today's total steps
//   const getTodaySteps = async () => {
//     if (!isStepCounterAvailable || !StepCounter.getTodayStepCount) {
//       return;
//     }
    
//     try {
//       const todaySteps = await StepCounter.getTodayStepCount();
//       console.log('📊 Today\'s total steps:', todaySteps);
//       setStepCount(todaySteps);
//       const progressPercent = Math.min(100, (todaySteps / dailyGoal) * 100);
//       setSteps(progressPercent);
//     } catch (error) {
//       console.log('Could not get today\'s steps:', error);
//     }
//   };

//   // Request all necessary permissions
//   const requestPermissions = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const permissions = [];
        
//         // Activity Recognition (Android 10+)
//         if (Platform.Version >= 29) {
//           permissions.push(PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION);
//         }
        
//         // Body Sensors (for older Android versions)
//         if (Platform.Version < 29) {
//           permissions.push(PermissionsAndroid.PERMISSIONS.BODY_SENSORS);
//         }
        
//         if (permissions.length > 0) {
//           const results = await PermissionsAndroid.requestMultiple(permissions);
//           console.log('Permission results:', results);
          
//           for (const permission of permissions) {
//             if (results[permission] !== PermissionsAndroid.RESULTS.GRANTED) {
//               console.warn(`Permission ${permission} was not granted`);
//               return false;
//             }
//           }
//         }
        
//         return true;
//       } catch (err) {
//         console.error('Permission request error:', err);
//         return false;
//       }
//     }
//     return true;
//   };

//   // Internal stop function
//   const stopStepCountingInternal = async () => {
//     try {
//       if (StepCounter) {
//         if (StepCounter.stopStepCounterUpdate) {
//           await StepCounter.stopStepCounterUpdate();
//         } else if (StepCounter.stopCounter) {
//           await StepCounter.stopCounter();
//         }
//       }
//       if (stepCounterSubscription.current) {
//         stepCounterSubscription.current.remove();
//         stepCounterSubscription.current = null;
//       }
//     } catch (error) {
//       console.error('Error stopping step counter:', error);
//     }
//   };

//   // Start step counting
//   const startStepCounting = async () => {
//     console.log('🚀 Starting step counter...');
    
//     if (!isStepCounterAvailable) {
//       console.error('❌ Step counter library not available');
//       Alert.alert(
//         'Library Not Available',
//         'Step counter library is not installed or linked properly.\n\nTry:\n1. npm install @mere1y/react-native-step-counter\n2. cd ios && pod install (for iOS)\n3. Rebuild the app\n4. Use a physical device',
//         [{ text: 'OK' }],
//       );
//       return;
//     }

//     try {
//       // Request permissions
//       console.log('📱 Requesting permissions...');
//       const hasPermission = await requestPermissions();
      
//       if (!hasPermission) {
//         console.error('❌ Permission denied');
//         Alert.alert(
//           'Permission Required',
//           'Step counting requires activity recognition permission. Please enable it in your device settings.',
//           [
//             { text: 'Cancel', style: 'cancel' },
//             { text: 'Open Settings', onPress: () => {
//               if (Platform.OS === 'android') {
//                 Linking.openSettings();
//               }
//             }},
//           ],
//         );
//         return;
//       }

//       // Check native module
//       const nativeModuleName = NativeModules.StepCounter ? 'StepCounter' : 
//                               NativeModules.RNStepCounter ? 'RNStepCounter' : 
//                               NativeModules.StepCounterModule ? 'StepCounterModule' : null;
      
//       if (!nativeModuleName) {
//         throw new Error('Native module not found. The library may not be properly linked.');
//       }
      
//       console.log('🔍 Using native module:', nativeModuleName);
//       const nativeModule = NativeModules[nativeModuleName];

//       // Set up event listener
//       console.log('🎧 Setting up event listener...');
//       const stepCounterEmitter = new NativeEventEmitter(nativeModule);
      
//       // Store initial steps
//       setInitialSteps(stepCount);
//       setSessionSteps(0);
      
//       // Listen for step events
//       const subscription = stepCounterEmitter.addListener(
//         'StepCounter',
//         (data) => {
//           const currentTime = new Date().getTime();
//           console.log('📊 Step event:', data);
          
//           // Handle different data formats
//           let newSteps = 0;
//           if (typeof data === 'number') {
//             newSteps = data;
//           } else if (data.steps !== undefined) {
//             newSteps = data.steps;
//           } else if (data.stepCount !== undefined) {
//             newSteps = data.stepCount;
//           } else if (data.numberOfSteps !== undefined) {
//             newSteps = data.numberOfSteps;
//           }
          
//           // Calculate session steps
//           const currentSessionSteps = newSteps;
//           setSessionSteps(currentSessionSteps);
          
//           // Update total steps
//           const totalSteps = initialSteps + currentSessionSteps;
//           setStepCount(totalSteps);
          
//           const progressPercent = Math.min(100, (totalSteps / dailyGoal) * 100);
//           setSteps(progressPercent);
          
//           setSensorActive(true);
//           setLastStepTime(currentTime);
          
//           console.log(`📈 Session: ${currentSessionSteps} | Total: ${totalSteps} | Progress: ${Math.round(progressPercent)}%`);
//         }
//       );
      
//       stepCounterSubscription.current = subscription;

//       // Start the step counter
//       const startTime = new Date().getTime();
//       console.log('⏰ Starting counter at:', new Date(startTime).toLocaleTimeString());
      
//       // Try different start methods based on library version
//       if (StepCounter.startStepCounterUpdate) {
//         await StepCounter.startStepCounterUpdate(startTime);
//       } else if (StepCounter.startCounter) {
//         await StepCounter.startCounter(startTime);
//       } else if (StepCounter.start) {
//         await StepCounter.start(startTime);
//       } else {
//         throw new Error('No start method found in StepCounter module');
//       }
      
//       setIsCounting(true);
//       setSensorActive(false);
//       console.log('✅ Step counter started successfully');
      
//       // Sensor activity check
//       sensorTimeoutRef.current = setTimeout(() => {
//         if (!sensorActive) {
//           console.log('⚠️ No sensor data after 5 seconds');
//           Alert.alert(
//             'Sensor Check',
//             'No steps detected yet. Make sure you:\n\n• Are using a physical device\n• Have granted all permissions\n• Are walking with the phone\n\nSome devices need more movement to register steps.',
//             [{ text: 'OK' }],
//           );
//         }
//       }, 5000);
      
//       Alert.alert(
//         'Step Counter Started! 🚶‍♂️',
//         'Start walking to count steps!\n\n• Walk at normal pace\n• Keep phone with you\n• Steps update in real-time\n\nNote: Some devices need 5-10 steps before registering.',
//         [{ text: 'Got it!' }],
//       );
//     } catch (error) {
//       console.error('❌ Error starting step counter:', error);
//       console.error('Full error:', JSON.stringify(error, null, 2));
      
//       Alert.alert(
//         'Error Starting Step Counter',
//         `${error.message}\n\nTroubleshooting:\n• Ensure you're on a physical device\n• Check if app has all permissions\n• Try restarting the app`,
//         [{ text: 'OK' }],
//       );
//       setIsCounting(false);
//     }
//   };

//   // Stop step counting
//   const stopStepCounting = async () => {
//     console.log('⏹️ Stopping step counter...');
//     console.log('Session steps:', sessionSteps);
//     console.log('Total steps:', stepCount);
    
//     if (sensorTimeoutRef.current) {
//       clearTimeout(sensorTimeoutRef.current);
//     }
    
//     try {
//       await stopStepCountingInternal();
//       setIsCounting(false);
//       setSensorActive(false);
//       console.log('✅ Step counter stopped');
      
//       Alert.alert(
//         'Session Complete! 🎉',
//         `Session steps: ${sessionSteps.toLocaleString()}\nTotal today: ${stepCount.toLocaleString()}\n\nProgress: ${Math.round(steps)}% of daily goal`,
//         [{ text: 'Great!' }],
//       );
//     } catch (error) {
//       console.error('❌ Error stopping step counter:', error);
//       Alert.alert('Error', `Failed to stop: ${error.message}`);
//       setIsCounting(false);
//     }
//   };

//   // Reset step count
//   const resetSteps = () => {
//     Alert.alert(
//       'Reset Steps?',
//       'This will reset your step count to 0. Are you sure?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { 
//           text: 'Reset', 
//           style: 'destructive',
//           onPress: () => {
//             setStepCount(0);
//             setSessionSteps(0);
//             setInitialSteps(0);
//             setSteps(0);
//             console.log('📊 Steps reset to 0');
//           }
//         },
//       ],
//     );
//   };

//   // Generate calendar dates
//   const generateCalendarDates = () => {
//     const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
//     const dates = [];
//     const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
//     const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();
//     const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

//     for (let i = 1; i <= daysInMonth; i++) {
//       const dayIndex = (i + startDay - 1) % 7;
//       dates.push({
//         day: daysOfWeek[dayIndex],
//         date: i,
//         active: i === selectedDate,
//       });
//     }
//     return dates;
//   };
  
//   const dates = generateCalendarDates();

//   const handlePreviousMonth = () => {
//     setSelectedMonth(prevMonth => {
//       if (prevMonth === 0) {
//         setSelectedYear(prevYear => prevYear - 1);
//         return 11;
//       }
//       return prevMonth - 1;
//     });
//   };

//   const handleNextMonth = () => {
//     setSelectedMonth(prevMonth => {
//       if (prevMonth === 11) {
//         setSelectedYear(prevYear => prevYear + 1);
//         return 0;
//       }
//       return prevMonth + 1;
//     });
//   };

//   // Auto-scroll to selected date
//   useEffect(() => {
//     if (dateScrollViewRef.current) {
//       const datePillWidth = 60;
//       const scrollPosition = Math.max(0, (selectedDate - 3) * datePillWidth);

//       setTimeout(() => {
//         dateScrollViewRef.current?.scrollTo({
//           x: scrollPosition,
//           animated: true,
//         });
//       }, 100);
//     }
//   }, [selectedDate, selectedMonth, selectedYear]);

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={handlePreviousMonth}>
//             <Text style={styles.arrow}>‹</Text>
//           </TouchableOpacity>
//           <Text style={styles.headerText}>
//             {months[selectedMonth]} {selectedYear}
//           </Text>
//           <TouchableOpacity onPress={handleNextMonth}>
//             <Text style={styles.arrow}>›</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Date Pills */}
//         <ScrollView
//           ref={dateScrollViewRef}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.dateScrollContainer}
//           style={styles.dateScrollView}
//         >
//           {dates.map((item, index) => (
//             <TouchableOpacity
//               key={index}
//               onPress={() => setSelectedDate(item.date)}
//             >
//               <View
//                 style={[styles.datePill, item.active && styles.datePillActive]}
//               >
//                 <Text
//                   style={[styles.dateDay, item.active && styles.dateDayActive]}
//                 >
//                   {item.day}
//                 </Text>
//                 <Text
//                   style={[
//                     styles.dateNumber,
//                     item.active && styles.dateNumberActive,
//                   ]}
//                 >
//                   {item.date}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>

//         {/* Main Step Counter Circle */}
//         <View style={styles.centeredSection}>
//           <View style={styles.mainProgressBarContainer}>
//             <CircularProgressBar
//               progress={steps}
//               size={250}
//               strokeWidth={20}
//               showText={false}
//             />
//             <View style={styles.mainTextContainer}>
//               <Text style={styles.mainValueText}>
//                 {stepCount.toLocaleString()}
//               </Text>
//               <Text style={styles.mainLabelText}>Steps</Text>
//               <Text style={styles.goalText}>
//                 Goal: {dailyGoal.toLocaleString()}
//               </Text>
//               {steps > 0 && (
//                 <Text style={styles.percentText}>
//                   {Math.round(steps)}% Complete
//                 </Text>
//               )}
//               {sessionSteps > 0 && isCounting && (
//                 <Text style={styles.sessionText}>
//                   Session: +{sessionSteps}
//                 </Text>
//               )}
//             </View>
//           </View>

//           {/* Step Counter Control Buttons */}
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity
//               style={[
//                 styles.controlButton,
//                 isCounting && styles.controlButtonDisabled,
//               ]}
//               onPress={startStepCounting}
//               disabled={isCounting}
//             >
//               <Text style={[
//                 styles.controlButtonText,
//                 isCounting && styles.disabledButtonText
//               ]}>
//                 {isCounting ? 'Counting...' : '🚶 Start Steps'}
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[
//                 styles.controlButton,
//                 styles.stopButton,
//                 !isCounting && styles.controlButtonDisabled,
//               ]}
//               onPress={stopStepCounting}
//               disabled={!isCounting}
//             >
//               <Text style={[
//                 styles.controlButtonText,
//                 !isCounting && styles.disabledButtonText
//               ]}>
//                 ⏹ Stop
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[
//                 styles.controlButton,
//                 styles.resetButton,
//               ]}
//               onPress={resetSteps}
//             >
//               <Text style={styles.controlButtonText}>
//                 🔄 Reset
//               </Text>
//             </TouchableOpacity>
//           </View>

//           {/* Status indicator */}
//           {isCounting && (
//             <View style={styles.statusContainer}>
//               <View style={[styles.statusDot, sensorActive && styles.statusDotActive]} />
//               <View style={styles.statusTextContainer}>
//                 <Text style={styles.statusText}>
//                   {sensorActive ? '📡 Sensor Active' : '⏳ Waiting for movement...'}
//                 </Text>
//                 {lastStepTime && (
//                   <Text style={styles.lastStepText}>
//                     Last step: {new Date(lastStepTime).toLocaleTimeString()}
//                   </Text>
//                 )}
//                 <Text style={styles.instructionText}>
//                   Keep walking • Phone needs to move with you
//                 </Text>
//               </View>
//             </View>
//           )}

//           {/* Debug info for development */}
//           {__DEV__ && (
//             <View style={styles.debugContainer}>
//               <Text style={styles.debugTitle}>Debug Info:</Text>
//               <Text style={styles.debugText}>Library: {isStepCounterAvailable ? '✅ Loaded' : '❌ Not loaded'}</Text>
//               <Text style={styles.debugText}>Platform: {Platform.OS} v{Platform.Version}</Text>
//               <Text style={styles.debugText}>Counting: {isCounting ? 'Yes' : 'No'}</Text>
//               <Text style={styles.debugText}>Sensor: {sensorActive ? 'Active' : 'Inactive'}</Text>
//             </View>
//           )}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1c1c1e',
//     paddingTop: 20,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 24,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   headerText: {
//     fontSize: 18,
//     color: 'white',
//     fontWeight: '500',
//   },
//   arrow: {
//     color: '#c4c4c4',
//     fontSize: 24,
//     padding: 8,
//   },
//   dateScrollView: {
//     marginBottom: 20,
//   },
//   dateScrollContainer: {
//     paddingHorizontal: 24,
//     paddingRight: 24,
//   },
//   datePill: {
//     width: 48,
//     height: 64,
//     borderRadius: 24,
//     backgroundColor: '#2c2c2e',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   datePillActive: {
//     backgroundColor: '#d0fd3e',
//   },
//   dateDay: {
//     color: '#c4c4c4',
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   dateDayActive: {
//     color: '#000',
//   },
//   dateNumber: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   dateNumberActive: {
//     color: '#000',
//   },
//   centeredSection: {
//     alignItems: 'center',
//     marginBottom: 20,
//     paddingTop: 20,
//   },
//   mainProgressBarContainer: {
//     position: 'relative',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 10,
//   },
//   mainTextContainer: {
//     position: 'absolute',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   mainValueText: {
//     fontSize: 44,
//     fontWeight: 'bold',
//     color: '#fff',
//     letterSpacing: -1,
//   },
//   mainLabelText: {
//     fontSize: 16,
//     color: '#D1D5DB',
//     marginTop: 4,
//     fontWeight: '500',
//   },
//   goalText: {
//     fontSize: 13,
//     color: '#9CA3AF',
//     marginTop: 4,
//   },
//   percentText: {
//     fontSize: 12,
//     color: '#d0fd3e',
//     marginTop: 6,
//     fontWeight: '600',
//   },
//   sessionText: {
//     fontSize: 11,
//     color: '#60a5fa',
//     marginTop: 2,
//     fontWeight: '500',
//   },
//   progressContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   textContainer: {
//     position: 'absolute',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   progressText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   valueText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   labelText: {
//     fontSize: 12,
//     color: '#D1D5DB',
//     marginTop: 4,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 30,
//     gap: 12,
//     paddingHorizontal: 20,
//   },
//   controlButton: {
//     backgroundColor: '#d0fd3e',
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     borderRadius: 25,
//     minWidth: 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   stopButton: {
//     backgroundColor: '#ff4444',
//   },
//   resetButton: {
//     backgroundColor: '#6b7280',
//   },
//   controlButtonDisabled: {
//     backgroundColor: '#4a4a4a',
//     opacity: 0.5,
//   },
//   controlButtonText: {
//     color: '#000',
//     fontSize: 14,
//     fontWeight: '700',
//   },
//   disabledButtonText: {
//     color: '#666',
//   },
//   statusContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 20,
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     backgroundColor: '#2c2c2e',
//     borderRadius: 20,
//     maxWidth: '90%',
//   },
//   statusDot: {
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     backgroundColor: '#ff6b6b',
//     marginRight: 12,
//     opacity: 0.7,
//   },
//   statusDotActive: {
//     backgroundColor: '#d0fd3e',
//     opacity: 1,
//   },
//   statusTextContainer: {
//     flex: 1,
//   },
//   statusText: {
//     color: '#d0fd3e',
//     fontSize: 14,
//     fontWeight: '600',
//     marginBottom: 2,
//   },
//   lastStepText: {
//     color: '#9CA3AF',
//     fontSize: 12,
//     marginBottom: 2,
//   },
//   instructionText: {
//     color: '#6B7280',
//     fontSize: 11,
//     fontStyle: 'italic',
//   },
//   debugContainer: {
//     marginTop: 20,
//     padding: 15,
//     backgroundColor: '#2c2c2e',
//     borderRadius: 10,
//     width: '90%',
//   },
//   debugTitle: {
//     color: '#60a5fa',
//     fontSize: 12,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   debugText: {
//     color: '#9ca3af',
//     fontSize: 11,
//     marginBottom: 2,
//   },
// });