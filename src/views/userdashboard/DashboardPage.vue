<template>
  <div class="bg-[#f3e9ea] py-1"></div>

  <!-- Breadcrumb Navigation -->
  <nav
    aria-label="breadcrumb"
    class="container mx-auto xl:px-16 lg:px-12 md:px-16 sm:px-10 px-6 py-6 text-sm text-gray-600 nunito-sans-light"
    style="max-width: 1536px !important;"
  >
    <ol class="list-reset flex">
      <li>
        <a href="#" class="text-[#B8B8B8]">Home</a>
        <span class="mx-2 text-[#B8B8B8]">></span>
      </li>
      <li>
        <a href="#" class="text-[#3D3D3D]">Dashboard</a>
      </li>
    </ol>
  </nav>

  <div class="flex wapper-max bg-grey container mx-auto min-h-screen xl:px-4 lg:px-12 md:px-16 sm:px-5 px-5">
    <!-- Sidebar -->
    <UserDashboardSidebar />

    <!-- Main Content -->
    <main class="flex-1 px-12 py-6 bg-[#F9E7E966]">
      <!-- User Info Section -->
      <div class="mb-8" v-if="user.name">
        <h2 class="text-3xl text-3xl raleway-custom text-[#8A2432]">Hello {{ user.name }},</h2>
        <p class="text-black text-lg mt-2">Welcome to Wickman’s Fine Wine & Whisky Auction!</p>
      </div>

      <!-- Stats Cards Section -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div class="bg-white p-6 rounded-md border border-[#E496A1] text-center">
          <i class="fa-solid fa-trophy text-[#E496A1] text-3xl mb-4"></i>
          <h3 class="text-5xl font-bold text-black">{{ stats.totalLotsWon }}</h3>
          <p class="text-[#8A2432] font-semibold mt-2 text-lg">Total Lots Won</p>
        </div>
        <div class="bg-white p-6 rounded-md border border-[#E496A1] text-center">
          <i class="fa-solid fa-gavel text-[#E496A1] text-3xl mb-4"></i>
          <h3 class="text-5xl font-bold text-black">{{ stats.totalBids }}</h3>
          <p class="text-[#8A2432] font-semibold mt-2 text-lg">Total Bids</p>
        </div>
        <div class="bg-white p-6 rounded-md border border-[#E496A1] text-center">
          <i class="fa-solid fa-receipt text-[#E496A1] text-3xl mb-4"></i>
          <h3 class="text-5xl font-bold text-black">{{ stats.totalOrders }}</h3>
          <p class="text-[#8A2432] font-semibold mt-2 text-lg">Total Orders</p>
        </div>
      </div>

      <!-- Recent Bids Section -->
      <div class="bg-white px-6 py-2 rounded-md border border-[#E496A1] mb-6">
        <div class="border-b p-2">
          <h3 class="text-lg font-bold text-[#8A2432]">Recent Bids</h3>
        </div>
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b">
              <th class="py-2 px-4">Lot Details</th>
              <th class="py-2 px-4">Current Bid</th>
              <th class="py-2 px-4">Your Bid</th>
              <th class="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="product in products"
              :key="product.id"
              class=" hover:bg-gray-50 transition-colors"
            >
              <td class="py-3 px-4 flex items-center space-x-4">
                <img :src="product.image" alt="" class="w-12 h-12 rounded" />
                <div>
                  <p class="text-sm font-medium">Lot #{{ product.lotNumber }}</p>
                  <p class="text-sm text-gray-500 truncate w-40">{{ product.title }}</p>
                </div>
              </td>
              <td class="py-3 px-4 text-[#8a2432] font-semibold">
                {{ product.currentBid }}
              </td>
              <td class="py-3 px-4 text-gray-600">{{ product.yourBid }}</td>
              <td class="py-3 px-4">
                <a href="#" class="text-gray-600 hover:underline">View Lot</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Wishlist Section -->
      <div class="bg-white px-6 py-2 rounded-md border border-[#E496A1]">
        <div class="border-b p-2">
          <h3 class="text-lg font-bold text-[#8A2432]">Your Wishlist</h3>
        </div>
        
        <!-- Loading Spinner -->
        <div v-if="loading" class="flex justify-center items-center py-8">
          <div class="spinner-border animate-spin text-[#8A2432] w-8 h-8 border-t-2 border-b-2 border-gray-300 rounded-full"></div>
        </div>
        
        <!-- Table displaying wishlist items -->
        <table v-if="!loading" class="w-full text-left border-collapse">
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
import axios from "axios";
import { defineComponent } from "vue";
import UserDashboardSidebar from "@/components/UserDashboardSidebar.vue";
import QuickBidCard from '@/components/QuickBidCard.vue';

