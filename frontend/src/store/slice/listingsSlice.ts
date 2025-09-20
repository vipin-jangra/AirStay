import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Listing } from "../../types/listing";


interface ListingsState {
  items: Listing[];
  selected: Listing | null;
  highlightedId: string | null;
}

const initialState: ListingsState = {
  items: [],
  selected: null,
  highlightedId: null,
};

const listingsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    setListings: (state, action: PayloadAction<Listing[]>) => {
      state.items = action.payload;
    },
    setSelectedListing: (state, action: PayloadAction<Listing | null>) => {
      state.selected = action.payload;
    },
    setHighlightedId: (state, action: PayloadAction<string | null>) => {
      state.highlightedId = action.payload;
    },
  },
});

export const { setListings, setSelectedListing, setHighlightedId } = listingsSlice.actions;
export default listingsSlice.reducer;
