<template>
  <div class="bg-white min-h-screen">
    <!-- Notification Bar -->
    <Notificationbar />

    <!-- Breadcrumb Navigation -->
    <nav aria-label="breadcrumb" class="container mx-auto xl:px-4 lg:px-12 md:px-16 sm:px-8 px-5 py-8 text-sm text-gray-600">
      <ol class="list-reset flex">
        <li>
          <a href="#" class="text-[#B8B8B8]">Home</a>
          <span class="mx-2 text-[#B8B8B8]">></span>
        </li>
        <li>
          <a href="#" class="text-[#B8B8B8]">Live Auction</a>
          <span class="mx-2 text-[#B8B8B8]">></span>
        </li>
        <li>
          <span class="text-[#3D3D3D]">{{ auctionSlug || 'Auction' }}</span>
        </li>
      </ol>
    </nav>

    <!-- Top Banner -->
    <TopBanner :title="auctionTitle" :description="auctionDescription" :longDescription="auctionDescription" />

    <!-- Main Content -->
    <div class="container mx-auto xl:px-4 lg:px-12 md:px-16 sm:px-8 px-2 py-10">
      <div class="flex">
        <!-- Left Filter Bar -->
        <div class="w-1/4 pr-8 h-full">
          <FilterBar />
        </div>

        <!-- Right Content Area -->
        <div class="w-3/4">
          <TopFilterBar :lotCount="auctionItems.length" :sortOptions="sortOptions" :itemsPerPage="itemsPerPage"
            :isSortOrderOpen="isSortOrderOpen" :isItemsPerPageOpen="isItemsPerPageOpen"
            @toggle-dropdown="toggleDropdown" @select-sort-order="selectSortOrder"
            @set-items-per-page="setItemsPerPage" />

     <div v-if="isLoading" class="text-center py-8">Loading auction items...</div>
          <div v-else-if="auctionItems.length === 0" class="text-center py-8">No auction items available.</div>
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            <LiveCard v-for="item in auctionItems" :key="item.id" :product="item" />
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <SiteFooter />
  </div>
</template>

<script>
import { useLiveAuctionStore } from '@/stores/auctionStore';
import FilterBar from '@/components/FilterBar.vue';
import LiveCard from '@/components/LiveCard.vue';
import SiteFooter from '@/components/SiteFooter.vue';
import TopBanner from '@/components/TopBanner.vue';
import TopFilterBar from '@/components/TopFilterBar.vue';
import apiClient from '@/axios';

export default {
  data() {
    return {
      auctionItems: [],
      isLoading: true,
      retryCount: 0,
      maxRetries: 5,
      retryDelay: 2000,
      auctionId: null,
      auctionSlug: '',
      auctionTitle: '',
      auctionDescription: '',
      sortOrderText: 'Default',
      sortOptions: ['Default', 'Price', 'Newest'],
      isSortOrderOpen: false,
      isItemsPerPageOpen: false,
      itemsPerPage: 30,
    };
  },
  components: {
    LiveCard,
    SiteFooter,
    TopBanner,
    TopFilterBar,
    FilterBar,
  },
  mounted() {
    const auctionStore = useLiveAuctionStore();

    // Retrieve auction data from the Pinia store or sessionStorage
    this.auctionId = auctionStore.auctionId || sessionStorage.getItem('auctionId');
    this.auctionSlug = auctionStore.auctionSlug || sessionStorage.getItem('auctionSlug');
    this.auctionTitle = auctionStore.auctionTitle || sessionStorage.getItem('auctionTitle');
    this.auctionDescription = auctionStore.auctionDescription || sessionStorage.getItem('auctionDescription');

    // Check if auction data exists, if not, redirect to a fallback route
    if (this.auctionId) {
      this.fetchAuctionDetails();
    } else {
      // Redirect or show a message if no auction data is available
      console.error('No auction data available.');
    }
  },
  methods: {
    async fetchAuctionDetails() {
      this.isLoading = true;
      try {
        if (!this.auctionId) {
          console.error('No auction ID available for fetching details.');
          return;
        }

        const response = await apiClient.get(`/lots/${this.auctionId}`);
        if (response.data && Array.isArray(response.data.data) && response.data.data.length) {
          this.auctionItems = response.data.data;
          this.retryCount = 0;
        } else {
          this.auctionItems = [];
          this.retryFetch();
        }
      } catch (error) {
        console.error('Error fetching auction details:', error);
        this.retryFetch();
      } finally {
        this.isLoading = false;
      }
    },
    retryFetch() {
      if (this.retryCount < this.maxRetries) {
        setTimeout(() => {
          this.retryCount++;
          this.fetchAuctionDetails();
        }, this.retryDelay);
      } else {
        console.error('Maximum retries reached. Unable to fetch auction details.');
      }
    },
  },
  watch: {
    auctionId(newVal) {
      if (newVal) {
        // Persist the auction data to sessionStorage to handle reloads
        sessionStorage.setItem('auctionId', this.auctionId);
        sessionStorage.setItem('auctionSlug', this.auctionSlug);
        sessionStorage.setItem('auctionTitle', this.auctionTitle);
        sessionStorage.setItem('auctionDescription', this.auctionDescription);
      }
    },
  },
};
</script>



<style scoped>
.container {
  max-width: 1280px;
}
</style>
