import React, { createContext, useState } from 'react';
import { AuthApi } from '../Api/AuthApi';
import { ProfilePicture } from '../utils';

export const ProvideContext = createContext();

export const ProvideProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	// Onboarding state
	const [onboarding, setOnboarding] = useState({
        email: '',
        password: '',
        token: '',
		gender: '',
		age: '',
		height: '',
		goal: '',
		activityLevel: '',
		weight: '',
		isPro: false,
		ProfilePicture: '',
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
			
			let data;
			
			if (isGoogleAuth) {
				// Handle Google sign-up
				console.log('ProvideContext: Processing Google sign-up');
				const googlePayload = {
					email: mergedData.email,
					googleId: mergedData.googleId,
					name: mergedData.name,
					Gender: mergedData.gender,
					Age: parseInt(mergedData.age) || 0,
					Height: parseInt(mergedData.height) || 0,
					Goal: mergedData.goal,
					ActivityLevel: mergedData.activityLevel,
					Weight: parseInt(mergedData.weight) || 0,
					ProfilePicture: mergedData.ProfilePicture || ''
				};
				
				console.log('ProvideContext: Prepared Google signup payload:', JSON.stringify(googlePayload, null, 2));
				
				const requiredGoogleFields = ['email', 'googleId', 'Gender', 'Age', 'Height', 'Goal', 'ActivityLevel', 'Weight'];
				const missingGoogleFields = requiredGoogleFields.filter(field => !googlePayload[field] && googlePayload[field] !== 0);
				if (missingGoogleFields.length > 0) {
					console.log('ProvideContext: ERROR - Missing required Google fields:', missingGoogleFields);
					throw new Error(`Missing required fields for Google sign-up: ${missingGoogleFields.join(', ')}`);
				}
				
				console.log('ProvideContext: All required Google fields present, calling AuthApi.googleSignUp...');
				data = await AuthApi.googleSignUp({ userInfo: { user: { id: googlePayload.googleId, email: googlePayload.email, name: googlePayload.name } }, ...googlePayload });
				console.log('ProvideContext: AuthApi.googleSignUp completed successfully');
			} else {
				// Handle regular email/password sign-up
				console.log('ProvideContext: Processing regular sign-up');
				const payload = { 
					email: mergedData.email,
					password: mergedData.password, // This will be the Google ID token for Google auth
					gender: mergedData.gender,
					Age: parseInt(mergedData.age) || 0,
					Height: parseInt(mergedData.height) || 0,
					Goal: mergedData.goal,
					ActivityLevel: mergedData.activityLevel,
					Weight: parseInt(mergedData.weight) || 0,
					isPro: mergedData.isPro || false,
					ProfilePicture: mergedData.ProfilePicture || ''
				};
				
				console.log('ProvideContext: Prepared regular signup payload:', JSON.stringify(payload, null, 2));
				
				// For regular sign-up, only email & password are required at this step; profile is completed later.
				const requiredFields = ['email', 'password'];
				const missingFields = requiredFields.filter(field => !payload[field] && payload[field] !== 0);
				if (missingFields.length > 0) {
					console.log('ProvideContext: ERROR - Missing required fields:', missingFields);
					throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
				}
				
				console.log('ProvideContext: All required fields present, calling AuthApi.signUp...');
				data = await AuthApi.signUp(payload);
				console.log('ProvideContext: AuthApi.signUp completed successfully');
			}
			setUser(data.user || data);
			// Log user id and isPro after sign up
			const userData = data.user || data;
			if (userData) {
				console.log('User signed up. ID=============================:', userData.id || userData._id, 'isPro:', userData.isPro);
			}
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
			// Log user id and isPro after sign in
			const userData = data.user || data;
			if (userData) {
				console.log('User signed in. ID=============================:', userData.id || userData._id, 'isPro:', userData.isPro);
			}
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
			const data = await AuthApi.googleSignIn();
			setUser(data.user || data);
			setIsLoading(false);
			console.log('=== ProvideContext.googleSignIn COMPLETED SUCCESSFULLY ===');
			return data;
		} catch (err) {
			console.log('ProvideContext: Setting error state to:', err.message);
			setError(err.message);
			console.log('ProvideContext: Setting loading to false');
			setIsLoading(false);
		
		}
	};

	// Google Sign-Up (for new users with onboarding data)
	const googleSignUp = async (userData) => {
		console.log('=== ProvideContext.googleSignUp STARTED ===');
		console.log(userData,"==================3249233------=================");
		setIsLoading(true);
		setError(null);
		try {
			const data = await AuthApi.googleSignUp(userData);
			setUser(data.user || data);
			setIsLoading(false);
			return data;
		} catch (err) {
			
			console.log('ProvideContext: Setting error state to:', err.message);
			setError(err.message);
			console.log('ProvideContext: Setting loading to false');
			setIsLoading(false);
		
		}
	};

	// Complete user profile after email verification (email/password flow only)
	const completeUserProfile = async (extra = {}) => {
		console.log('=== ProvideContext.completeUserProfile STARTED ===');
		setIsLoading(true);
		setError(null);
		try {
			// Merge extra data with onboarding data
			const mergedData = { ...onboarding, ...extra };
			console.log('ProvideContext: Completing profile with data:', JSON.stringify(mergedData, null, 2));

			// If user is using Google auth, finalize via googleSignUp endpoint (creates/updates user in DB)
			if (mergedData.authProvider === 'google' || mergedData.googleId) {
				console.log('ProvideContext: Completing Google user via googleSignUp');
				const googlePayload = {
					userInfo: { user: { id: mergedData.googleId, email: mergedData.email, name: mergedData.name } },
					email: mergedData.email,
					password:mergedData.googleId, // Use Google ID as password placeholder
					googleId: mergedData.googleId,
					name: mergedData.name,
					Gender: mergedData.gender,
					Age: parseInt(mergedData.age) || 0,
					Height: parseInt(mergedData.height) || 0,
					Goal: mergedData.goal,
					ActivityLevel: mergedData.activityLevel,
					Weight: parseInt(mergedData.weight) || 0,
					ProfilePicture: mergedData.ProfilePicture || ''
				};
				const data = await AuthApi.googleSignUp(googlePayload);
				setUser(data.user || data);
				setIsLoading(false);
				console.log('ProvideContext: Google user creation/update completed');
				return data;
			}
			
			// Prepare payload for completeProfile API
			const payload = {
				token: mergedData.token || '', // Token from email verification
				Gender: mergedData.gender,
				Age: parseInt(mergedData.age) || 0,
				Height: parseInt(mergedData.height) || 0,
				Goal: mergedData.goal,
				ActivityLevel: mergedData.activityLevel,
				Weight: parseInt(mergedData.weight) || 0,
			};
			
			console.log('ProvideContext: Profile completion payload:', JSON.stringify(payload, null, 2));
			
			const data = await AuthApi.completeProfile(payload);
			setUser(data.user || data);
			console.log('ProvideContext: Profile completion successful');
			setIsLoading(false);
			console.log('=== ProvideContext.completeUserProfile COMPLETED SUCCESSFULLY ===');
			return data;
		} catch (err) {
			console.log('=== ProvideContext.completeUserProfile ERROR ===');
			console.log('ProvideContext: Error in completeUserProfile:', err);
			console.log('ProvideContext: Error message:', err.message);
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
			token: '',
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
				completeUserProfile,
				logout,
				setUser,
			}}
		>
			{children}
		</ProvideContext.Provider>
	);
};
