import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import { useState } from 'react';
import BackButton from '../../Components/Buttons/BackButton';
import { normal16 } from '../../utils/Style';
import { OffRadioButton, OnRadioButton } from '../../utils';
import { languages } from '../../SampleData/SampleLanguageData';

const LanguageSettingScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English'); 
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredLanguages = languages.filter(language =>
    language.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderLanguageItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.button}
      onPress={() => setSelectedLanguage(item.name)}
    >
      <Text style={styles.buttonText}>{item.name}</Text>
      <Image 
        style={styles.radioButton} 
        source={selectedLanguage === item.name ? OnRadioButton : OffRadioButton}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <BackButton />
        <Text style={[normal16, { marginLeft: 70 }]}>Language</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search languages..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredLanguages}
        renderItem={renderLanguageItem}
        keyExtractor={(item) => item.id}
        style={styles.languageList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#1c1c1e',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 30,
  },
  searchContainer: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  searchInput: {
    backgroundColor: '#333',
    color: 'white',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  languageList: {
    marginTop: 20,
    flex: 1,
  },
  button: {
    paddingVertical: 15,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 15,
  },
  radioButton: {
    width: 20,
    height: 20,
    marginRight: 20,
    resizeMode: 'contain',
  },
});

export default LanguageSettingScreen;
