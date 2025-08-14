
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import BackButton from '../../Components/Buttons/BackButton';


const WebviewScreen = ({ route, navigation }) => {
  const { url, title } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={styles.backButtonContainer}>
          <BackButton onPress={() => navigation.goBack()} />
        </View>
        <Text style={styles.headerTitle}>{title}</Text>
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
    paddingTop:20,
    paddingBottom: 10,
    backgroundColor: '#121212',
    paddingHorizontal: 10,
    
  },
  backButtonContainer: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  webview: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  container: {
    flex: 1,
    padding: 0,
  },
});
