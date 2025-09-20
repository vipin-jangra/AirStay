import { configureStore } from "@reduxjs/toolkit";
import listingsReducer from "./slice/listingsSlice";
import filterReducer from "./slice/filterSlice";
import priceFilterReducer from "./slice/priceFilterSlice";
export const store = configureStore({
  reducer: {
    listings: listingsReducer,
    filters: filterReducer,
    priceFilter: priceFilterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
