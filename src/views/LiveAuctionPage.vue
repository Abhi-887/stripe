<template>
  <div class="bg-white min-h-screen">
    <!-- Notification Bar -->
    <div class="bg-[#f3e9ea] py-1"></div>

    <!-- Breadcrumb Navigation -->
    <div class="text-sm container mx-auto xl:px-4 lg:px-12 md:px-16 sm:px-8 px-5 py-8 text-gray-600">
      <nav aria-label="Breadcrumb nunito-sans-light">
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
            <span class="text-[#3D3D3D]">Oct 2024 Auction</span>
          </li>
        </ol>
      </nav>
    </div>

    <!-- Top Banner -->
    <LiveBanner />

    <!-- Main Content -->
    <div class="container mx-auto xl:px-4 lg:px-12 md:px-16 sm:px-8 p-4">
      <div class="flex min-h-screen">
        <!-- Left Filter Bar -->
        <div class="w-1/4 pr-8 h-full">
          <FilterBar />
        </div>

        <!-- Right Content Area -->
        <div class="w-3/4">
          <!-- Header with Total Lots, Sort By, and Show Options -->
          <div class="flex justify-between items-center mb-6 bg-[#f9f3f4] px-6 py-2">
            <!-- Total Lots Count -->
            <div class="text-sm text-[#5C5C5C] nunito-sans-light">
              Total Lots: <span class="text-black">{{ products.length }}</span>
            </div>

            <!-- Sort By Dropdown -->
            <div class="relative">
              <label class="mr-2 text-sm text-[#5C5C5C] nunito-sans-light">Sort By:</label>
              <div class="dropdown-container w-40" @click="toggleDropdown('sortOrder')">
                <div class="dropdown-select text-sm text-[#000] nunito-sans-light ">
                  {{ sortOrderText }}
                </div>
                <div v-if="isSortOrderOpen" class="dropdown-options text-sm text-[#000] nunito-sans-light shadow-lg shadow-gray-300">
                  <div v-for="option in sortOptions" :key="option" @click="selectSortOrder(option)" class="dropdown-option w-40">
                    {{ option }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Show Dropdown -->
            <div class="relative">
              <label class="mr-2 text-sm text-[#5C5C5C] nunito-sans-light">Show:</label>
              <div class="dropdown-container w-14" @click="toggleDropdown('itemsPerPage')">
                <div class="dropdown-select text-sm text-[#000] nunito-sans-light">
                  {{ itemsPerPage }}
                </div>
                <div v-if="isItemsPerPageOpen" class="dropdown-options w-14 shadow-lg shadow-gray-300 ">
                  <div v-for="size in [30, 45, 60]" :key="size" @click="setItemsPerPage(size)" class="dropdown-option text-sm text-[#000] nunito-sans-light">
                    {{ size }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Product Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <LiveCard v-for="product in paginatedProducts" :key="product.id" :product="product" />
          </div>

        </div>
      </div>

      <!-- Pagination Controls -->
      <div class="pagination flex justify-center items-center mt-6 mb-12">
        <!-- Left Arrow (First Page) -->
        <button @click="changePage(1)" :disabled="currentPage === 1" class="pagination-button">
          <img src="@/assets/Vector 18.svg" alt="First Page" class="w-2.5" />
        </button>

        <!-- Left Arrow (Previous Page) -->
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="pagination-button">
          <img src="@/assets/Vector 18.svg" alt="First Page" class="w-2.5" />
          <img src="@/assets/Vector 18.svg" alt="First Page" class="w-2.5" />
        </button>

        <!-- Page Number Buttons -->
        <span v-if="currentPage > 2" @click="changePage(1)" class="pagination-number cursor-pointer">1</span>
        <span v-if="currentPage > 3">...</span>

        <button v-for="page in visiblePages" :key="page" @click="changePage(page)" :class="[
          'pagination-button',
          page === currentPage ? 'active' : ''
        ]" class="pagination-number">
          {{ page }}
        </button>

        <span v-if="currentPage < totalPages - 2">...</span>
        <span v-if="currentPage < totalPages - 1" @click="changePage(totalPages)"
          class="pagination-number cursor-pointer">
          {{ totalPages }}
        </span>

        <!-- Right Arrow (Next Page) -->
        <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
          class="pagination-button">
          <img src="@/assets/Vector 18.svg" alt="Last Page" class="w-2.5 rotate-180" />
          <img src="@/assets/Vector 18.svg" alt="Last Page" class="w-2.5 rotate-180" />
        </button>

        <!-- Right Arrow (Last Page) -->
        <button @click="changePage(totalPages)" :disabled="currentPage === totalPages" class="pagination-button">
          <img src="@/assets/Vector 18.svg" alt="Last Page" class="w-2.5 rotate-180" />
        </button>
      </div>
    </div>

    <!-- Footer -->
    <SiteFooter />
  </div>
</template>

<script>
import LiveCard from '@/components/LiveCard.vue';
import FilterBar from '@/components/FilterBar.vue';
import SiteFooter from '@/components/SiteFooter.vue';
import LiveBanner from '@/components/LiveBanner.vue';

export default {
  components: {
    LiveCard,
    FilterBar,
    SiteFooter,
    LiveBanner,
  },
  data() {
    return {
      products: [
        // Example data (add more if needed)
        { id: 1, soldDate: "24/09/2024", image: require('@/assets/1718862141IMG-0347 4.png'), lotNumber: "357825", reservePrice: "$67544.00", title: "Woodford Reserve", winningBid: "$14500.00" },
        { id: 2, soldDate: "25/09/2024", image: require('@/assets/1718862141IMG-0347 4.png'), lotNumber: "357826", reservePrice: "$50000.00", title: "Reserve Lot Title", winningBid: "$16000.00" },
        // Add more products here...
      ],
      sortOrder: 'Bid Price (Highest)',
      currentPage: 1,
      itemsPerPage: 30,
      isSortOrderOpen: false,
      isItemsPerPageOpen: false,
      sortOptions: ['Bid Price (Highest)', 'Bid Price (Lowest)', 'Lot Title A to Z', 'Lot Title Z to A'],
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.products.length / this.itemsPerPage);
    },
    visiblePages() {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    },
    sortOrderText() {
      return this.sortOptions.find(option => option === this.sortOrder);
    },
    paginatedProducts() {
      const sortedProducts = this.sortProducts();
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return sortedProducts.slice(start, start + this.itemsPerPage);
    },
  },
  methods: {
    sortProducts() {
      if (this.sortOrder === 'Bid Price (Highest)') {
        return this.products.sort((a, b) => parseFloat(b.winningBid.replace('$', '')) - parseFloat(a.winningBid.replace('$', '')));
      } else if (this.sortOrder === 'Bid Price (Lowest)') {
        return this.products.sort((a, b) => parseFloat(a.winningBid.replace('$', '')) - parseFloat(b.winningBid.replace('$', '')));
      }
      // Other sorting conditions (like Lot Title) can be added here
      return this.products;
    },
    toggleDropdown(type) {
      if (type === 'sortOrder') {
        this.isSortOrderOpen = !this.isSortOrderOpen;
        this.isItemsPerPageOpen = false;
      } else if (type === 'itemsPerPage') {
        this.isItemsPerPageOpen = !this.isItemsPerPageOpen;
        this.isSortOrderOpen = false;
      }
    },
    selectSortOrder(option) {
      this.sortOrder = option;
      this.isSortOrderOpen = false;
    },
    setItemsPerPage(size) {
      this.itemsPerPage = size;
      this.isItemsPerPageOpen = false;
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
};
</script>

<style scoped>
/* Add any scoped styles here */
.pagination-button {
  background-color: transparent;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.pagination-number {
  padding: 10px;
  cursor: pointer;
}

.pagination-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.pagination-button.active {
  font-weight: bold;
}

.dropdown-container {
  cursor: pointer;
  position: relative;
}

.dropdown-options {
  position: absolute;
  background-color: white;
  width: 100%;
  border: 1px solid #ccc;
  z-index: 10;
}

.dropdown-option {
  padding: 10px;
  cursor: pointer;
}

.dropdown-option:hover {
  background-color: #f0f0f0;
}
</style>
