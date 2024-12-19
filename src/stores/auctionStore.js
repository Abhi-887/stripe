import { defineStore } from 'pinia';

export const usePastAuctionStore = defineStore('pastAuction', {
  state: () => ({
    auctionId: null,
    auctionTitle: '',
    auctionDescription: '',
    auctionSlug: null,
  }),

  actions: {
    // Set the auction data
    setAuctionData(data) {
      if (data.id && data.title && data.slug) {  // Validate necessary fields
        this.auctionId = data.id;
        this.auctionTitle = data.title;
        this.auctionDescription = data.description;
        this.auctionSlug = data.slug;
        console.log('Past auction data set:', this.$state);

        // Store the data persistently in localStorage for other sessions
        localStorage.setItem('auctionId', data.id);
        localStorage.setItem('auctionTitle', data.title);
        localStorage.setItem('auctionDescription', data.description);
        localStorage.setItem('auctionSlug', data.slug);
      } else {
        console.error('Invalid auction data:', data);  // Log invalid data
      }
    },

    // Load auction data from localStorage (if available)
    loadAuctionData() {
      const id = localStorage.getItem('auctionId');
      const title = localStorage.getItem('auctionTitle');
      const description = localStorage.getItem('auctionDescription');
      const slug = localStorage.getItem('auctionSlug');
      
      if (id && title && slug) {
        this.auctionId = id;
        this.auctionTitle = title;
        this.auctionDescription = description;
        this.auctionSlug = slug;
        console.log('Loaded past auction data from localStorage:', this.$state);
      } else {
        console.log('No past auction data in localStorage');
        // Optionally fetch fresh data from an API if not found
        this.fetchFreshAuctionData();
      }
    },

    // Fetch fresh auction data from an API (optional, based on the scenario)
    async fetchFreshAuctionData() {
      // You can replace this with an actual API request
      // Example: fetching data from your server
      try {
        const response = await fetch('/api/auction');  // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
          this.setAuctionData(data);
        } else {
          console.error('Failed to fetch fresh auction data');
        }
      } catch (error) {
        console.error('Error fetching fresh auction data:', error);
      }
    },

    // Reset the auction data
    resetAuctionData() {
      this.auctionId = null;
      this.auctionTitle = '';
      this.auctionDescription = '';
      this.auctionSlug = null;
      console.log('Past auction data reset:', this.$state);

      // Clear the stored data
      localStorage.removeItem('auctionId');
      localStorage.removeItem('auctionTitle');
      localStorage.removeItem('auctionDescription');
      localStorage.removeItem('auctionSlug');
    },
  },

  // Enable persistence (optional, if needed for other sessions)
  persist: {
    enabled: true,
    storage: localStorage, // Use localStorage for persistence across browser sessions
  },
});


export const useLiveAuctionStore = defineStore('liveAuction', {
  state: () => ({
    auctionId: null,
    auctionTitle: '',
    auctionDescription: '',
    auctionSlug: null,
  }),

  actions: {
    // Set the auction data
    setAuctionData(data) {
      if (data.id && data.title && data.slug) {  // Validate necessary fields
        this.auctionId = data.id;
        this.auctionTitle = data.title;
        this.auctionDescription = data.description;
        this.auctionSlug = data.slug;
        console.log('Live auction data set:', this.$state);

        // Store the data persistently in localStorage for other sessions
        localStorage.setItem('auctionId', data.id);
        localStorage.setItem('auctionTitle', data.title);
        localStorage.setItem('auctionDescription', data.description);
        localStorage.setItem('auctionSlug', data.slug);
      } else {
        console.error('Invalid auction data:', data);  // Log invalid data
      }
    },

    // Load auction data from localStorage (if available)
    loadAuctionData() {
      const id = localStorage.getItem('auctionId');
      const title = localStorage.getItem('auctionTitle');
      const description = localStorage.getItem('auctionDescription');
      const slug = localStorage.getItem('auctionSlug');
      
      if (id && title && slug) {
        this.auctionId = id;
        this.auctionTitle = title;
        this.auctionDescription = description;
        this.auctionSlug = slug;
        console.log('Loaded live auction data:', this.$state);
      } else {
        console.log('No live auction data in localStorage');
      }
    },

    // Reset the auction data
    resetAuctionData() {
      this.auctionId = null;
      this.auctionTitle = '';
      this.auctionDescription = '';
      this.auctionSlug = null;
      console.log('Live auction data reset:', this.$state);

      // Clear the stored data
      localStorage.removeItem('auctionId');
      localStorage.removeItem('auctionTitle');
      localStorage.removeItem('auctionDescription');
      localStorage.removeItem('auctionSlug');
    },
  },

  // Enable persistence (optional, if needed for other sessions)
  persist: {
    enabled: true,
    storage: localStorage, // Use localStorage for persistence across browser sessions
  },
});
