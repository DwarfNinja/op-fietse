import { createSlice } from '@reduxjs/toolkit';
import { storageService } from '../services';

export const repairListSlice = createSlice({
  name: 'repairList',
  initialState: {
    value: storageService.getRepairList(),
  },
  reducers: {
    updateRepairList: (state) => {
      state.value = storageService.getRepairList().sort((a, b) => a.id > b.id);
    },
    setRepairInRepairList: (state, action) => {
      storageService.addRepair(action.payload);
      state.value = storageService.getRepairList().sort((a, b) => a.id > b.id);
    },
    removeRepairFromRepairList: (state, action) => {
      storageService.deleteRepair(action.payload);
      state.value = storageService.getRepairList().sort((a, b) => a.id > b.id);
    },
    changeRepairStatus: (state, action) => {
      const changedRepair = action.payload;
      storageService.replaceRepair(changedRepair);
      state.value = storageService.getRepairList().sort((a, b) => a.id > b.id);
    },
  },
});
