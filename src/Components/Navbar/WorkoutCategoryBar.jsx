import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { regular, regular9 } from '../../utils/Style';

const WorkoutCategoriesBar = () => {
  const [selectedCategory, setSelectedCategory] = useState('Beginner');
  const categories = ['Beginner', 'Intermediate', 'Advance'];

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
            regular9,
            { paddingVertical: 10, numberOfLines: 1 },
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
  },
  buttonContainer: {
    flexDirection: 'row',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#505050',
    overflow: 'hidden',
  },
  categoryButton: {
    flex: 1,
    paddingHorizontal: 8,
  },
  selectedButton: {
    backgroundColor: '#d0fd3e',
  },
  unselectedButton: {
    backgroundColor: 'transparent',
  },

  selectedText: {
    color: '#000000',
  },
  unselectedText: {
    color: '#c4c4c4',
  },
});

export default WorkoutCategoriesBar;
