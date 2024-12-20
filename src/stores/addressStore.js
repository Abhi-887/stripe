import { defineStore } from 'pinia';

export const useAddressStore = defineStore('addressStore', {
  state: () => ({
    selectedBillingAddress: null,
    selectedShippingAddress: null,
  }),
  actions: {
    setSelectedBillingAddress(address) {
      this.selectedBillingAddress = address;
    },
    setSelectedShippingAddress(address) {
      this.selectedShippingAddress = address;
    },
  },
  persist: {
    storage: localStorage, 
  },
});
