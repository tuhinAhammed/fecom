import { createSlice } from "@reduxjs/toolkit";

// Load wishlist from localStorage or empty array
const loadWishlistFromLocalStorage = () => {
  const savedWishlist = localStorage.getItem("wishlistItems");
  return savedWishlist ? JSON.parse(savedWishlist) : [];
};

const initialState = {
  wishlistItems: loadWishlistFromLocalStorage(),
  wishlistSelectAll: false,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlistSelectAll(state) {
      state.wishlistSelectAll = !state.wishlistSelectAll;
      state.wishlistItems = state.wishlistItems.map((item) => ({
        ...item,
        selected: state.wishlistSelectAll,
      }));
      localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));
    },

    toggleWishlistSelectItem(state, action) {
      const { index } = action.payload;
      state.wishlistItems[index].selected = !state.wishlistItems[index].selected;
      state.wishlistSelectAll = state.wishlistItems.every(
        (item) => item.selected
      );
      localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));
    },

    deleteWishlistItem(state, action) {
      const { index } = action.payload;
      state.wishlistItems.splice(index, 1);
      state.wishlistSelectAll = state.wishlistItems.every(
        (item) => item.selected
      );
      localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));
    },

    addWishlistItem(state, action) {
      const newItem = action.payload;

      const exists = state.wishlistItems.some(
        (item) =>
          item.productId === newItem.productId &&
          item.variant === newItem.variant
      );

      if (exists) {
        // ❌ Already exists
        return;
      }

      // ✅ Add new item
      state.wishlistItems.push({
        productId: newItem.productId,
        variant: newItem.variant || null,
      });

      localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));
    },

    clearWishlist(state) {
      state.wishlistItems = [];
      state.wishlistSelectAll = false;
      localStorage.removeItem("wishlistItems");
    },
  },
});

export const {
  toggleWishlistSelectAll,
  toggleWishlistSelectItem,
  deleteWishlistItem,
  addWishlistItem,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
