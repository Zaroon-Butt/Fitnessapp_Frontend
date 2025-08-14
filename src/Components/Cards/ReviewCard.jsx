import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RF } from '../../utils/responsive';

const ReviewCard = ({ review }) => {  
   
  return (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <View style={styles.reviewerInfo}>
          <Text style={styles.reviewerName}>{review.reviewer}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{review.rating}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.reviewComment}>{review.comment}</Text>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  reviewCard: {
    backgroundColor: '#2C2C2E',
    borderRadius: 25,
    marginTop: 15,
    padding: 16,
    marginHorizontal: 5,
  },
  reviewHeader: {
    marginBottom: 12,
  },
  reviewerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewerName: {
    color: '#fff',
    fontSize: RF(16),
    fontWeight: '600',
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 50,
    height: 24,
    justifyContent: 'center',
  },
 
  ratingText: {
    color: 'black',
    fontSize: RF(12),
    fontWeight: '500',
    backgroundColor: '#D3FF25',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  reviewComment: {
    color: '#ccc',
    fontSize: RF(11),
    lineHeight: RF(11),
    fontWeight: '400',
  },
});