import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Onboarding from '../Screens/OnBoardingScreens/onBoardingScreen';
import GenderScreen from '../Screens/InfomationScreens/GenderScreen';
import AgeScreen from '../Screens/InfomationScreens/AgeScreen';
import HeightScreen from '../Screens/InfomationScreens/HeightScreen';
import GoalScreen from '../Screens/InfomationScreens/GoalScreen';
import ActivityScreen from '../Screens/InfomationScreens/ActivityScreen';
import WeightScreen from '../Screens/InfomationScreens/WeightScreen';
import SignUp from '../Screens/AuthenticationScreens/SignUp';
import SignIn from '../Screens/AuthenticationScreens/SignIn';
import ForgotPassword from '../Screens/AuthenticationScreens/ForgetPassword';
import OtpScreen from '../Screens/AuthenticationScreens/OtpScreen';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();
const AgeScreenWrapper = ({ navigation, route }) => (
  <AgeScreen
    onAgeChange={age => navigation.navigate('HeightScreen', { age })}
  />
);

const HeightScreenWrapper = ({ navigation, route }) => (
  <HeightScreen
    onChange={height => navigation.navigate('GoalScreen', { height })}
  />
);

const GoalScreenWrapper = ({ navigation, route }) => (
  <GoalScreen
    onChange={goal => navigation.navigate('ActivityScreen', { goal })}
  />
);

const ActivityScreenWrapper = ({ navigation, route }) => (
  <ActivityScreen
    onChange={activity => navigation.navigate('WeightScreen', { activity })}
  />
);

const AuthStack = () => {
  const { isOnboarding } = useSelector(state => state.user);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#1C1C1E' },
      }}
    >
      {isOnboarding && (
        <Stack.Screen name="Onboarding" component={Onboarding} />
      )}
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="GenderScreen" component={GenderScreen} />
      <Stack.Screen name="AgeScreen" component={AgeScreenWrapper} />
      <Stack.Screen name="HeightScreen" component={HeightScreenWrapper} />
      <Stack.Screen name="GoalScreen" component={GoalScreenWrapper} />
      <Stack.Screen name="ActivityScreen" component={ActivityScreenWrapper} />
      <Stack.Screen name="WeightScreen" component={WeightScreen} />
      <Stack.Screen name="ForgetPassword" component={ForgotPassword} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
