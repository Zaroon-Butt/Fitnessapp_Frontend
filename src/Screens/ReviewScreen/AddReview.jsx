import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Slider from "@react-native-community/slider";
import BackButton from "../../Components/Buttons/BackButton";
import { normal, regular, regular16 } from "../../utils/Style";
import BigButton from "../../Components/Buttons/BigButton";

const WriteReview = () => {
  const [rating, setRating] = useState(2);
  const [review, setReview] = useState("");

  const handleSendReview = () => {
    // Add logic to submit the review
    console.log('Review submitted:', { rating, review });
    // You can add navigation back or show success message here
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <BackButton/>
          <Text style={normal}>WRITE A REVIEW</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Rating */}
        <View style={styles.ratingSection}>
          <Text style={styles.ratingNumber}>{rating.toFixed(1)}</Text>

          {/* Thick Slider */}
          <View style={styles.thickSliderContainer}>
            <View style={styles.sliderTrack}>
              <View style={[styles.sliderFilledTrack, { width: `${(rating / 5) * 100}%` }]} />
            </View>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={5}
              step={0.1}
              value={rating}
              onValueChange={setRating}
              minimumTrackTintColor="transparent"
              maximumTrackTintColor="transparent"
              thumbTintColor="transparent"
            />
            <View style={styles.ratingLabelOverlay}>
              <Text style={styles.ratingLabel}>Rating</Text>
            </View>
          </View>
        </View>

        {/* Review Input */}
        <View style={styles.reviewSection}>
          <Text style={styles.reviewLabel}>Review (Optional)</Text>
          <TextInput
            style={styles.textArea}
            value={review}
            onChangeText={setReview}
            multiline
            placeholder=""
            placeholderTextColor="#434343"
            textAlignVertical="top"
          />
        </View>

        {/* Send Button */}
        <View style={styles.sendButtonContainer}>
          <BigButton onPress={handleSendReview}>
            <Text style={[regular16, { color: '#000' }]}>Send</Text>
          </BigButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1e",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  backArrow: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "300",
  },
  title: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  ratingSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  ratingNumber: {
    color: "#ffffff",
    fontSize: 36,
    fontWeight: "300",
    textAlign: "right",
    marginBottom: 8,
  },
  thickSliderContainer: {
    position: "relative",
    height: 48,
    justifyContent: "center",
  },
  sliderTrack: {
    height: 48,
    backgroundColor: "#434343",
    borderRadius: 24,
    overflow: "hidden",
  },
  sliderFilledTrack: {
    height: "100%",
    backgroundColor: "#d0fd3e",
    borderRadius: 24,
  },
  slider: {
    position: "absolute",
    width: "100%",
    height: 48,
  },
  ratingLabelOverlay: {
    position: "absolute",
    left: 16,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    pointerEvents: "none",
  },
  ratingLabel: {
    color: "#1c1c1e",
    fontSize: 16,
    fontWeight: "500",
    backgroundColor: "#d0fd3e",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  reviewSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  reviewLabel: {
    color: "#dadada",
    fontSize: 14,
    marginBottom: 8,
  },
  textArea: {
    backgroundColor: "#2c2c2e",
    borderRadius: 16,
    padding: 16,
    height: 200,
    color: "#ffffff",
    fontSize: 16,
  },
  sendButtonContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sendButton: {
    backgroundColor: "#d0fd3e",
    height: 56,
    width: "100%",
    borderRadius: 28,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",   

      
  },
  sendButtonText: {
    color: "#1c1c1e",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default WriteReview;
