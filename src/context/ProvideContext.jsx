import React, { createContext, useState } from 'react';
import { AuthApi } from '../Api/AuthApi';

export const ProvideContext = createContext();

export const ProvideProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	// Onboarding state
	const [onboarding, setOnboarding] = useState({
        email: '',
        password: '',
		gender: '',
		age: '',
		height: '',
		goal: '',
		activityLevel: '',
		weight: '',
		isPro: false,
	});

	const updateOnboarding = (data) => {
		setOnboarding((prev) => ({ ...prev, ...data }));
	};

	// Check if email exists
	const checkEmail = async (email) => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await AuthApi.checkEmail(email);
			setIsLoading(false);
			return response;
		} catch (err) {
			setError(err.message);
			setIsLoading(false);
			throw err;
		}
	};

	// Submit onboarding data to API
	const submitOnboarding = async (extra = {}) => {
		setIsLoading(true);
		setError(null);
		try {
			// Merge extra data with onboarding data
			const mergedData = { ...onboarding, ...extra };
			
			const payload = { 
				email: mergedData.email,
				password: mergedData.password,
				Gender: mergedData.gender,
				Age: parseInt(mergedData.age) || 0, // Ensure it's a number
				Height: parseInt(mergedData.height) || 0, // Ensure it's a number
				Goal: mergedData.goal,
				ActivityLevel: mergedData.activityLevel,
				Weight: parseInt(mergedData.weight) || 0, // Ensure it's a number
				isPro: mergedData.isPro || false,
			};
			
			// console.log('=== SUBMITTING ONBOARDING PAYLOAD ===');
			// console.log('Full payload:', JSON.stringify(payload, null, 2));
			// console.log('Original onboarding state:', JSON.stringify(onboarding, null, 2));
			// console.log('Extra data:', JSON.stringify(extra, null, 2));
			// console.log('Merged data:', JSON.stringify(mergedData, null, 2));
			
			const requiredFields = ['email', 'password', 'Gender', 'Age', 'Height', 'Goal', 'ActivityLevel', 'Weight'];
			const missingFields = requiredFields.filter(field => !payload[field] || payload[field] === '');
			if (missingFields.length > 0) {
				console.log('Missing required fields:', missingFields);
				throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
			}
			
			const data = await AuthApi.signUp(payload);
			setUser(data.user || data);
			setIsLoading(false);
			return data;
		} catch (err) {
			console.log('Error in submitOnboarding:', err);
			setError(err.message);
			setIsLoading(false);
			throw err;
		}
	};

	// Register user and send data to API (for classic registration)
	const register = async (values) => {
		setIsLoading(true);
		setError(null);
		try {
			const data = await AuthApi.signUp(values);
			setUser(data.user || data);
			setIsLoading(false);
			return data;
		} catch (err) {
			setError(err.message);
			setIsLoading(false);
			throw err;
		}
	};

	// Login user and send data to API
	const login = async ({ email, password }) => {
		setIsLoading(true);
		setError(null);
		try {
			const data = await AuthApi.signIn({ email, password });
			setUser(data.user || data);
			setIsLoading(false);
			return data;
		} catch (err) {
			setError(err.message);
			setIsLoading(false);
			throw err;
		}
	};

	// Logout user (clear state)
	const logout = () => {
		setUser(null);
		setOnboarding({
			email: '',
			password: '',
			gender: '',
			age: '',
			height: '',
			goal: '',
			activityLevel: '',
			weight: '',
			isPro: false,
		});
	};

	return (
		<ProvideContext.Provider
			value={{
				user,
				isLoading,
				error,
				onboarding,
				updateOnboarding,
				checkEmail,
				submitOnboarding,
				register,
				login,
				logout,
				setUser,
			}}
		>
			{children}
		</ProvideContext.Provider>
	);
};
