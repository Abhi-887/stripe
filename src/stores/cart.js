// src/stores/cart.js
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
    totalAmount: 0,
  }),
  actions: {
    setCartData(cartData) {
      this.cartItems = cartData;
      this.totalAmount = cartData.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);
    },
  },
});
