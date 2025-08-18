import React, { useRef, useEffect } from 'react';
import { View, FlatList, Text, Dimensions, StyleSheet } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const WeightSelector = ({ weight, onChange }) => {
	const ref = useRef(null);
	const weights = Array.from({ length: 171 }, (_, i) => i + 30);
	const itemWidth = 50;
	useEffect(() => {
		const index = weights.indexOf(weight);
		if (index >= 0) {
			setTimeout(() => ref.current?.scrollToIndex({ index, animated: false, viewPosition: 0.5 }), 100);
		}
	}, []);

	const handleScroll = e => {
		const index = Math.round((e.nativeEvent.contentOffset.x + screenWidth / 10) / itemWidth);
		const newWeight = weights[Math.max(0, Math.min(index, weights.length - 1))];
		if (newWeight !== weight) onChange(newWeight);
	};

	return (
		<View style={styles.weightSelector}>
			<FlatList
				ref={ref}
				data={weights}
				horizontal
				showsHorizontalScrollIndicator={false}
				snapToInterval={itemWidth}
				onMomentumScrollEnd={handleScroll}
				contentContainerStyle={{ paddingHorizontal: screenWidth / 22 - itemWidth / 4 }}
				renderItem={({ item }) => (
					<View style={styles.weightItem}>
						<Text style={[styles.weightText, item === weight && styles.weightSelected]}>
							{item}
						</Text>
					</View>
				)}
				keyExtractor={item => item.toString()}
				getItemLayout={(_, index) => ({ length: itemWidth, offset: itemWidth * index, index })}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	weightSelector: { height: 80, justifyContent: 'center' },
	weightItem: { width: 50, height: 80, alignItems: 'center', justifyContent: 'center' },
	weightText: { fontSize: 18, color: '#000', opacity: 0.8 },
	weightSelected: { fontSize: 24, fontWeight: 'bold', opacity: 1 },
});

export default WeightSelector;
