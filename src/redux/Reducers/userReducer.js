import { createSlice } from '@reduxjs/toolkit';
import { Workout } from '../../utils';

const initialState = {
  isOnboarding: true,
  isLogin: false,
  isCard: false,
  cards: [],
  isUsername: [],
  userId: null,
  isPro: false,
  isSubscription: false,
  AppointmentNotification: false,
  WorkoutReminder: false,
  joinedDate: null,
};

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsOnboarding: (state, action) => {
      state.isOnboarding = action.payload;
    },

    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },

    setIsUsername: (state, action) => {
      state.isUsername = action.payload;
    },

    setUserId: (state, action) => {
      state.userId = action.payload;
    },

    setIsCard: (state, action) => {
      state.isCard = action.payload;
    },

    addCard: (state, action) => {
      state.cards.push(action.payload);
      state.isCard = true;
    },

    setIsPro: (state, action) => {
      state.isPro = action.payload;
    },

    setIsSubscription: (state, action) => {
      state.isSubscription = action.payload;
    },

    updateCard: (state, action) => {
      const { index, card } = action.payload;
      if (typeof index === 'number' && state.cards[index]) {
        state.cards[index] = card;
      }
    },

    deleteCard: (state, action) => {
      const index = action.payload;
      if (typeof index === 'number' && state.cards[index]) {
        state.cards.splice(index, 1);
      }
    },

    setAppointmentNotification: (state, action) => {
      state.AppointmentNotification = action.payload;
    },

    setWorkoutReminder: (state, action) => {
      state.WorkoutReminder = action.payload;
    },

    logout: (state ,action) => {
      state.isLogin = false;
      state.isCard = [];
      state.cards = [];
      state.isUsername = [];
      state.userId = null;
      state.isPro = false;
      state.isSubscription = false;
      state.AppointmentNotification = false;
      state.WorkoutReminder = false;
    }
  },
});

export const {
  setIsLogin,
  setIsOnboarding,
  setIsCard,
  addCard,
  updateCard,
  deleteCard,
  setIsUsername,
  setUserId,
  setIsPro,
  logout: logoutUser,
  setIsSubscription,
  setAppointmentNotification,
  setWorkoutReminder,

} = userReducer.actions;

export default userReducer.reducer;
export const selectLanguage = state => state.user.appLanguage;
