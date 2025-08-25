import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import NextArrowButton from '../Buttons/NextArrowButton';

const ExerciseDetailCard = ({ exercise, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.contentRow}>
        <WebView
          source={exercise.image}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title} numberOfLines={3}>
          {exercise.title}
        </Text>
        <View style={styles.arrowContainer}>
          <NextArrowButton onPress={onPress} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ExerciseDetailCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#b7ff00',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 25,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    textAlign: 'left',
  },
  arrowContainer: {
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
