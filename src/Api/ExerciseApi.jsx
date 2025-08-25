import axios from 'axios';

const API_KEY = 'dc8645ffcemshb09f9aff3759803p1a9a2bjsn386cd617438a';
const BASE_URL = 'https://exercisedb-api1.p.rapidapi.com/api/v1';

const createAxiosInstance = () => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'exercisedb-api1.p.rapidapi.com',
    },
  });
};

// Centralized API error handler
const handleApiError = (error, operation) => {
  if (error.code === 'ECONNABORTED') {
    throw new Error('Request timeout - please check your internet connection');
  } else if (error.response) {
    const status = error.response.status;
    switch (status) {
      case 401:
        throw new Error('API key is invalid or expired');
      case 429:
        throw new Error('API rate limit exceeded. Please try again later.');
      case 500:
        throw new Error('Server error. Please try again later.');
      default:
        throw new Error(`API error in ${operation}: ${status}`);
    }
  } else if (error.request) {
    throw new Error('Network error - please check your internet connection');
  } else {
    throw new Error('An unexpected error occurred');
  }
};

export const exerciseApi = {
  // Get all exercises
  getAllExercises: async () => {
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get('/exercises');
      return response.data;
    } catch (error) {
      handleApiError(error, 'getAllExercises');
    }
  },

  // Get exercise types
  getExerciseTypes: async () => {
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get('/exercisetypes');
      return response.data;
    } catch (error) {
      handleApiError(error, 'getExerciseTypes');
    }
  },

  // Get exercises by type
  getExercisesByType: async type => {
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(`/exercises/type/${type}`);
      return response.data;
    } catch (error) {
      handleApiError(error, 'getExercisesByType');
    }
  },

    // Get exercises by search query (e.g., type or keyword)
    searchExercises: async searchQuery => {
      try {
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.get(`/exercises/search`, {
          params: { search: searchQuery },
        });
        return response.data;
      } catch (error) {
        handleApiError(error, 'searchExercises');
      }
    },

  // Get exercises by muscle group
  getExercisesByMuscle: async muscle => {
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(`/exercises/muscle/${muscle}`);
      return response.data;
    } catch (error) {
      handleApiError(error, 'getExercisesByMuscle');
    }
  },

  getExerciseById: async id => {
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(`/exercises/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error, 'getExerciseById');
    }
  },

};
