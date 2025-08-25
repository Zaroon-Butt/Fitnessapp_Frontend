import { createSlice } from '@reduxjs/toolkit';
import { Subscription } from '../../utils';

const initialState = {
  isOnboarding: true,
  isLogin: false,
  isCard: false,
  cards: [],
  isUsername: [],
  isPro: false,
  isSubscription: false,
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

    logout: () => initialState,
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
  setIsPro,
  logout: logoutUser,
  setIsSubscription
  
} = userReducer.actions;

export default userReducer.reducer;
export const selectLanguage = state => state.user.appLanguage;
