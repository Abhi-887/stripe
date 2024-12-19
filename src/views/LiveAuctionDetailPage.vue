<template>
  <div class="bg-white min-h-screen">
    <!-- Notification Bar -->
    <div class="bg-[#f3e9ea] py-2">
      <div class="container mx-auto xl:px-4 lg:px-12 md:px-16 sm:px-5 px-4">
        <div class="grid grid-cols-1 gap-4 text-center">
          <div class="flex items-center justify-center hover:text-black transition-colors duration-300">
            <p class="md:text-lg flex sm:items-center lg:text-lg sm:text-base text-[12px] nunito-sans-light">
              <span><img src="@/assets/Notification.svg" alt="Notification Icon"
                  class="sm:w-3.5 w-3 sm:mt-0 mt-0.5 sm:mr-2 mr-1"></span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Breadcrumb Navigation -->
    <div class="container mx-auto px-5 nunito-sans-light">
      <div class="text-sm text-[#7A7A7A] my-8">
        <nav aria-label="Breadcrumb">
          <ol class="list-reset flex">
            <li><router-link to="/" class="text-[#B8B8B8]">Home</router-link><span class="mx-2 text-[#B8B8B8]">></span>
            </li>
            <li><router-link to="/live-auction" class="text-[#B8B8B8]">Live Auction</router-link><span
                class="mx-2 text-[#B8B8B8]">></span></li>
            <li><span class="text-[#3D3D3D]">{{ product ? product.slug : '' }}</span></li>
          </ol>
        </nav>
      </div>

      <!-- Loading and Error State -->
      <div v-if="isLoading" class="loading-container">
        <p>Loading...</p>
      </div>

      <div v-else-if="error" class="error-container">
        <p>An error occurred: {{ error }}</p>
      </div>

      <!-- Product Details Section -->
      <div v-if="product" class="flex flex-col md:flex-row gap-10">
        <!-- Gallery Section -->
        <div class="w-full md:w-1/2">
          <img :src="product.image ? `https://awa.gprlive.com${product.image}` : require('@/assets/Mark 1.jpg')"
            alt="Product Image" class="w-full object-cover border border-grey" />
        </div>

        <!-- Product Info Section -->
        <div class="w-full md:w-1/3 space-y-4">
          <div class="">
            <div class="circle-image "></div>
            <h6 class="text-[#ff0000] text-base raleway-custom ms-8">
              Live Auction ends in {{ countdown.days }} Days {{ countdown.hours }} Hrs {{ countdown.minutes }} Min {{
                countdown.seconds }} Sec
            </h6>


          </div>
          <div class="flex justify-between items-center mt-2 text-gray-500">
    <p>Lot #: {{ product.lot_number }}</p>
    <p class="flex items-center">
      <!-- Dynamically change text based on watchlist status -->
      {{ isFavorite ? 'Added to Watchlist' : 'Add to Watchlist' }}
      <button class="star-button focus:outline-none ml-3" @click.stop="handleAddToWatchlist">
        <img :src="isFavorite ? require('@/assets/Star 1.svg') : require('@/assets/Star 2.svg')" alt="Favorite"
          class="star-icon h-5 w-5" />
      </button>
    </p>
  </div>

          <h1 class="text-2xl text-gray-800 raleway-custom">{{ product.lot_title }}</h1>

          <!-- Pricing Section -->
          <div class="flex justify-between mb-2">
            <div class="flex flex-col border-s border-t border-b border-gray-200 py-3 px-8 w-full text-center ">
              <span class="text-[#7A7A7A] text-[14px] nunito-sans-light ">Reserve Price:</span>
              <span class="text-gray-800  nunito-sans-light text-[20px] !font-bold">${{ product.reserve_price
                }}</span>
            </div>
            <div class="flex flex-col border border-gray-200 py-3 px-8 w-full text-center  ">
              <span class="text-[#8a2432] text-[14px] nunito-sans-light ">Current Bid:</span>
              <span class="text-[#8a2432] font-semibold text-[20px] nunito-sans-light !font-bold">${{
                product.reserve_price
              }}</span>
            </div>
          </div>
          <!--const token = sessionStorage.getItem('token');-->
          <div>
            <!-- Show bidding form if user is logged in -->
            <div v-if="isLoggedIn">
              <div class="p-6 bg-red-100">
                <div class="flex items-center">
                  <span class="text-black font-bold text-lg mr-2">$</span>
                  <input type="text" v-model="bidAmount" placeholder="Enter Bidding Amount"
                    class="flex-grow border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-red-300" />
                  <button
                    class="bg-[#8a2432] text-white px-4 py-2 hover:bg-gray-900 focus:outline-none focus:ring focus:ring-red-400"
                    @click="placeBid">Bid Now</button>
                </div>

              </div>
              <!-- Updated button to use lot_id -->
              <button class="view-bid-history-btn mt-2 " @click="openBidHistoryPopup(product.id)">
                View Bid History
              </button>
            </div>

            <!-- Show login button if user is not logged in -->
            <div v-else>
              <div class="p-6 bg-red-100 flex justify-between items-center">
                <p class="text-[24px] raleway-custom uppercase font-normal">Want to Bid?</p>
                <button
                  class="bg-[#8a2432] text-white px-6 py-2 hover:bg-[black] focus:outline-none focus:ring focus:ring-blue-400"
                  @click="redirectToLogin">Login Now</button>
              </div>
            </div>


          </div>
          <div v-if="error" class="error-container text-red-500 mt-4">
            <p>{{ error }}</p> <!-- Display the error message -->
          </div>
          <div v-if="message" :class="message.type === 'success' ? 'text-green-500' : 'text-red-500'" class="mt-4">
            <p>{{ message.text }}</p> <!-- Display the message text (success or error) -->
          </div>

          <div>
            <!-- Pass lot_id to BidHistoryPopup -->
            <BidHistoryPopup :visible="isPopupVisible" :lotId="selectedLotId" @close="closeBidHistoryPopup" />
          </div>


          <!-- Additional Information -->
          <div class="space-y-1 pt-2 nunito-sans-light">
            <div class="flex justify-between">
              <p class="text-[#7A7A7A]">Distillery/Brand:</p>
              <div class="ml-auto text-left w-40">
                <p class="text-black">{{ product.distillery }}</p>
              </div>
            </div>
            <div class="flex justify-between">
              <p class="text-[#7A7A7A]">Region:</p>
              <div class="ml-auto text-left w-40">
                <p class="text-black">{{ product.region }}</p>
              </div>
            </div>
            <div class="flex justify-between">
              <p class="text-[#7A7A7A]">Age:</p>
              <div class="ml-auto text-left w-40">
                <p class="text-black">{{ product.age }}</p>
              </div>
            </div>
            <div class="flex justify-between">
              <p class="text-[#7A7A7A]">Whisky Type:</p>
              <div class="ml-auto text-left w-40">
                <p class="text-black">{{ product.whisky_type }}</p>
              </div>
            </div>
            <div class="flex justify-between">
              <p class="text-[#7A7A7A]">Bottles Produced:</p>
              <div class="ml-auto text-left w-40">
                <p class="text-black">{{ product.bottles_produced }}</p>
              </div>
            </div>
            <div class="flex justify-between">
              <p class="text-[#7A7A7A]">Bottle Number:</p>
              <div class="ml-auto text-left w-40">
                <p class="text-black">{{ product.bottle_number }}</p>
              </div>
            </div>
            <div class="flex justify-between">
              <p class="text-[#7A7A7A]">Size:</p>
              <div class="ml-auto text-left w-40">
                <p class="text-black">{{ product.size }}</p>
              </div>
            </div>
            <div class="flex justify-between">
              <p class="text-[#7A7A7A] ">Strength:</p>
              <div class="ml-auto text-left w-40">
                <p class="text-black">{{ product.strength }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs for Description and About Distillery -->
      <div v-if="product" class="mt-12">
        <div class="flex space-x-4  border-gray-300">
          <button @click="activeTab = 'description'"
            :class="{ 'border-b-2 border-gray-800 text-gray-800 font-semibold': activeTab === 'description' }"
            class="pb-2">Description</button>
          <button @click="activeTab = 'aboutDistillery'"
            :class="{ 'border-b-2 border-gray-800 text-gray-800 font-semibold': activeTab === 'aboutDistillery' }"
            class="pb-2">About Distillery</button>
        </div>

        <div v-if="activeTab === 'description'" class="mt-4 text-[#7A7A7A]">
          <p>{{ product.short_description }}</p>
        </div>

        <div v-if="activeTab === 'aboutDistillery'" class="mt-4 text-[#7A7A7A]">
          <p>{{ product.long_description }}</p>
        </div>
      </div>

      <!-- Note Section -->
      <div class="bg-[#f3e9ea] mt-10 p-8 text-[#8a2432] text-[14px]">
        <p><strong>Note: </strong>Please closely examine the images provided in this lot prior to placing a bid. High
          resolution images are provided when viewing from a computer. All lots being sold are second hand in nature and
          all condition defects are not specifically listed in the lot description. Lots will be sold as seen in the
          images provided on each lot.</p>
      </div>

      <div class="mt-10 mb-8 ">
        <h1 class="text-[24px] raleway-custom leading-tight  uppercase" data-v-b5c8abc4="">You may also like</h1>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
          <ProductListSlider />
        </div>
      </div>
    </div>
  </div>
  <SiteFooter />
</template>

<script>
import apiClient from '@/axios'; // Import the centralized apiClient
import SiteFooter from "@/components/SiteFooter.vue";
import ProductListSlider from '@/components/ProductListSlider.vue';
import BidHistoryPopup from '@/components/BidHistoryPopup.vue'; // Import the BidHistoryPopup component

export default {
  components: {
    SiteFooter,
    ProductListSlider,
    BidHistoryPopup, // Register the popup component
  },
  data() {
    return {
      product: null,
      isLoggedIn: false,
      isLoading: true,
      message: null, // Store success or error messages here
      activeTab: 'description', // Default active tab
      isFavorite: false, // Add isFavorite data property
      bidAmount: null, // Add bidAmount data property
      isPopupVisible: false, // Control popup visibility
      selectedLotId: null, // Pass the lot ID for the popup
    };
  },
  mounted() {
    // Check if the token exists in sessionStorage
    this.isLoggedIn = !!sessionStorage.getItem('token');
  },

  computed: {
    countdown() {
      if (!this.product || !this.product.end_date) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

      const endDate = new Date(this.product.end_date);
      const now = new Date();
      const timeDifference = endDate - now;

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    }
  },

  created() {
    this.fetchProductDetails();
  },
  methods: {

    redirectToLogin() {
      // Redirect the user to the login page
      this.$router.push('/login');
    },

    // Handle placing a bid
    async placeBid() {
      if (!this.bidAmount || isNaN(this.bidAmount) || Number(this.bidAmount) <= 0) {
        this.message = { text: 'Please enter a valid bid amount.', type: 'error' };
        return;
      }

      const token = sessionStorage.getItem('token');

      if (!token) {
        this.message = { text: 'You are not authenticated. Please log in.', type: 'error' };
        setTimeout(() => {
          this.$router.push('/login');
        }, 2000);
        return;
      }

      const bidData = {
        auction_id: this.product.auction_id,
        lot_id: this.product.id,
        bid_amount: this.bidAmount,
      };

      try {
        const response = await apiClient.post('/bids', bidData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.data) {
          if (response.data.success) {
            this.message = { text: 'Your bid has been placed successfully!', type: 'success' };
          } else {
            this.message = { text: response.data.error || 'There was an issue with your bid.', type: 'error' };
          }
        }
      } catch (error) {
        console.error('Error placing bid:', error);
        this.message = {
          text: error.response?.data?.error || 'An error occurred while placing your bid.',
          type: 'error'
        };
      }
    },

    async fetchProductDetails() {
      const id = this.$route.query.id; // Access the ID from the query parameters

      if (!id) {
        this.message = { text: 'Product ID is missing', type: 'error' };
        this.isLoading = false;
        return;
      }

      const url = `/lots/detail/${id}`;

      try {
        const response = await apiClient.get(url);
        if (response.data) {
          this.product = response.data;
          this.isLoading = false;
        } else {
          throw new Error("No product data found.");
        }
      } catch (error) {
        this.message = {
          text: error.response?.data?.error || "Failed to fetch product details",
          type: 'error'
        };
        this.isLoading = false;
      }
    },

    // Fetch user's wishlist
    async getWishlist() {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error('No token found!');
        return;
      }

      try {
        const response = await apiClient.get('/wishlist', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        this.wishlist = response.data;
        // Check if the product is already in the wishlist
        this.isFavorite = this.wishlist.some(item => item.lot_id === this.product.id);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    },

    // Toggle Favorite status and update wishlist
    async toggleFavorite() {
      try {
        if (this.isFavorite) {
          await this.removeFromWishlist(); // Remove from wishlist
        } else {
          await this.addToWishlist(); // Add to wishlist
        }
        this.isFavorite = !this.isFavorite; // Toggle the favorite state
      } catch (error) {
        console.error('Failed to update wishlist:', error);
      }
    },

    // Add product to wishlist
    async addToWishlist() {
      const productId = this.product.id;
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error('No token found!');
        return;
      }

      try {
        const response = await apiClient.post('/wishlist', { lot_id: productId }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        console.log('Product added to wishlist:', response.data);
        this.getWishlist(); // Refresh the wishlist after adding
      } catch (error) {
        console.error('Error adding product to wishlist:', error);
      }
    },

    // Remove product from wishlist
    async removeFromWishlist() {
      const productId = this.product.id;
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error('No token found!');
        return;
      }

      try {
        const response = await apiClient.delete(`/wishlist/${productId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log('Product removed from wishlist:', response.data);
        this.getWishlist(); // Refresh the wishlist after removing
      } catch (error) {
        console.error('Error removing product from wishlist:', error);
      }
    },

    // Open the bid history popup
    openBidHistoryPopup(lotId) {
      this.selectedLotId = lotId;
      this.isPopupVisible = true;
    },

    // Close the bid history popup
    closeBidHistoryPopup() {
      this.isPopupVisible = false;
    },

    // Clear any previous messages after a short delay
    clearMessage() {
      setTimeout(() => {
        this.message = null;
      }, 3000);
    },
  },
};
</script>

<style scoped>
/* You can customize the [#7A7A7A] styling for the selected image here */
.gallery-images img {
  object-fit: cover;
  width: 100%;
  max-width: 100px;
  height: auto;
}

.circle-image::before {
  content: "";
  background: red;
  width: 18px;
  height: 18px;
  position: absolute;
  border-radius: 50px;
  margin-top: 4px;
}
</style>
