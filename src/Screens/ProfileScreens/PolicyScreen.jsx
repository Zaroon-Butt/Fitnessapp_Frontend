import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import BackButton from '../../Components/Buttons/BackButton';
import { normal16, regular16, regular9 } from '../../utils/Style';

const Policy = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <BackButton />
        <Text style={[normal16, { marginLeft: 40 }]}>Privacy Policy</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={regular16}>
          our privacy is important to us. This FitnessApp Privacy Policy
          explains how we collect, use, and share your personal information to
          provide and improve our services. When you create an account, we
          collect basic details like your name and email. With your explicit
          consent, we also gather health and fitness data, such as your weight,
          workouts, and steps. We use this information to personalize your
          experience, track your progress, and enhance the app's features. We do
          not sell your data. We may share it with trusted service providers to
          run the app or with third parties if you choose to link your account,
          for example, with Apple Health or Google Fit. We may also disclose
          your information if required by law. You have the right to access,
          correct, or delete your data at any time. We use industry-standard
          security measures to protect your information, though no system can be
          entirely secure. By using FitnessApp, you agree to this policy. If you
          have any questions, please contact us.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 30,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  policyText: {
    color: '#B5B5B5',
    fontSize: 16,
    textAlign: 'flex-start',
  },
});

export default Policy;
