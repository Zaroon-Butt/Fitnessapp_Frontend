import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOnboarding: true,
  isLogin: false,
  isCard: false,
  cards: [],
  isUsername: [],
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
  logout: logoutUser,
} = userReducer.actions;

export default userReducer.reducer;
export const selectLanguage = state => state.user.appLanguage;
