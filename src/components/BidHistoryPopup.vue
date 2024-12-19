<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
    @click="handleBackdropClick"
  >
    <div
      class="bg-white p-6 w-11/12 max-w-4xl shadow-lg "
      @click.stop
    >
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold">Bid History</h3>
        <button @click="close" class="text-lg text-black">X</button>
      </div>

      <!-- Show loading spinner while fetching data -->
      <div v-if="loading" class="flex flex-col justify-center items-center py-10">
        <!-- Animated Spinner -->
        <div class="loader-spinner mb-4"></div>
        <p class="text-gray-500 text-sm">Loading bid history, please wait...</p>
      </div>

      <!-- Show the content once data is fetched -->
      <div v-else class="content max-h-80 overflow-y-auto">
        <table v-if="bids.length" class="min-w-full table-auto border-collapse">
          <thead>
            <tr class="border-b">
              <th class="px-6 py-3 text-left w-1/4">Bidder ID</th>
              <th class="px-6 py-3 text-left w-1/4">Bidding Amount</th>
              <th class="px-6 py-3 text-left w-1/2">Placed On</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="bid in bids" :key="bid.id" class="border-b">
              <td class="px-6 py-3">{{ bid.uid }}</td>
              <td class="px-6 py-3">{{ bid.bid_amount }}</td>
              <td class="px-6 py-3">{{ formatDate(bid.bid_datetime) }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Display message if no bids are available -->
        <p v-else class="text-gray-600 text-center py-4">No bid history available.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    visible: Boolean,
    lotId: Number,
  },
  data() {
    return {
      bids: [],
      loading: false, // Track loading state
    };
  },
  watch: {
    visible(newValue) {
      if (newValue) this.loadBidHistory();
    },
  },
  methods: {
    async loadBidHistory() {
      this.loading = true; // Set loading to true when starting to fetch data
      try {
        const response = await axios.get(
          `https://awa.gprlive.com/api/bids/${this.lotId}`
        );
        this.bids = response.data && response.data.data ? response.data.data : [];
      } catch (error) {
        console.error("Error fetching bid history:", error);
        this.bids = [];
      } finally {
        this.loading = false; // Set loading to false once the request is complete
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
    close() {
      this.$emit("close");
    },
    handleBackdropClick(event) {
      // Close the modal if the backdrop is clicked (not the modal itself)
      if (event.target === event.currentTarget) {
        this.close();
      }
    },
  },
};
</script>

<style scoped>
/* Spinner Styling */
.loader-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-top-color: #8a2432; /* Spinner color */
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Spinner Animation */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #8a2432;
  padding: 10px;
  text-align: left;
}

th {
  background-color: #fee2e2;
  font-weight: bold;
}

td {
  background-color: #fff;
}

/* Responsive Styling */
@media (max-width: 768px) {
  table {
    font-size: 14px;
  }
}
</style>
