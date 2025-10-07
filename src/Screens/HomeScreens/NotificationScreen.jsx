import { View, Text, StyleSheet, Alert, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NotificationBar from '../../Components/Navbar/NotificationBar';
import { regular, regular16, regular9 } from '../../utils/Style';
import { useState } from 'react';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import AppointmentCard from '../../Components/Cards/AppointmentCard';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNotification, removeNotification } from '../../redux/Reducers/userReducer';

const NotificationScreen = ({ navigation, route }) => {
  // Get notifications from Redux store
  const notifications = useSelector(state => {
    console.log("Redux state user:", state.user);
    const notifs = state.user.notifications || [];
    console.log("Retrieved notifications array:", notifs);
    console.log("Notifications count:", notifs.length);
    return notifs;
  });
  const dispatch = useDispatch();
  
  // Handle any appointment data passed via navigation
  useFocusEffect(
    React.useCallback(() => {
      console.log("Screen focused, route params:", route.params);
      if (route.params?.appointmentDetails) {
        console.log("Appointment details received:", route.params.appointmentDetails);
        
        // Dispatch action to add notification to Redux store
        dispatch(addNotification(route.params.appointmentDetails));
        
        // Clear the params to avoid adding the same appointment multiple times
        navigation.setParams({ appointmentDetails: null });
      }
      
      return () => {
        // Cleanup function when screen loses focus
      };
    }, [route.params, dispatch])
  );

  // Handle cancel appointment
  const handleCancelAppointment = (index) => {
    Alert.alert(
      "Cancel Appointment",
      "Are you sure you want to cancel this appointment?",
      [
        {
          text: "No",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => {
            // Dispatch action to remove notification from Redux store
            dispatch(removeNotification(index));
          },
          style: "destructive"
        }
      ]
    );
  };

  // Handle call trainer
  const handleCallTrainer = (trainerName) => {
    Alert.alert(
      "Call Trainer",
      `Calling ${trainerName}...`,
      [{ text: "OK" }]
    );
  };
  
  
  console.log("Notifications count:", notifications ? notifications.length : 0);
  
  return (
    <SafeAreaView style={styles.container}>
      <NotificationBar />
      <Text style={[regular16, { textAlign: 'center', marginBottom: 20 }]}>Notifications</Text>
      
      {notifications && notifications.length > 0 ? (
        <FlatList
          data={notifications}
          keyExtractor={(item, index) => `notification-${index}`}
          renderItem={({item, index}) => (
            <AppointmentCard
              appointment={item}
              onCancel={() => handleCancelAppointment(index)}
              onCall={() => handleCallTrainer(item.trainerName)}
            />
          )}
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={[styles.subtitle, regular9]}>No new notifications</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
    paddingHorizontal: 24,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#c4c4c4',
    textAlign: 'center',
    marginTop: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  appointmentsContainer: {
    marginTop: 20,
    paddingBottom: 20,
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
    paddingBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  testButton: {
    backgroundColor: '#3A3A3C',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  testButtonText: {
    color: '#C6FF3D',
    fontSize: 12,
  },
});

export default NotificationScreen;
