import { createSlice } from '@reduxjs/toolkit';

// Load saved cart items from localStorage if available
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('ecommerce_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
    return [];
  }
};

// Save updated cart items to localStorage
const saveCartToStorage = (items) => {
  try {
    localStorage.setItem('ecommerce_cart', JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
};

const initialState = {
  items: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 1. Add a product to the shopping cart (or increment if it already exists)
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      saveCartToStorage(state.items);
    },

    // 2. Remove an individual product from the shopping cart
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      saveCartToStorage(state.items);
    },

    // 3. Increase the quantity of a selected product
    increaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((product) => product.id === id);
      if (item) {
        item.quantity += 1;
      }
      saveCartToStorage(state.items);
    },

    // 4. Decrease the quantity of a selected product (remove if quantity hits 0)
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((product) => product.id === id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((product) => product.id !== id);
        }
      }
      saveCartToStorage(state.items);
    },

    // 5. Remove all products from the shopping cart
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage(state.items);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;