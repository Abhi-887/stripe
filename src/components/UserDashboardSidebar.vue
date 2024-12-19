<template>
  <aside class="w-64 bg-white">
    <!-- Navigation Menu -->
    <nav class="flex-1">
      <ul class="space-y-1">
        <!-- Dashboard -->
        <li :class="['flex items-center px-12 py-3 ', { 'bg-[#f3e9ea]': isActive('/dashboard') }]">
          <router-link to="/dashboard" class="flex items-center space-x-4 w-full">
            <img
              :src="isActive('/dashboard') ? require('@/assets/Dashbord-Active.svg') : require('@/assets/Dashbord.svg')"
              alt="Dashboard Icon" class="w-5 h-5" />
            <span :class="{'text-[#8a2432]': isActive('/dashboard'), 'text-gray-800': !isActive('/dashboard')}"
              class="nunito-sans-light font-bld">
              Dashboard
            </span>
          </router-link>
        </li>

        <!-- Edit Details -->
        <li :class="['flex items-center px-12 py-3  ', { 'bg-[#f3e9ea]': isActive('/user-profile') }]">
          <router-link to="/user-profile" class="flex items-center space-x-4 w-full">
            <img
              :src="isActive('/user-profile') ? require('@/assets/Acount-active.svg') : require('@/assets/Account Icon.svg')"
              alt="Edit Details Icon" class="w-5 h-5" />
            <span :class="{'text-[#8a2432]': isActive('/user-profile'), 'text-gray-800': !isActive('/user-profile')}"
              class="nunito-sans-light font-bld">
              Edit Details
            </span>
          </router-link>
        </li>

        <!-- User Notifications -->
        <li :class="['flex items-center px-12 py-3 ', { 'bg-[#f3e9ea]': isActive('/user-notification') }]">
          <router-link to="/user-notification" class="flex items-center space-x-4 w-full">
            <img
              :src="isActive('/user-notification') ? require('@/assets/notification-active.svg') : require('@/assets/Notification-dash.svg')"
              alt="Notifications Icon" class="w-5 h-5" />
            <span :class="{'text-[#8a2432]': isActive('/user-notification'), 'text-gray-800': !isActive('/user-notification')}"
              class="nunito-sans-light font-bld">
              Notifications
            </span>
          </router-link>
        </li>

        <!-- Address -->
        <li :class="['flex items-center px-12 py-3 ', { 'bg-[#f3e9ea]': isActive('/address') }]">
          <router-link to="/address" class="flex items-center space-x-4 w-full">
            <img
              :src="isActive('/address') ? require('@/assets/locstion.svg') : require('@/assets/location-active.svg')"
              alt="Address Icon" class="w-5 h-5" />
            <span :class="{'text-[#8a2432]': isActive('/address'), 'text-gray-800': !isActive('/address')}"
              class="nunito-sans-light font-bld">
              Address
            </span>
          </router-link>
        </li>

        <!-- WishList -->
        <li :class="['flex items-center px-12 py-3', { 'bg-[#f3e9ea]': isActive('/wishlist') }]">
          <router-link to="/wishlist" class="flex items-center space-x-4 w-full">
            <img
              :src="isActive('/wishlist') ? require('@/assets/Wishlist-active.svg') : require('@/assets/watchlist.svg')"
              alt="Watchlist Icon" class="w-5 h-5" />
            <span :class="{'text-[#8a2432]': isActive('/wishlist'), 'text-gray-800': !isActive('/wishlist')}"
              class="nunito-sans-light font-bld">
              Watchlist
            </span>
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Logout Button -->
    <div class="mt-auto border-t">
      <button @click="showLogoutConfirmation = true"
        class="flex items-center space-x-4 px-12 w-full py-3 mt-6 text-[#8a2430] hover:text-[#8a2430] hover:bg-[#f3e9ea]">
        <img :src="require('@/assets/logout.svg')" alt="Log Out Icon" class="w-5 h-5" />
        <span class="nunito-sans-light font-bld ">Log Out</span>
      </button>
    </div>

    <!-- Logout Confirmation Modal -->
    <div v-if="showLogoutConfirmation"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 shadow-lg max-w-sm w-full">
        <p class="text-lg font-semibold text-gray-800 mb-4">Are you sure you want to log out?</p>
        <div class="flex space-x-4">
          <button @click="cancelLogout"
            class="px-4 py-2 bg-white hover:bg-gray-200 border-black border w-full text-gray-800 ">
            Cancel
          </button>
          <button @click="confirmLogout" class="px-4 py-2 bg-[#8a2432] hover:bg-red-700 w-full text-white">
            Log Out
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>


<script>
export default {
  data() {
    return {
      user: {}, // Store user details
      showLogoutConfirmation: false, // Show/hide the logout confirmation modal
    };
  },
  created() {
    const user = sessionStorage.getItem("user");
    if (user) {
      this.user = JSON.parse(user); // Parse user details
    } else {
      this.$router.push({ name: "LoginUser" }); // Redirect to login if not authenticated
    }
  },
  methods: {
    // Check if the current route matches the given path
    isActive(path) {
      return this.$route.path === path;
    },
    // Cancel logout
    cancelLogout() {
      this.showLogoutConfirmation = false; // Hide the confirmation modal
    },
    // Confirm and execute logout
    confirmLogout() {
      sessionStorage.clear(); // Clear session data
      this.$router.push({ name: "LoginUser" }); // Redirect to login screen
      this.showLogoutConfirmation = false; // Hide the confirmation modal
    },
  },
};
</script>

<style scoped>
aside {
  min-height: 100vh;
}

button {
  transition: all 0.3s ease;
}

.font-bld {
  font-weight: 600;
}

.hover\:text-white:hover {
  color: #ffffff;
}
</style>
