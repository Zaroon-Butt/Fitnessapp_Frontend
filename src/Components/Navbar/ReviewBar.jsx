import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ReviewProgressBar = () => {
  const [ratings, setRatings] = useState({
    5: 100,
    4: 60,
    3: 20,
    2: 30,
    1: 30,
  });

  const totalRatings = Object.values(ratings).reduce(
    (sum, count) => sum + count,
    0,
  );

  return (
    <View style={styles.container}>
      {/* Main Section with Rating and Progress Bars */}
      <View style={styles.mainContainer}>
        <View style={styles.ratingSection}>
          <Text style={styles.averageRating}>4.6</Text>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.ratingBarsContainer}>
            {/* Iterate from 5 stars down to 1 star to create the bars */}
            {[5, 4, 3, 2, 1].map(star => {
              const count = ratings[star] || 0;
              const barWidth =
                totalRatings > 0 ? (count / totalRatings) * 100 : 0;

              return (
                <View key={star} style={styles.ratingRow}>
                  <Text style={styles.RatingText}>{star}</Text>
                  <View style={styles.progressBarBackground}>
                    <View
                      style={[
                        styles.progressBarFill,
                        { width: `${barWidth}%` },
                      ]}
                    />
                  </View>
                </View>
              );
            })}
          </View>
          <Text style={styles.totalRatingsText}>{totalRatings} Ratings</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  mainContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  ratingSection: {
    flex: 1,
    marginRight: 30,
    marginBottom: 20,
  },
  progressSection: {
    flex: 1,
    maxWidth: 350,
  },
  averageRating: {
    fontSize: 65,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  totalRatingsText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
  ratingBarsContainer: {
    width: '100%',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  RatingText: {
    color: '#fff',
    width: 20,
    marginRight: 10,
    fontSize: 12,
    textAlign: 'center',
  },
  progressBarBackground: {
    flex: 1,
    height: 6,
    backgroundColor: '#333',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFFFFF', // The same green for the fill
    borderRadius: 6,
  },
});

export default ReviewProgressBar;
