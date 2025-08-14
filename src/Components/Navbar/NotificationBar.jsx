import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NotificationBar = () => {
  const [selectedCategory, setSelectedCategory] = useState('New');
  const navigation = useNavigation();

  const categories = ['New', 'Events', 'All'];

  const renderCategoryButton = category => {
    const isSelected = selectedCategory === category;

    return (
      <TouchableOpacity
        key={category}
        style={[
          styles.categoryButton,
          isSelected ? styles.selectedButton : styles.unselectedButton,
        ]}
        onPress={() => setSelectedCategory(category)}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.categoryText,
            isSelected ? styles.selectedText : styles.unselectedText,
          ]}
        >
          {category}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Category Buttons */}
      <View style={styles.buttonContainer}>
        {categories.map(renderCategoryButton)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    minHeight: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#d0fd3e',
  },
  buttonContainer: {
    flexDirection: 'row',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#505050',
    overflow: 'hidden',
    height: 40,
  },
  categoryButton: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  selectedButton: {
    backgroundColor: '#d0fd3e',
  },
  unselectedButton: {
    backgroundColor: 'transparent',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  selectedText: {
    color: '#000000',
  },
  unselectedText: {
    color: '#c4c4c4',
  },
});

export default NotificationBar;
