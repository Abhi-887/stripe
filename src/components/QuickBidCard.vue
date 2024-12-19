<template>
  <div class="overlay" @click.self="handleOverlayClick">
    <div class="modal bg-white p-12 shadow-md w-11/12 max-w-4xl mx-auto relative">
      <button class="absolute top-2 right-3 text-gray-500 hover:text-gray-800" @click="handleOverlayClick">
        <img src="@/assets/cross.svg" alt="Close" class="w-4 h-4 mt-2 mr-2" />
      </button>

      <!-- Product Details Section -->
      <div v-if="product" class="flex flex-col md:flex-row gap-6">
        <!-- Gallery Section -->
        <div class="w-full md:w-1/2">
          <img :src="product.image ? `https://awa.gprlive.com${product.image}` : require('@/assets/Mark 1.jpg')"
            alt="Product Image" class="w-full object-cover border border-gray-300" />
        </div>

        <!-- Product Info Section -->
        <div class="w-full md:w-1/2 space-y-4">


          <div class="flex justify-between items-center mt-2 text-gray-500 text-sm">
            <p>Lot #{{ product.lot_number }}</p>
      
          </div>

          <h1 class="text-xl text-gray-800 font-semibold">{{ product.lot_title }}</h1>

          <!-- Pricing Section -->
          <div class="flex">
            <div class="flex-1 text-center border p-4">
              <p class="text-gray-500 text-sm">Reserve Price:</p>
              <p class="text-gray-800 text-lg font-bold">${{ product.reserve_price }}</p>
            </div>
            <div class="flex-1 text-center border-t border-b border-r p-4">
              <p class="text-[#8a2432] text-sm">Current Bid:</p>
              <p class="text-#8a2432 text-lg font-bold">${{ product.reserve_price }}</p>
            </div>
          </div>

          <!-- Feedback Messages -->
          <div v-if="message" class="">
            <p :class="message.type === 'success' ? 'text-green-600 text-[12px]' : 'text-red-600 text-[12px]'">{{
              message.text }}</p>
          </div>
          <!-- Bid Section -->
          <div class="p-4 bg-red-100">
            <div class="flex items-center">
              <span class="text-black text-lg font-semibold mr-2">$</span>
              <input type="text" v-model="bidAmount" placeholder="Enter Bidding Amount"
                class="flex-grow border border-gray-300 px-2 py-1 focus:outline-none focus:ring focus:ring-red-300" />
              <button
                class="bg-[#8a2432] text-white px-4 py-1 hover:bg-gray-900 focus:outline-none focus:ring focus:ring-red-400"
                :disabled="loading" @click="submitBid">
                <span v-if="loading">bidin...</span>
                <span v-else>Bid Now</span>
              </button>
            </div>
          </div>

          <div class="mt-4">
            <button class="text-[#8a2432] font-medium" @click="redirectToProductPage">
              View Details
            </button>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>
<script>
import apiClient from '@/axios'; // Import the axios instance you created

export default {
  props: {
    product: { type: Object, required: true },
  },
  data() {
    return {
      bidAmount: "",
      message: null,
      isFavorite: false,
      loading: false,
    };
  },
  methods: {
    async submitBid() {
      // Clear previous messages
      this.message = null;

      const bid = parseFloat(this.bidAmount);
      if (!bid || bid <= this.product.current_bid) {
        this.message = {
          text: `Please enter a valid bid higher than the current bid of $${this.product.current_bid}.`,
          type: "error",
        };
        return;
      }

      const token = sessionStorage.getItem("token");
      if (!token) {
        // Show error message about authentication and then redirect to login page
        this.message = { text: "You are not authenticated. Please log in.", type: "error" };

        // Redirect to the login page after 2 seconds
        setTimeout(() => {
          this.$router.push({ name: "LoginUser" });  // Ensure the login route is named "Login"
        }, 2000); // Wait for 2 seconds before redirecting
        return;
      }

      this.loading = true;

      try {
        const response = await apiClient.post(
          "/bids", // The endpoint is now centralized in axios.js
          {
            auction_id: this.product.auction_id,
            lot_id: this.product.id,
            bid_amount: bid,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Check the response directly and display success message
        if (response.data.success) {
          this.message = { text: "Bid placed successfully!", type: "success" };
          this.bidAmount = "";
          // Removed the line that closes the overlay after a successful bid
          // this.$emit("close");  
        } else {
          this.message = { text: response.data.message || "Failed to place bid.", type: "error" };
        }
      } catch (error) {
        console.error("Error placing bid:", error);

        // Check for an error response from the API and extract the message
        let errorMessage = "An error occurred. Please try again."; // Default message
        if (error.response) {
          // Check for specific error message in the response
          if (error.response.status === 401) {
            errorMessage = "Unauthenticated. Please log in to place a bid.";
          } else if (error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message; // API message
          } else if (error.response.data && error.response.data.error) {
            errorMessage = error.response.data.error; // Specific error
          }
        } else if (error.message) {
          errorMessage = error.message; // Fallback for other types of errors
        }

        // Display the error message
        this.message = {
          text: errorMessage,
          type: "error",
        };
      } finally {
        this.loading = false;
      }
    },

    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
    },

    handleOverlayClick() {
      this.$emit("close");
    },

    redirectToProductPage() {
      this.$router.push({
        name: "LiveAuctionDetailPage",  // Ensure this matches the name in your router configuration
        query: { id: this.product.id }, // Use query parameters to pass the product ID
      });
    },
  },
};
</script>



<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal {
  position: relative;
  margin: 10% auto;
  background: white;
}

input::placeholder {
  color: #7a7a7a;
}
</style>
