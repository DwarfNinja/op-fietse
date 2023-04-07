import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  repairList: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_REPAIR_LIST':
      return {
        ...state,
        repairList: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

const store = configureStore({
  reducer,
  preloadedState: initialState,
});

export default store;
