import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import NetworkScreen from '../../Screens/HomeScreens/NetworkScreen';
import HomeScreen from '../../Screens/HomeScreens/HomeScreen';
import NotificationScreen from '../../Screens/HomeScreens/NotificationScreen';
import ProfileScreen from '../../Screens/HomeScreens/ProfileScreen';

import {
  HomeLogo,
  NetworkBars,
  Notification,
  ProfilePicture
} from '../../utils/index';

const Tab = createBottomTabNavigator();

const CustomTabIcon = ({ icon, focused }) => (
  <Image
    source={icon}
    style={[styles.icon, { tintColor: focused ? '#ffffff' : '#c4c4c4' }]}
  />
);

const ProfileTabIcon = ({ icon, focused }) => (
  <View style={[styles.profileIconContainer, { opacity: focused ? 1 : 0.6 }]}>
    <Image
      source={icon}
      style={styles.profileIcon}
    />  
  </View>
);

const BottomNavbar = () => {

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon icon={HomeLogo} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Network"
        component={NetworkScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon icon={NetworkBars} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon icon={Notification} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <ProfileTabIcon icon={ProfilePicture} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#1c1c1e',
    borderTopColor: '#2c2c2e',
    borderTopWidth: 1,
    height: 50,
    paddingBottom: 8,
    paddingTop: 4,
  },
  icon: {
    width: 22,
    height: 22,
  },
  profileIconContainer: {
    width: 40,
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
  },
  profileIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
 
});

export default BottomNavbar;
