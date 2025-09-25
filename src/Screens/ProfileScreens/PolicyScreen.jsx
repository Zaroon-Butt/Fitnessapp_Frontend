import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import BackButton from '../../Components/Buttons/BackButton';
import {
  normal,
  normal16,
  regular,
  regular16,
  regular9,
} from '../../utils/Style';
import { ScrollView } from 'react-native-gesture-handler';

const Policy = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <BackButton />
        <Text style={[normal, { marginLeft: 40 }]}>Privacy Policy</Text>
      </View>
      <View style={styles.contentContainer}>
        <ScrollView>
          <Text style={[regular, { textAlign: 'left' }]}>
            At FitnessApp, your privacy is very important to us. This Privacy
            Policy explains in detail how we collect, use, store, and share your
            personal information. By using FitnessApp, you agree to the
            practices described below. We encourage you to read this policy
            carefully so that you understand how your data is handled.
            Information We Collect When you create an account on FitnessApp, we
            collect some basic details such as your name, email address, and
            password. With your explicit consent, we may also gather additional
            health and fitness-related information, including but not limited to
            your weight, workout routines, dietary preferences, heart rate,
            steps taken, and progress history. You may also choose to upload a
            profile picture or connect third-party services to enrich your
            experience. How We Use Your Information The information we collect
            is used primarily to personalize your experience and provide you
            with tailored fitness recommendations. For example, we may analyze
            your workout history to suggest new exercises, track your
            performance to show progress reports, and adjust our features to
            better match your goals. This helps us create a more effective and
            enjoyable fitness journey for you. We also use your data to:
            Operate, maintain, and improve the core functions of the app.
            Provide customer support and respond to inquiries. Send you updates,
            reminders, or motivational notifications (with your consent).
            Conduct internal research to enhance FitnessApp’s functionality and
            design. We do not sell your personal data to advertisers or third
            parties. Sharing of Information In certain cases, we may share your
            data with trusted third-party service providers who help us operate
            and maintain FitnessApp, such as hosting platforms, analytics
            providers, or customer support tools. These providers are bound by
            strict confidentiality agreements and can only use your data to
            perform services on our behalf. If you choose to connect your
            account with third-party services such as Apple Health or Google
            Fit, you authorize FitnessApp to share relevant information with
            those services. Sharing is entirely optional and controlled by you.
            We may also disclose information if required by law, legal process,
            or governmental request. Your Rights You have full control over your
            personal data. At any time, you can: Access and review the
            information we hold about you. Correct or update inaccurate details.
            Request deletion of your account and associated data. If you
            exercise any of these rights, we will respond within a reasonable
            timeframe and in accordance with applicable data protection laws.
            Data Security We implement industry-standard security measures,
            including encryption and secure servers, to protect your personal
            information. However, no digital system is completely immune to
            risks. While we work hard to protect your data, we cannot guarantee
            absolute security. Changes to This Policy We may update this Privacy
            Policy from time to time to reflect changes in technology, law, or
            our services. When updates are made, we will notify you within the
            app or via email. Contact Us If you have any questions, concerns, or
            requests regarding your privacy or this policy, please contact us
            through the app’s support section or at our official email address.
          </Text>
        </ScrollView>
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
