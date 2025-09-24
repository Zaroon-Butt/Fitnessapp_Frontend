/**
 * @format
 */
import 'react-native-reanimated';

// Load environment variables
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  GOOGLE_WEB_CLIENT_ID,
} from '@env';

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
  scopes: ['profile', 'email'],
});

AppRegistry.registerComponent(appName, () => App);
