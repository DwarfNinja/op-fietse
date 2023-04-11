import { configureStore } from '@reduxjs/toolkit';
import { repairListSlice } from './repairlist_slice';

export const { updateRepairList, setRepairInRepairList, changeRepairStatus } = repairListSlice.actions;

export const store = configureStore(
  {
    reducer: {
      repairList: repairListSlice.reducer,
    },
  },
);
