import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { normal, regular16 } from '../../utils/Style';
import BigButton from '../../Components/Buttons/BigButton';
import BackButton from '../../Components/Buttons/BackButton';
import { ProfilePicture } from '../../utils';
import { setIsUsername } from '../../redux/Reducers/userReducer';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


const EditProfileScreen = () => {
  const username = useSelector(state => state.user.isUsername);
  const [name, setName] = useState(username || '');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={normal}>Edit Profile</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.bankCardContainer}>
          <Image source={ProfilePicture} style={styles.profileImage} />
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
            maxLength={30}
          />
        </View>

        <View style={styles.buttonWrapper}>
          <BigButton
            onPress={() => {
              dispatch(setIsUsername(name));
              navigation.navigate('BottomNavbar');
            }}
          >
            <Text style={[regular16, { color: '#000' }]}>Done</Text>
          </BigButton>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  content: {
    paddingTop: 20,
  },
  bankCardContainer: {
    alignItems: 'center',
    marginBottom: 20,
    height: 200,
    width: 200,
    alignSelf: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    resizeMode: 'cover',
  },
  form: {
    paddingHorizontal: 20,
    marginTop: 20,
    paddingBottom: 20,
  },
  input: {
    borderBottomWidth: 3,
    borderTopWidth: 3,
    borderBottomColor: '#2C2C2E',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 14,
    color: '#fff',
    marginBottom: 10,
  },
  buttonWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
  },
});

export default EditProfileScreen;
