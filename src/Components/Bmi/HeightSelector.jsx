import React from 'react';
import { View, FlatList, Dimensions, StyleSheet } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const HeightSelector = ({ height, onChange }) => {
	const heights = Array.from({ length: 101 }, (_, i) => i + 120);
	const handleScroll = e => {
		const index = Math.round((e.nativeEvent.contentOffset.x - 20) / 14);
		const newHeight = heights[Math.max(0, Math.min(index, heights.length - 1))];
		if (newHeight !== height) onChange(newHeight);
	};

	return (
		<View style={styles.heightSelector}>
			<FlatList
				data={heights}
				horizontal
				showsHorizontalScrollIndicator={false}
				snapToInterval={14}
				onScroll={handleScroll}
				onMomentumScrollEnd={handleScroll}
				contentContainerStyle={{ paddingHorizontal: screenWidth / 2 - 7 }}
				renderItem={({ item }) => {
					const distance = Math.abs(item - height);
					const barHeight = distance === 0 ? 80 : distance <= 2 ? 50 : 35;
					const opacity = distance === 0 ? 1 : distance <= 2 ? 0.6 : 0.3;
					return (
						<View style={styles.heightBar}>
							<View style={[styles.bar, { height: barHeight, opacity }]} />
						</View>
					);
				}}
				keyExtractor={item => item.toString()}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	heightSelector: { width: '100%', height: 100, justifyContent: 'center' },
	heightBar: { height: 80, width: 14, justifyContent: 'flex-end', alignItems: 'center' },
	bar: { backgroundColor: '#d0fd3e', width: 5, borderRadius: 2 },
});

export default HeightSelector;
