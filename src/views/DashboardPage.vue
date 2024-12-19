<template>
  <div class="flex min-h-screen container mx-auto xl:px-4 lg:px-12 md:px-16 sm:px-10 px-6">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-gray-300 shadow-md">
      <div class="p-6 text-center border-b border-gray-300">
        <h1 class="text-xl font-bold text-gray-700">Whisky Auctions</h1>
      </div>
      <nav class="flex-1">
        <ul>
          <li class="p-4 hover:bg-gray-200">
            <router-link to="/dashboard" class="block">Dashboard</router-link>
          </li>
          <li class="p-4 hover:bg-gray-200">
            <router-link to="/my-listings" class="block">My Listings</router-link>
          </li>
          <li class="p-4 hover:bg-gray-200">
            <router-link to="/bidding-history" class="block">Bidding History</router-link>
          </li>
          <li class="p-4 hover:bg-gray-200">
            <router-link to="/account-settings" class="block">Account Settings</router-link>
          </li>
        </ul>
      </nav>
      <button 
        @click="showLogoutConfirmation = true" 
        class="p-4 text-center bg-[#8a2432] w-full text-white hover:bg-black border-t border-gray-300">
        Logout
      </button>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6">
      <!-- Welcome Section -->
      
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-semibold">Welcome, {{ user.name }}!</h1>
          <p class="text-gray-500">Role: <strong class="text-gray-700">{{ user.role }}</strong></p>
        </div>
        <div>
          <button 
            class="px-6 py-2 bg-[#8a2432]  text-white font-semibold hover:bg-black">
            Add New Listing
          </button>
        </div>
      </div>

      <!-- Dashboard Metrics -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div class="p-6 bg-white shadow-md">
          <h2 class="text-lg font-semibold text-gray-600">Total Listings</h2>
          <p class="mt-2 text-2xl font-bold text-gray-800">12</p>
        </div>
        <div class="p-6 bg-white shadow-md">
          <h2 class="text-lg font-semibold text-gray-600">Active Bids</h2>
          <p class="mt-2 text-2xl font-bold text-gray-800">7</p>
        </div>
        <div class="p-6 bg-white shadow-md">
          <h2 class="text-lg font-semibold text-gray-600">Total Earnings</h2>
          <p class="mt-2 text-2xl font-bold text-gray-800">$1,245</p>
        </div>
      </div>

      <!-- Current Auctions -->
      <div>
        <h2 class="text-2xl font-semibold mb-6 text-gray-700">Current Auctions</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="(item, index) in auctions" 
            :key="index" 
            class="p-4 bg-white shadow-md">
            <img 
              :src="item.image" 
              alt="whiskey bottle" 
              class="w-full h-40 object-cover mb-4"
            />
            <h3 class="text-lg font-semibold text-gray-800">{{ item.name }}</h3>
            <p class="mt-2 text-sm text-gray-600">Current Bid: ${{ item.currentBid }}</p>
            <button 
              class="mt-4 w-full px-4 py-2 bg-[#8a2432] hover:bg-black text-white font-medium ">
              Place Bid
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Logout Confirmation Modal -->
    <div 
      v-if="showLogoutConfirmation" 
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 shadow-md w-96">
        <h2 class="text-lg font-semibold mb-4">Are you sure you want to log out?</h2>
        <div class="flex justify-end space-x-4">
          <button 
            @click="showLogoutConfirmation = false" 
            class="px-4 py-2 bg-white border-black border text-gray-800">
            Cancel
          </button>
          <button 
            @click="logout" 
            class="px-4 py-2 bg-[#8a2432] text-white">
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      auctions: [
        {
          name: "Macallan 18-Year-Old",
          image: "https://www.australianwhiskyauctions.com.au/uploads/images/alternating/1658584451GSM_AUSTWHISKYAUCTIONS_productphotographyMAR0011.jpg",
          currentBid: 1500,
        },
        {
          name: "Glenfiddich Rare Collection",
          image: "https://www.australianwhiskyauctions.com.au/uploads/images/alternating/163507964021AusWhiskeyJan024.jpg",
          currentBid: 1200,
        },
        {
          name: "Lagavulin Distiller's Edition",
          image: "https://www.australianwhiskyauctions.com.au/uploads/images/alternating/1658584498GSM_AUSTWHISKYAUCTIONS_productphotographyMAY0006.jpg",
          currentBid: 900,
        },
      ],
      showLogoutConfirmation: false,
    };
  },
  created() {
    const user = sessionStorage.getItem("user");
    if (user) {
      this.user = JSON.parse(user);
    } else {
      this.$router.push({ name: "LoginUser" }); // Redirect to login if not authenticated
    }
  },
  methods: {
    logout() {
      sessionStorage.clear(); // Clear session data
      this.$router.push({ name: "LoginUser" }); // Redirect to login screen
    },
  },
};
</script>

<style scoped>
body {
  font-family: 'Nunito Sans', sans-serif;
}
aside {
  min-height: 100vh;
}
button {
  transition: all 0.3s ease;
}

.container {
  max-width: 1522px !important;
}
</style>
