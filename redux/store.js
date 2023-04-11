import { configureStore, createSlice } from '@reduxjs/toolkit';
import { storageService } from '../services';

const repairListSlice = createSlice({
  name: 'repairList',
  initialState: {
    value: storageService.getRepairsFromLocalStorage(),
  },
  reducers: {
    updateRepairList: (state) => {
      state.value = storageService.getRepairsFromLocalStorage().sort((a, b) => a.id > b.id);
    },
    setRepairInRepairList: (state, action) => {
      storageService.setRepairInLocalStorage(action.payload);
      state.value = storageService.getRepairsFromLocalStorage().sort((a, b) => a.id > b.id);
    },
    changeRepairStatus: (state, action) => {
      const changedRepair = action.payload;
      storageService.replaceRepair(changedRepair);
      state.value = storageService.getRepairsFromLocalStorage().sort((a, b) => a.id > b.id);
    },
  },
});

export const { updateRepairList, changeRepairStatus } = repairListSlice.actions;

export const store = configureStore(
  {
    reducer: {
      repairList: repairListSlice.reducer,
    },
  },
);
