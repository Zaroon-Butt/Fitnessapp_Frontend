import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Provider, useDispatch } from 'react-redux';

import { store } from './src/redux/store.jsx';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './src/redux/store.jsx';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './src/Screens/SplashScreen.jsx';
import Routes from './src/routes/Routes.jsx';
import { ProvideProvider } from './src/context/ProvideContext.jsx';
import { initializeNotifications } from './src/utils/NotificationService';


export default function App() {
  const [isSplashScreenVisible, setSplashScreenVisible] = useState(true);

  useEffect(() => {
    // Initialize notifications when app starts
    initializeNotifications().catch(error => {
      console.error('Failed to initialize notifications:', error);
    });

    const timer = setTimeout(() => {
      setSplashScreenVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ProvideProvider>
          <NavigationContainer>
            {isSplashScreenVisible ? <SplashScreen /> : <Routes />}
          </NavigationContainer>
        </ProvideProvider>
      </PersistGate>
    </Provider>
  );
}
