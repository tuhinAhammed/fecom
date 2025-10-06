import { createSlice } from "@reduxjs/toolkit";

// Function to load the cart from localStorage or default to an empty cart
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cartItems");
  return savedCart ? JSON.parse(savedCart) : []; // Return empty array if no saved cart
};

// Initial state
const initialState = {
  cartItems: loadCartFromLocalStorage(), // Load from localStorage or empty
  selectAll: false, // No items selected initially
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleSelectAll(state) {
      state.selectAll = !state.selectAll;
      state.cartItems = state.cartItems.map((item) => ({
        ...item,
        selected: state.selectAll,
      }));
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // Save to localStorage
    },
    toggleSelectItem(state, action) {
      const { index } = action.payload;
      state.cartItems[index].selected = !state.cartItems[index].selected;
      state.selectAll = state.cartItems.every((item) => item.selected);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // Save to localStorage
    },
    deleteItem(state, action) {
      const { index } = action.payload;
      state.cartItems.splice(index, 1); // Remove the item from the array
      state.selectAll = state.cartItems.every((item) => item.selected);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // Save to localStorage
    },
    updateCartSummary(state, action) {
      const { index, quantity } = action.payload;
      const item = state.cartItems[index];

      // Ensure quantity is at least 1
      if (quantity < 1) {
        console.log("Quantity cannot be less than 1."); // Optional: Log a warning
        return;
      }

      // Update item quantity and total price
      item.quantity = quantity;
      item.total_price = item.productPrice * quantity;

      // Save updated cart to localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    addItem(state, action) {
      const newItem = action.payload;
      
      // Check if item already exists in the cart
      const existingItemIndex = state.cartItems.findIndex(
          (item) => item.productId === newItem.productId // Compare using productId only
      );
  
      if (existingItemIndex !== -1) {
          // If the item exists, update the quantity
          state.cartItems[existingItemIndex].quantity += 1;
      } else {
          // If the item doesn't exist, add it with quantity 1
          state.cartItems.push({
              productId: newItem.productId,
              quantity: 1,
          });
      }
  
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  },
    
    removeOrderedItems(state, action) {
      const orderedProductIds = action.payload; // Array of product IDs that were ordered
      state.cartItems = state.cartItems.filter(
        (item) => !orderedProductIds.includes(item.productId)
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // Save updated cart to localStorage
    },
    
  },
});

export const {
  toggleSelectAll,
  toggleSelectItem,
  deleteItem,
  updateCartSummary,
  addItem,
  removeOrderedItems 
} = cartSlice.actions;

export default cartSlice.reducer;
