import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const MonthYearPicker = ({ value, onDateChange, placeholder = "Expiry MM/YY" }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(
    value?.month || new Date().getMonth() + 1
  );
  const [selectedYear, setSelectedYear] = useState(
    value?.year || new Date().getFullYear()
  );

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Generate years from current year to 10 years in the future
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear + i);

  const formatDate = (month, year) => {
    const monthStr = month.toString().padStart(2, '0');
    const yearStr = year.toString().slice(-2);
    return `${monthStr}/${yearStr}`;
  };

  const handleConfirm = () => {
    const dateValue = {
      month: selectedMonth,
      year: selectedYear,
      formatted: formatDate(selectedMonth, selectedYear)
    };
    onDateChange(dateValue);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    // Reset to current values
    if (value) {
      setSelectedMonth(value.month);
      setSelectedYear(value.year);
    }
    setIsModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={[
          styles.inputText,
          !value && styles.placeholderText
        ]}>
          {value ? value.formatted : placeholder}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancel}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Expiry Date</Text>
            </View>

            <View style={styles.pickersContainer}>
              {/* Month Picker */}
              <View style={styles.pickerColumn}>
                <Text style={styles.columnTitle}>Month</Text>
                <ScrollView 
                  style={styles.picker}
                  showsVerticalScrollIndicator={false}
                >
                  {months.map((month, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.pickerItem,
                        selectedMonth === index + 1 && styles.selectedItem
                      ]}
                      onPress={() => setSelectedMonth(index + 1)}
                    >
                      <Text style={[
                        styles.pickerItemText,
                        selectedMonth === index + 1 && styles.selectedItemText
                      ]}>
                        {month}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Year Picker */}
              <View style={styles.pickerColumn}>
                <Text style={styles.columnTitle}>Year</Text>
                <ScrollView 
                  style={styles.picker}
                  showsVerticalScrollIndicator={false}
                >
                  {years.map((year) => (
                    <TouchableOpacity
                      key={year}
                      style={[
                        styles.pickerItem,
                        selectedYear === year && styles.selectedItem
                      ]}
                      onPress={() => setSelectedYear(year)}
                    >
                      <Text style={[
                        styles.pickerItemText,
                        selectedYear === year && styles.selectedItemText
                      ]}>
                        {year}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={handleConfirm}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    justifyContent: 'center',
    minHeight: 50,
  },
  inputText: {
    fontSize: 14,
    color: '#fff',
  },
  placeholderText: {
    color: '#888',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.85,
    backgroundColor: '#2C2C2E',
    borderRadius: 20,
    padding: 20,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  pickersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pickerColumn: {
    flex: 1,
    marginHorizontal: 10,
  },
  columnTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#D0FD3E',
    textAlign: 'center',
    marginBottom: 10,
  },
  picker: {
    height: 150,
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
  },
  pickerItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: '#D0FD3E',
  },
  pickerItemText: {
    fontSize: 16,
    color: '#fff',
  },
  selectedItemText: {
    color: '#000',
    fontWeight: '600',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#444',
  },
  confirmButton: {
    backgroundColor: '#D0FD3E',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  confirmButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MonthYearPicker;