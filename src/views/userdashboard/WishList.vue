<template>
  <div class="bg-[#f3e9ea] py-1"></div>

  <!-- Breadcrumb Navigation -->
  <nav aria-label="breadcrumb" class="container mx-auto xl:px-16 lg:px-12 md:px-16 sm:px-10 px-6 py-6 text-sm text-gray-600 nunito-sans-light" style="max-width: 1536px !important;">
    <ol class="list-reset flex">
      <li>
        <a href="#" class="text-[#B8B8B8]">Home</a>
        <span class="mx-2 text-[#B8B8B8]">></span>
      </li>
      <li>
        <a href="#" class="text-[#3D3D3D]">Watchlist</a>
      </li>
    </ol>
  </nav>

  <div class="flex wapper-max bg-grey container mx-auto xl:px-4 lg:px-12 md:px-16 sm:px-5 px-5 min-h-screen">
    <UserDashboardSidebar />

    <main class="flex-1 px-12 py-6 bg-[#F9E7E966]">
      <h1 class="text-3xl raleway-custom">Watchlist</h1>
      <p class="text-gray-500 nunito-sans-light mb-6">Here you can manage your profile settings.</p>

      <!-- Watchlist Section -->
      <div class="bg-white px-6 py-2 rounded-md border border-[#E496A1]">
        <div class="border-b p-2">
          <h3 class="text-lg font-bold text-[#8A2432]">Your Watchlist</h3>
        </div>

        <!-- Loader Section -->
        <div v-if="loading" class="flex justify-center items-center py-10">
          <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-4 border-[#8a2432] rounded-full">
          </div>
        </div>

        <!-- Watchlist Table -->
        <table v-else class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b">
              <th class="py-2 px-4">Lot Details</th>
              <th class="py-2 px-4">Current Bid</th>
              <th class="py-2 px-4">Your Bid</th>
              <th class="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="wishlist in wishlistItems" :key="wishlist.id" class="hover:bg-gray-50 transition-colors">
              <td class="py-3 px-4 flex items-center space-x-4">
                <img :src="`https://awa.gprlive.com${wishlist.image}`" alt="Lot Image" class="w-12 h-12 rounded" />
                <div>
                  <p class="text-sm font-medium">Lot #{{ wishlist.id }}</p>
                  <p class="text-sm text-gray-500 truncate w-40">{{ wishlist.lot_title }}</p>
                </div>
              </td>
              <td class="py-3 px-4 text-[#8a2432] font-semibold">
                {{ wishlist.reserve_price }}
              </td>
              <td class="py-3 px-4 text-gray-600">
                {{ wishlist.reserve_price }}
              </td>
              <td class="py-3 px-4 flex items-center">
                <div class="flex items-center space-x-2">
                  <img src="@/assets/eye-open.svg" alt="View Lot" class="w-6 h-6 inline-block" />
                  <img src="@/assets/remove.svg" alt="Delete" class="w-5 h-5 cursor-pointer" @click="removeFromWishlist(wishlist.id)" />
                  <button @click="showQuickBidPopup(wishlist.id)" class="px-3 py-1 border border-[#8a2432] text-[#8a2432] text-sm rounded focus:outline-none">
                    Quick Bid
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Quick Bid Overlay -->
      <div v-if="showQuickBid" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" @click.self="closeQuickBidPopup">
        <div class="relative bg-white p-6 shadow-lg max-w-md w-full">
          <button class="absolute top-2 right-2 text-gray-400 hover:text-gray-600" @click="closeQuickBidPopup">✕</button>
          <QuickBidCard :product="quickBidProduct" @close="closeQuickBidPopup" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import apiClient from '@/axios'; // Use centralized axios instance
import UserDashboardSidebar from '@/components/UserDashboardSidebar.vue';
import QuickBidCard from '@/components/QuickBidCard.vue';

export default {
  components: {
    UserDashboardSidebar,
    QuickBidCard,
  },
  data() {
    return {
      wishlistItems: [], // Stores the wishlist data
      loading: false, // Tracks loading state
      showQuickBid: false, // Controls the Quick Bid popup
      quickBidProduct: null, // Stores Quick Bid product details
    };
  },
  methods: {
    async fetchWishlistData() {
      const token = sessionStorage.getItem('token');
      if (!token) return console.error('No token found!');

      this.loading = true;

      try {
        const response = await apiClient.get('wishlist', {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.wishlistItems = response.data.map(item => ({
          id: item.lot.id,
          lot_title: item.lot.lot_title,
          image: item.lot.image,
          reserve_price: item.lot.reserve_price,
        }));
      } catch (error) {
        console.error('Error fetching wishlist data:', error);
      } finally {
        this.loading = false;
      }
    },
    async showQuickBidPopup(productId) {
      try {
        const response = await apiClient.get(`lots/detail/${productId}`);
        this.quickBidProduct = response.data;
        this.showQuickBid = true;
      } catch (error) {
        console.error('Failed to fetch product details:', error);
      }
    },
    closeQuickBidPopup() {
      this.showQuickBid = false;
      this.quickBidProduct = null;
    },
    async removeFromWishlist(productId) {
      const token = sessionStorage.getItem('token');
      if (!token) return console.error('No token found!');

      try {
        await apiClient.delete(`wishlist/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.fetchWishlistData();
      } catch (error) {
        console.error('Error removing product from wishlist:', error);
      }
    },
  },
  mounted() {
    this.fetchWishlistData();
  },
};
</script>

<style scoped>
.wapper-max {
  max-width: 1536px !important;
}

.spinner-border {
  border-top-color: transparent;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
