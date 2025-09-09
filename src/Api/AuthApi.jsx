import axios from 'axios';

const BASE_URL = 'http://10.0.2.2:3000/api/auth';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const AuthApi = {
  signIn: async ({ email, password }) => {
    try {
      const response = await api.post('/login', { email, password });
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Login failed');
    }
  },

  checkEmail: async email => {
    try {
      const response = await api.post('/checkEmail', { email });
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Email check failed');
    }
  },

  signUp: async ({
    email,
    password,
    Gender,
    Age,
    Height,
    Goal,
    ActivityLevel,
    Weight,
    isPro,
  }) => {
    try {
      const requestData = {
        email,
        password,
        Gender,
        Age,
        Height,
        Goal,
        ActivityLevel,
        Weight,
        isPro,
      };

      const response = await api.post('/signup', requestData);

      return response.data;
    } catch (error) {
      console.log('Error status:', error.response?.status);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Signup failed');
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await api.post('/forgot-password', { email });
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to send OTP');
    }
  },

  verifyOTP: async (email, otp) => {
    try {
      const response = await api.post('/verify-otp', { email, otp });
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      }
      throw new Error('OTP verification failed');
    }
  },

  resetPassword: async (resetToken, newPassword) => {
    try {
      const response = await api.post('/reset-password', { resetToken, newPassword });
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Password reset failed');
    }
  },
};
