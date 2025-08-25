import { createStackNavigator } from '@react-navigation/stack';
import BottomNavbar from '../Components/Navbar/BottomNavbar';
import ShowAllWorkout from '../Screens/HomeScreens/ShowAllWorkout';
import WorkoutTypes from '../Screens/HomeScreens/WorkoutTypes';
import SubscriptionScreen from '../Screens/PaymentScreens/SubscriptionScreen';
import ShowAllTrainers from '../Screens/HomeScreens/ShowAllTrainers';
import TrainerDetailScreen from '../Screens/HomeScreens/TrainerDetailScreen';
import TrainerDetailCard from '../Components/Cards/TrainerDetailCard';
import AllReviewScreen from '../Screens/HomeScreens/AllReviewScreen';
import AddReview from '../Screens/ReviewScreen/AddReview';
import Appointment from '../Screens/TrainerScreens/AppointmentScreen';
import Payment from '../Screens/PaymentScreens/PaymentScreen';
import AddCard from '../Screens/PaymentScreens/AddCardScreen';
import PaymentCompleteScreen from '../Screens/PaymentScreens/PaymentCompleteScreen';
import EditCard from '../Screens/PaymentScreens/EditCardScreen';
import EditProfileScreen from '../Screens/ProfileScreens/EditProfileScreen';
import PolicyScreen from '../Screens/ProfileScreens/PolicyScreen';
import SettingScreen from '../Screens/ProfileScreens/SettingScreen';
import UnitSettingScreen from '../Screens/ProfileScreens/UnitSettingScreen';
import NotificationSettingScreen from '../Screens/ProfileScreens/NotificationSettingScreen';
import LanguageSettingScreen from '../Screens/ProfileScreens/LanguageSettingScreen';
import WebviewScreen from '../Screens/HomeScreens/WebviewScreen';
import SubscriptionPayment from '../Screens/PaymentScreens/SubscriptionPaymentScreen';
import ContactUsScreen from '../Screens/ProfileScreens/ContactUsScreen';
import BmiScreen from '../Screens/ProfileScreens/BmiScreen';
import WorkoutTypesDetail from '../Screens/HomeScreens/WorkoutTypeDetail';
import ExerciseDetailScreen from '../Screens/HomeScreens/ExcerciseDetailScreen';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#1C1C1E' },
      }}
    >
      <Stack.Screen name="BottomNavbar" component={BottomNavbar} />
      <Stack.Screen name="ShowAllWorkout" component={ShowAllWorkout} />
      <Stack.Screen name="WorkoutTypes" component={WorkoutTypes} />
      <Stack.Screen name="SubscriptionScreen" component={SubscriptionScreen} />
      <Stack.Screen name="ShowAllTrainers" component={ShowAllTrainers} />
      <Stack.Screen name="TrainerDetail" component={TrainerDetailScreen} />
      <Stack.Screen name="TrainerDetailCard" component={TrainerDetailCard} />
      <Stack.Screen name="AllReviewScreen" component={AllReviewScreen} />
      <Stack.Screen name="AddReview" component={AddReview} />
      <Stack.Screen name="Appointment" component={Appointment} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="AddCard" component={AddCard} />
      <Stack.Screen name="PaymentCompleteScreen" component={PaymentCompleteScreen} />
      <Stack.Screen name="EditCard" component={EditCard} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="PolicyScreen" component={PolicyScreen} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="UnitSettingScreen" component={UnitSettingScreen} />
      <Stack.Screen name="NotificationSettingScreen" component={NotificationSettingScreen} />
      <Stack.Screen name="LanguageSettingScreen" component={LanguageSettingScreen} />
      <Stack.Screen name="WebviewScreen" component={WebviewScreen} />
      <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} />
      <Stack.Screen name="SubscriptionPayment" component={SubscriptionPayment} />
      <Stack.Screen name="BmiScreen" component={BmiScreen} />
      <Stack.Screen name="WorkoutTypesDetail" component={WorkoutTypesDetail} />
      <Stack.Screen name="ExerciseDetailScreen" component={ExerciseDetailScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
