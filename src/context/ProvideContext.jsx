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
		console.log('=== ProvideContext.submitOnboarding STARTED ===');
		setIsLoading(true);
		setError(null);
		try {
			// Merge extra data with onboarding data
			const mergedData = { ...onboarding, ...extra };
			console.log('ProvideContext: Onboarding state:', JSON.stringify(onboarding, null, 2));
			console.log('ProvideContext: Extra data:', JSON.stringify(extra, null, 2));
			console.log('ProvideContext: Merged data:', JSON.stringify(mergedData, null, 2));
			
			// Check if this is a Google sign-up
			const isGoogleAuth = mergedData.authProvider === 'google' && mergedData.googleId;
			console.log('ProvideContext: Checking authentication type...');
			console.log('ProvideContext: Has email:', !!mergedData.email);
			console.log('ProvideContext: Has password:', !!mergedData.password);
			console.log('ProvideContext: Auth provider:', mergedData.authProvider);
			console.log('ProvideContext: Has googleId:', !!mergedData.googleId);
			console.log('ProvideContext: Is Google auth:', isGoogleAuth);
			
			// Handle sign-up (both regular and Google) with unified approach
			console.log('ProvideContext: Processing sign-up with unified approach');
			const payload = { 
				email: mergedData.email,
				password: mergedData.password, // This will be the Google ID token for Google auth
				Gender: mergedData.gender,
				Age: parseInt(mergedData.age) || 0,
				Height: parseInt(mergedData.height) || 0,
				Goal: mergedData.goal,
				ActivityLevel: mergedData.activityLevel,
				Weight: parseInt(mergedData.weight) || 0,
				isPro: mergedData.isPro || false,
			};
			
			console.log('ProvideContext: Prepared signup payload:');
			console.log('ProvideContext: Email:', payload.email);
			console.log('ProvideContext: Password length:', payload.password ? payload.password.length : 0);
			console.log('ProvideContext: Password type (Google ID token or regular):', isGoogleAuth ? 'Google ID Token' : 'Regular Password');
			console.log('ProvideContext: Gender:', payload.Gender);
			console.log('ProvideContext: Age:', payload.Age);
			console.log('ProvideContext: Height:', payload.Height);
			console.log('ProvideContext: Goal:', payload.Goal);
			console.log('ProvideContext: ActivityLevel:', payload.ActivityLevel);
			console.log('ProvideContext: Weight:', payload.Weight);
			console.log('ProvideContext: isPro:', payload.isPro);
			console.log('ProvideContext: Full payload:', JSON.stringify(payload, null, 2));
			
			const requiredFields = ['email', 'password', 'Gender', 'Age', 'Height', 'Goal', 'ActivityLevel', 'Weight'];
			const missingFields = requiredFields.filter(field => !payload[field] && payload[field] !== 0);
			if (missingFields.length > 0) {
				console.log('ProvideContext: ERROR - Missing required fields:', missingFields);
				throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
			}
			
			console.log('ProvideContext: All required fields present, calling AuthApi.signUp...');
			const data = await AuthApi.signUp(payload);
			console.log('ProvideContext: AuthApi.signUp completed successfully');
			setUser(data.user || data);
			setIsLoading(false);
			console.log('=== ProvideContext.submitOnboarding COMPLETED SUCCESSFULLY ===');
			return data;
		} catch (err) {
			console.log('=== ProvideContext.submitOnboarding ERROR ===');
			console.log('ProvideContext: Error in submitOnboarding:', err);
			console.log('ProvideContext: Error message:', err.message);
			console.log('ProvideContext: Full error details:', JSON.stringify(err, null, 2));
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

	// Google Sign-In (for existing users)
	const googleSignIn = async () => {
		console.log('=== ProvideContext.googleSignIn STARTED ===');
		setIsLoading(true);
		setError(null);
		try {
			console.log('ProvideContext: Setting loading state and clearing errors');
			console.log('ProvideContext: Calling AuthApi.googleSignIn...');
			const data = await AuthApi.googleSignIn();
			console.log('ProvideContext: AuthApi.googleSignIn returned successfully');
			console.log('ProvideContext: Response data type:', typeof data);
			console.log('ProvideContext: Response data keys:', Object.keys(data || {}));
			console.log('ProvideContext: Full response data:', JSON.stringify(data, null, 2));
			
			console.log('ProvideContext: Setting user state...');
			setUser(data.user || data);
			console.log('ProvideContext: User state set to:', data.user || data);
			
			console.log('ProvideContext: Setting loading to false');
			setIsLoading(false);
			console.log('=== ProvideContext.googleSignIn COMPLETED SUCCESSFULLY ===');
			return data;
		} catch (err) {
			console.log('=== ProvideContext.googleSignIn ERROR ===');
			console.log('ProvideContext: Error object:', err);
			console.log('ProvideContext: Error message:', err.message);
			console.log('ProvideContext: Error code:', err.code);
			console.log('ProvideContext: Full error details:', JSON.stringify(err, null, 2));
			
			console.log('ProvideContext: Setting error state to:', err.message);
			setError(err.message);
			console.log('ProvideContext: Setting loading to false');
			setIsLoading(false);
			console.log('ProvideContext: Throwing error up the chain');
			throw err;
		}
	};

	// Google Sign-Up (for new users with onboarding data)
	const googleSignUp = async (userData) => {
		console.log('=== ProvideContext.googleSignUp STARTED ===');
		setIsLoading(true);
		setError(null);
		try {
			console.log('ProvideContext: Setting loading state and clearing errors');
			console.log('ProvideContext: Input userData type:', typeof userData);
			console.log('ProvideContext: Input userData keys:', Object.keys(userData || {}));
			console.log('ProvideContext: Full input userData:', JSON.stringify(userData, null, 2));
			
			console.log('ProvideContext: Calling AuthApi.googleSignUp...');
			const data = await AuthApi.googleSignUp(userData);
			console.log('ProvideContext: AuthApi.googleSignUp returned successfully');
			console.log('ProvideContext: Response data type:', typeof data);
			console.log('ProvideContext: Response data keys:', Object.keys(data || {}));
			console.log('ProvideContext: Full response data:', JSON.stringify(data, null, 2));
			
			console.log('ProvideContext: Setting user state...');
			setUser(data.user || data);
			console.log('ProvideContext: User state set to:', data.user || data);
			
			console.log('ProvideContext: Setting loading to false');
			setIsLoading(false);
			console.log('=== ProvideContext.googleSignUp COMPLETED SUCCESSFULLY ===');
			return data;
		} catch (err) {
			console.log('=== ProvideContext.googleSignUp ERROR ===');
			console.log('ProvideContext: Error object:', err);
			console.log('ProvideContext: Error message:', err.message);
			console.log('ProvideContext: Error code:', err.code);
			console.log('ProvideContext: Full error details:', JSON.stringify(err, null, 2));
			
			console.log('ProvideContext: Setting error state to:', err.message);
			setError(err.message);
			console.log('ProvideContext: Setting loading to false');
			setIsLoading(false);
			console.log('ProvideContext: Throwing error up the chain');
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
				googleSignIn,
				googleSignUp,
				logout,
				setUser,
			}}
		>
			{children}
		</ProvideContext.Provider>
	);
};
