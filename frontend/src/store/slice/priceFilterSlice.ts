// src/store/priceFilterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PriceFilterState {
  minPrice: number;
  maxPrice: number;
}

const initialState: PriceFilterState = {
  minPrice: 1000,
  maxPrice: 60000,
};

const priceFilterSlice = createSlice({
  name: "priceFilter",
  initialState,
  reducers: {
    setMinPrice: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload;
    },
    setRange: (state, action: PayloadAction<[number, number]>) => {
      state.minPrice = action.payload[0];
      state.maxPrice = action.payload[1];
    },
    resetPriceFilter: () => initialState,
  },
});

export const { setMinPrice, setMaxPrice, setRange, resetPriceFilter } =
  priceFilterSlice.actions;

export default priceFilterSlice.reducer;
