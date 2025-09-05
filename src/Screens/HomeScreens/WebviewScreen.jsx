import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import BackButton from '../../Components/Buttons/BackButton';
import { normal, normal16 } from '../../utils/Style';
import { RF } from '../../utils/responsive';
const WebviewScreen = ({ route, navigation }) => {
  const { url, title } = route.params;

  return (
    <View style={{ flex: 1  }}>
      <View style={styles.header}>
        <View style={styles.backButtonContainer}>
          <BackButton onPress={() => navigation.goBack()} />
        </View>
        <Text style={[normal16, { flex: 1, numberOfLines: 2 , marginRight: RF(20) }]}>{title}</Text>
      </View>
      <View style={styles.container}>
        <WebView source={{ uri: url }} style={styles.webview} />
      </View>
    </View>
  );
};

export default WebviewScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#121212',
    paddingHorizontal: 10,
  },
  backButtonContainer: {
    marginRight: 10,
  },
  webview: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  container: {
    flex: 1,
  },
});