// Centralized API base URL
const apiBaseUrl = "https://awa.gprlive.com/api/";

export default defineComponent({
  components: {
    UserDashboardSidebar,
    QuickBidCard,
  },
  data() {
    return {
      user: {},
      stats: {
        totalLotsWon: 10,
        totalBids: 52,
        totalOrders: 8,
      },
      products: [
        {
          id: 1,
          image: require("@/assets/1.png"),
          lotNumber: "357830",
          title: "Buffalo Trace Bourbon Very Fine Rare",
          currentBid: "$1400",
          yourBid: "$1400",
        },
        {
          id: 2,
          image: require("@/assets/1.png"),
          lotNumber: "357831",
          title: "Macallan 12 Year Old",
          currentBid: "$500",
          yourBid: "$500",
        },
        {
          id: 3,
          image: require("@/assets/1.png"),
          lotNumber: "357832",
          title: "Lagavulin 16 Year Old",
          currentBid: "$800",
          yourBid: "$800",
        },
      ],
      wishlistItems: [], // Stores the wishlist data
      loading: false, // Tracks loading state
      showQuickBid: false, // Controls visibility of quick bid popup
      quickBidProduct: null, // Stores the selected product for quick bid
    };
  },
  methods: {
    // Fetch wishlist data from API
    async fetchWishlistData() {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("No token found!");
        return;
      }

      this.loading = true; // Show loader while fetching data

      try {
        const response = await axios.get(`${apiBaseUrl}wishlist`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token
          },
        });

        // Map the API data to only include necessary fields
        this.wishlistItems = response.data.map((item) => ({
          id: item.lot.id,
          lot_title: item.lot.lot_title,
          image: item.lot.image,
          reserve_price: item.lot.reserve_price,
        }));
      } catch (error) {
        console.error("Error fetching wishlist data:", error);
      } finally {
        this.loading = false; // Hide loader after data is fetched
      }
    },

    // Show the quick bid popup for a selected product
    async showQuickBidPopup(productId) {
      try {
        const response = await axios.get(`${apiBaseUrl}lots/detail/${productId}`);
        this.quickBidProduct = response.data;
        this.showQuickBid = true;
      } catch (error) {
        console.error('Failed to fetch product details:', error);
      }
    },

    // Close the quick bid popup
    closeQuickBidPopup() {
      this.showQuickBid = false;
      this.quickBidProduct = null;
    },

    // Remove a wishlist item
    async removeFromWishlist(productId) {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("No token found!");
        return;
      }

      try {
        const response = await axios.delete(`${apiBaseUrl}wishlist/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Product removed from wishlist:", response.data);

        // Refresh the wishlist after removing the product
        this.fetchWishlistData();
      } catch (error) {
        console.error("Error removing product from wishlist:", error);
      }
    },
  },
  created() {
    const user = sessionStorage.getItem("user");
    if (user) {
      this.user = JSON.parse(user);
    } else {
      this.$router.push({ name: "LoginUser" });
    }
  },
  mounted() {
    this.fetchWishlistData(); // Fetch data when the component mounts
  },
});
</script>


<style scoped>
.wapper-max {
  max-width: 1536px !important;
}

.spinner-border {
  border-top-color: #8a2432;
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
