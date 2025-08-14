import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

export default function Routes() {
  const {isLogin} = useSelector(state => state.user);

  return isLogin ? <AppStack /> : <AuthStack />;
}
