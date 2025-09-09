import React, { useState, useRef, useEffect } from 'react';
import {View,Text,TouchableOpacity, StyleSheet,ScrollView,FlatList, Dimensions} from 'react-native';
import BackButton from '../../Components/Buttons/BackButton';
import BigButton from '../../Components/Buttons/BigButton';
import { useNavigation } from '@react-navigation/native';
import HeightSelector from '../../Components/Bmi/HeightSelector';
import WeightSelector from '../../Components/Bmi/WeightSelector';
import BmiModal from '../Modals/BmiModal';
import { regular, regular16 } from '../../utils/Style';

const { width: screenWidth } = Dimensions.get('window');

const getBMICategory = bmi => {
  if (bmi < 18.5) return { category: 'Underweight', color: '#3B82F6' };
  if (bmi < 25) return { category: 'Normal', color: '#30c522ff' };
  if (bmi < 30) return { category: 'Overweight', color: '#EAB308' };
  return { category: 'Obese', color: '#EF4444' };
};

const calculateBMI = (weight, height) => {
  const h = height / 100;
  return weight && h > 0 ? weight / (h * h) : null;
};
// Age Selector
const AgeSelector = ({ age, onChange }) => (
  <>
    <View style={styles.ageContainer}>
      <TouchableOpacity
        style={[styles.ageButton, age <= 1 && { opacity: 0.5 }]}
        onPress={() => age > 1 && onChange(age - 1)}
        disabled={age <= 1}
      >
        <Text style={styles.ageButtonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.ageValue}>{age}</Text>
      <TouchableOpacity
        style={[styles.ageButton, age >= 120 && { opacity: 0.5 }]}
        onPress={() => age < 120 && onChange(age + 1)}
        disabled={age >= 120}
      >
        <Text style={styles.ageButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  </>
);

// Gender Selector
const GenderSelector = ({ gender, onChange }) => (
  <View style={styles.genderRow}>
    {['male', 'female'].map(g => (
      <TouchableOpacity
        key={g}
        style={[styles.genderBtn, gender === g && styles.genderSelected]}
        onPress={() => onChange(g)}
      >
        <Text style={styles.genderIcon}>{g === 'male' ? '♂' : '♀'}</Text>
        <Text style={styles.genderLabel}>{g === 'male' ? 'Male' : 'Female'}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

// Main Component
const BMICalculator = () => {
  const [data, setData] = useState({ gender: 'female', height: 120, weight: 70, age: 18 });
  const [bmi, setBmi] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();

  const updateData = (field, value) => setData(prev => ({ ...prev, [field]: value }));

  const handleCalculate = () => {
    const calculatedBmi = calculateBMI(data.weight, data.height);
    if (calculatedBmi) {
      setBmi(calculatedBmi);
      setShowModal(true);
    }
  };

  const handleReset = () => {
    setBmi(null);
    setShowModal(false);
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <BackButton onPress={() => navigation.goBack()} />
          <Text style={[regular16,{flex: 1 ,textAlign:'center'}]}>BMI Calculator</Text>
        </View>

        <GenderSelector gender={data.gender} onChange={g => updateData('gender', g)} />

        <View style={styles.heightSection}>
          <Text style={[regular, { marginTop: 10 }]}>Height in cm</Text>
          <View style={styles.heightDisplay}>
            <Text style={styles.heightValue}>{data.height}</Text>
            <Text style={regular}>cm</Text>
          </View>
          <HeightSelector height={data.height} onChange={h => updateData('height', h)} />
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <Text style={[regular, { color: '#000', marginBottom: 8, alignSelf: 'center', marginTop: 8 }]}>Weight in kg</Text>
            <WeightSelector weight={data.weight} onChange={w => updateData('weight', w)} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={[regular, { color: '#000', marginBottom: 8, alignSelf: 'center', marginTop:8}]}>Age</Text>
            <AgeSelector age={data.age} onChange={a => updateData('age', a)} />
          </View>
        </View>

        <BigButton
          onPress={handleCalculate}
          disabled={!data.weight || data.weight <= 0}
        >
          <Text style={[regular16, { color: '#000' }]}>Calculate BMI</Text>
        </BigButton>
      </ScrollView>

      <BmiModal
        visible={showModal}
        onClose={handleReset}
        bmi={bmi}
        bmiCategory={bmi ? getBMICategory(bmi) : null}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#1c1c1e' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },

  genderRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  genderBtn: { flex: 1, backgroundColor: '#fff', borderWidth: 2, borderColor: '#E5E7EB', borderRadius: 16, paddingVertical: 24, marginHorizontal: 5, alignItems: 'center' },
  genderSelected: { borderColor: '#111827', backgroundColor: '#d0fd3e' },
  genderIcon: { fontSize: 50, marginBottom: 6, color: '#000000' },
  genderLabel: { ...regular, color: '#000000' },

  heightSection: { alignItems: 'center', marginBottom: 30 ,borderColor: '#2c2c2e', borderWidth: 3, borderRadius: 16 },
  heightDisplay: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 20 },
  heightValue: { fontSize: 48, fontWeight: '300', color: '#ffffff' },

  ageContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 },
  ageButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#d0fd3e', alignItems: 'center', justifyContent: 'center', marginHorizontal: 10 },
  ageButtonText: { fontSize: 24, fontWeight: 'bold', color: '#000000', textAlign: 'center' },
  ageValue: { fontSize: 24, fontWeight: 'bold', color: '#000000', minWidth: 40, textAlign: 'center' },

  inputRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  inputContainer: { flex: 1, backgroundColor: '#ffffff', borderRadius: 16, paddingVertical: 20, marginHorizontal: 5, alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB', minHeight: 100 },
});

export default BMICalculator;