<template>

  <div class="bg-[#f3e9ea] py-1"></div>
  <!-- Breadcrumb Navigation -->
  <nav aria-label="breadcrumb"
    class="container mx-auto xl:px-16 lg:px-12 md:px-16 sm:px-10 px-6 py-6 text-sm text-gray-600 nunito-sans-light "
    style="max-width: 1536px !important;">
    <ol class="list-reset flex">
      <li>
        <a href="#" class="text-[#B8B8B8]">Home</a>
        <span class="mx-2 text-[#B8B8B8]">></span>
      </li>
      <li>
        <a href="#" class="text-[#3D3D3D]">Live Auction</a>
      </li>
    </ol>
  </nav>


  <div class="flex wapper-max bg-grey container mx-auto   xl:px-4 lg:px-12 md:px-16 sm:px-5 px-5 min-h-screen">
    <UserDashboardSidebar />
    <main class="flex-1 px-12 py-6 bg-[#F9E7E966]">
      <!-- Header Section -->
      <h1 class="text-3xl raleway-custom text-black">Notification Settings</h1>
      <p class="text-gray-600 nunito-sans-light">
        Here you can set which notifications you want to receive.
      </p>

      <!-- Notification Settings Container -->
      <div class="mt-6 bg-white  rounded-md border border-[#E496A1]  p-6 space-y-4">
        <!-- Loop through notification settings -->
        <div v-for="(value, key, index) in notificationSettings" :key="key">
          <div class="flex items-center">
            <input type="checkbox" :id="key" class="custom-checkbox" v-model="notificationSettings[key]" />
            <label :for="key" class="ml-4 text-gray-800 nunito-sans-light">
              {{ notificationLabels[key] }}
            </label>
          </div>
          <!-- Only add <hr> if it's not the last item -->
          <hr v-if="index < Object.keys(notificationSettings).length - 1" class="mt-4 border-gray-200">
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import UserDashboardSidebar from "@/components/UserDashboardSidebar.vue";

export default {
  components: {
    UserDashboardSidebar,
  },
  data() {
    return {
      notificationSettings: {
        ownItems: true,
        bidAccepted: true,
        outbid: true,
        bidIncreases: true,
        promotionalEmails: true,
        watchlist: true,
      },
      notificationLabels: {
        ownItems: "Email about my own items for sale",
        bidAccepted: "Email when bid accepted",
        outbid: "Email when I'm outbid",
        bidIncreases: "Email when my bid increases",
        promotionalEmails: "Email me promotional emails from Australian Whisky Auctions",
        watchlist: "Email when lot on my watchlist has a new bid",
      },
    };
  },
};
</script>

<style scoped>
/* Custom Checkbox Styling */
.custom-checkbox {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid #8a2432;
  background-color: white;
  cursor: pointer;
  outline: none;
  position: relative;
}

.custom-checkbox:checked {
  background-color: #8a2432;
}

.custom-checkbox:checked::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 6px;
  height: 12px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.wapper-max {
  max-width: 1536px !important;
}
</style>