<template>
  <div>
    <h1>🎉 Payment Successful!</h1>
    <p>Thank you for your purchase, {{ customerName }}!</p>

    <div class="transaction-summary">
      <h2>Transaction Details</h2>
      <p><strong>Transaction ID:</strong> {{ transactionId }}</p>
      <p><strong>Order Reference:</strong> {{ orderReference }}</p>
      <p><strong>Date:</strong> {{ transactionDate }}</p>
      <p><strong>Total Amount Paid:</strong> {{ formattedAmount }}</p>
    </div>

    <div class="order-summary">
      <h2>Order Summary</h2>
      <ul>
        <li v-for="item in orderItems" :key="item.id">
          {{ item.quantity }} x {{ item.name }} - {{ formatPrice(item.price) }}
        </li>
      </ul>
      <p><strong>Total:</strong> {{ formattedAmount }}</p>
    </div>

    <div class="next-steps">
      <h2>Next Steps</h2>
      <p>Your order is now being processed. You will receive an email at {{ customerEmail }} with further details.</p>
    </div>

    <div class="support">
      <p>Need help? <a href="/support">Contact our support team</a>.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      transactionId: null,
      orderReference: null,
      transactionDate: null,
      formattedAmount: null,
      orderItems: [],
      customerName: null,
      customerEmail: null,
    };
  },
  async created() {
    const sessionId = new URLSearchParams(window.location.search).get('session_id');
    if (!sessionId) {
      console.error('No session ID found in URL.');
      return;
    }

    try {
      const response = await axios.get(`https://awa.gprlive.com/api/checkout-session/${sessionId}`);
      const data = response.data;

      this.transactionId = data.transaction_id;
      this.orderReference = data.order_reference;
      this.transactionDate = data.transaction_date;
      this.formattedAmount = data.amount_paid;
      this.orderItems = data.items;
      this.customerName = data.customer_name;
      this.customerEmail = data.customer_email;
    } catch (error) {
      console.error('Error fetching session details:', error.response?.data || error.message);
    }
  },
  methods: {
    formatPrice(price) {
      return `$${price.toFixed(2)}`;
    },
  },
};
</script>
