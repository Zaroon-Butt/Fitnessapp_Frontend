import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { ProfilePicture } from '../../utils';
import BackButton from '../../Components/Buttons/BackButton';
import { medium, regular, regular16 } from '../../utils/Style';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { logout, store } from '../../redux/store';
import NextArrowButton from '../../Components/Buttons/NextArrowButton';
import { setIsLogin } from '../../redux/Reducers/userReducer';
import { isUsername } from '../../redux/Reducers/userReducer';
const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const today = new Date().toLocaleDateString();

  const handleSignOut = () => {
    store.dispatch(setIsLogin(false));
  };

  const isUsername = useSelector(state => state.user.isUsername);
  console.log(isUsername);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <BackButton />
        <Text style={[medium, { flex: 1, textAlign: 'center' }]}>Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.profileImageWrapper}>
          <Image source={ProfilePicture} style={styles.profileImage} />
          <View style={styles.proBadge}>
            <Text style={styles.proText}>PRO</Text>
          </View>
        </View>

        <View style={styles.verticalDivider} />

        <View style={styles.profileInfo}>
          <Text style={styles.joinedText}>Joined</Text>
          <Text style={styles.joinedDate}>2 months ago</Text>
          <Text style={styles.proMemberText}>Pro Member</Text>
          <Text style={styles.subscriptionEnd}>Joined {today}</Text>
          <Text style={styles.subscriptionType}>12 Months Subscription</Text>
        </View>
      </View>

      {/* Name */}
      <View style={styles.nameContainer}>
        <Text style={medium}>{isUsername}</Text>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('EditProfileScreen')}
        >
          <Text style={regular}>Edit Profile</Text>
          <NextArrowButton
            onPress={() => navigation.navigate('EditProfileScreen')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PolicyScreen')}
        >
          <Text style={regular}>Privacy Policy</Text>
          <NextArrowButton
            onPress={() => navigation.navigate('PolicyScreen')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SettingScreen')}
        >
          <Text style={regular}>Settings</Text>
          <NextArrowButton
            onPress={() => navigation.navigate('SettingScreen')}
          />
        </TouchableOpacity>
      </View>

      {/* Sign Out */}
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={[regular, { color: 'red' }]}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
    paddingHorizontal: 24,
  },
  headerContainer: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileSection: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
  },
  profileImageWrapper: {
    position: 'relative',
    marginRight: 20,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: 'red',
  },
  proBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: 'red',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  proText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  verticalDivider: {
    width: 2,
    height: 80,
    backgroundColor: '#333',
    marginHorizontal: 30,
  },
  joinedText: {
    color: '#ccc',
    fontSize: 12,
  },
  joinedDate: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  proMemberText: {
    color: 'red',
    fontSize: 13,
    marginTop: 5,
  },
  subscriptionEnd: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  subscriptionType: {
    color: '#ccc',
    fontSize: 12,
  },
  nameContainer: {
    marginTop: 30,
    alignSelf: 'flex-start',
  },

  buttonContainer: {
    marginTop: 40,
  },
  button: {
    paddingVertical: 20,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  signOutButton: {
    marginTop: 40,
    paddingVertical: 20,
  },
  signOutText: {
    color: 'red',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
