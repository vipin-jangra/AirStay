// src/store/slice/filterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  searchText: string;
  minPrice: number;
  maxPrice: number;
  isFilterOpen: boolean;
}

const initialState: FiltersState = {
  searchText: "",
  minPrice: 1000,
  maxPrice: 60000,
  isFilterOpen: false,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setMinPrice: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload;
    },
    setFilterOpen: (state, action: PayloadAction<boolean>) => {
      state.isFilterOpen = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const {
  setSearchText,
  setMinPrice,
  setMaxPrice,
  setFilterOpen,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
