import { configureStore, createSlice } from '@reduxjs/toolkit';
import { storageService } from '../services';

const repairListSlice = createSlice({
  name: 'repairList',
  initialState: {
    value: storageService.getRepairsFromLocalStorage(),
  },
  reducers: {
    updateRepairList: (state) => {
      state.repairList = storageService.getRepairsFromLocalStorage().sort((a, b) => a.id > b.id);
    },
  },
});

export const { updateRepairList } = repairListSlice.actions;

export const store = configureStore(
  {
    reducer: {
      repairList: repairListSlice.reducer,
    },
  },
);
