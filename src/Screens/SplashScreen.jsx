import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { heading } from '../utils/Style';
import { SplashScreenLogo } from '../utils';
import { useDispatch } from 'react-redux';
import { setIsLogin } from '../redux/Reducers/userReducer';

const DumbbellIcon = ({ style }) => {
  return (
    <Image
      style={[styles.dumbbellContainer, style]}
      source={SplashScreenLogo}
      resizeMode="contain"
    />
  );
};

const SplashScreen = () => {
  const dispatch = useDispatch();

  dispatch(setIsLogin(false));

  return (
    <View style={styles.container}>
      <View style={styles.logoCircle}>
        <DumbbellIcon />
      </View>

      <Text style={heading}>Fitness</Text>
      <Text style={heading}>Freak</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoCircle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 4,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48,
  },
});

export default SplashScreen;
