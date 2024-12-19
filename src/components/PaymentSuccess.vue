<template>
  <div>
    <h1>Payment Successful</h1>
    <p v-if="transactionId">Transaction ID: {{ transactionId }}</p>
    <p v-else>Loading your transaction details...</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      transactionId: null,
    };
  },
  async created() {
    // Get the session ID from the URL query parameters
    const sessionId = new URLSearchParams(window.location.search).get('session_id');

    if (!sessionId) {
      console.error('No session ID found in URL.');
      return;
    }

    try {
      // Fetch the session details from your backend
      const response = await axios.get(`https://awa.gprlive.com/api/checkout-session/${sessionId}`);
      this.transactionId = response.data.transaction_id;
    } catch (error) {
      console.error('Error fetching session details:', error.response?.data || error.message);
    }
  },
};
</script>
