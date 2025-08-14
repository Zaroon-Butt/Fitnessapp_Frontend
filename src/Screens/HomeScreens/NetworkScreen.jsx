import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

const CircularProgressBar = ({
  progress = 0,
  size = 150,
  strokeWidth = 10,
  color,
  label,
  value,
  showText = true,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const strokeColor = color ? color : 'url(#progressGradient)';
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  return (
    <View style={[{ width: size, height: size }, styles.progressContainer]}>
      <Svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: [{ rotate: '-90deg' }] }}
      >
        <Defs>
          <LinearGradient
            id="progressGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <Stop offset="0%" stopColor="#FF2424" />
            <Stop offset="100%" stopColor="#D9FD00" />
          </LinearGradient>
        </Defs>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#4B5563"
          strokeWidth={strokeWidth}
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>
      {showText && (
        <View style={styles.textContainer}>
          {label ? (
            <>
              <Text style={styles.valueText}>{value}</Text>
              <Text style={styles.labelText}>{label}</Text>
            </>
          ) : (
            <Text style={styles.progressText}>{`${Math.round(
              progress,
            )}%`}</Text>
          )}
        </View>
      )}
    </View>
  );
};

const WorkoutCard = ({ title, time, completed = false }) => {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.cardTitle}>{title}</Text>
        {time && <Text style={styles.cardTime}>{time}</Text>}
      </View>
      {completed && <Text style={styles.checkmark}>✓</Text>}
    </View>
  );
};

export default function FitnessDashboard() {
  const [selectedDate, setSelectedDate] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(5);
  // Set fixed values for the progress bars
  const [activeCalories] = useState(65);
  const [steps] = useState(80);
  const [time] = useState(60);
  const [heartRate] = useState(90);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const generateCalendarDates = () => {
    const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const dates = [];
    const daysInMonth = 31; // Simplified for demo
    for (let i = 1; i <= daysInMonth; i++) {
      const dayIndex = (i - 1) % 7;
      dates.push({
        day: daysOfWeek[dayIndex],
        date: i,
        active: i === selectedDate,
      });
    }
    return dates;
  };
  const dates = generateCalendarDates();

  const handlePreviousMonth = () => {
    setSelectedMonth(prevMonth => (prevMonth === 0 ? 11 : prevMonth - 1));
  };
  const handleNextMonth = () => {
    setSelectedMonth(prevMonth => (prevMonth === 11 ? 0 : prevMonth + 1));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handlePreviousMonth}>
            <Text style={styles.arrow}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>{months[selectedMonth]} 2025</Text>
          <TouchableOpacity onPress={handleNextMonth}>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Date Pills - Horizontal ScrollView */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dateScrollContainer}
          style={styles.dateScrollView}
        >
          {dates.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedDate(item.date)}
            >
              <View
                style={[styles.datePill, item.active && styles.datePillActive]}
              >
                <Text
                  style={[styles.dateDay, item.active && styles.dateDayActive]}
                >
                  {item.day}
                </Text>
                <Text
                  style={[
                    styles.dateNumber,
                    item.active && styles.dateNumberActive,
                  ]}
                >
                  {item.date}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Main Calorie Circle */}
        <View style={styles.centeredSection}>
          <View style={styles.mainProgressBarContainer}>
            <CircularProgressBar
              progress={activeCalories}
              size={250}
              strokeWidth={20}
              showText={false}
            />
            <View style={styles.mainTextContainer}>
              <Text style={styles.mainValueText}>652 Cal</Text>
              <Text style={styles.mainLabelText}>Active Calories</Text>
            </View>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <CircularProgressBar
            progress={steps}
            size={120}
            strokeWidth={6}
            color="#D0FD3E" // Greenish color
            label="Steps"
            value="6540"
          />
          <CircularProgressBar
            progress={time}
            size={120}
            strokeWidth={6}
            color="#FF2424" // Reddish color
            label="Time"
            value="45 min"
          />
          <CircularProgressBar
            progress={heartRate}
            size={120}
            strokeWidth={6}
            color="#E79332" // Orange color
            label="Heart"
            value="72 bpm"
          />
        </View>

        {/* Finished Workout */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Finished Workout</Text>
          <WorkoutCard
            title="Stability Training"
            time="10:00"
            completed={true}
          />
          <WorkoutCard title="Flash Cycling" time="10:00" completed={false} />
        </View>
      </ScrollView>

      {/* Bottom Nav Placeholder */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
  },
  arrow: {
    color: '#c4c4c4',
    fontSize: 24,
    padding: 8,
  },
  dateScrollView: {
    marginBottom: 20,
  },
  dateScrollContainer: {
    paddingHorizontal: 24,
    paddingRight: 24,
  },
  datePill: {
    width: 48,
    height: 64,
    borderRadius: 24,
    backgroundColor: '#2c2c2e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  datePillActive: {
    backgroundColor: '#d0fd3e',
  },
  dateDay: {
    color: '#c4c4c4',
    fontSize: 12,
    fontWeight: '500',
  },
  dateDayActive: {
    color: '#000',
  },
  dateNumber: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  dateNumberActive: {
    color: '#000',
  },
  centeredSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  mainProgressBarContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainTextContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainValueText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  mainLabelText: {
    fontSize: 16,
    color: '#D1D5DB',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 80,
  },
  sectionTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#2c2c2e',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },
  cardTime: {
    fontSize: 14,
    color: '#d0fd3e',
    marginTop: 4,
  },
  checkmark: {
    fontSize: 18,
    color: '#A7F3D0',
    fontWeight: 'bold',
  },
  // CircularProgressBar specific styles
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  valueText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  labelText: {
    fontSize: 12,
    color: '#D1D5DB',
    marginTop: 4,
  },
});
