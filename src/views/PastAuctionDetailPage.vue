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
            <li><router-link to="/past-auction" class="text-[#B8B8B8]">Past Auction</router-link><span
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
          <img :src="`https://awa.gprlive.com${product.image}`" alt="Product Image"
            class="w-full object-cover border border-grey" />
          <div class="flex gap-2 mt-4"></div>
        </div>

        <!-- Product Info Section -->
        <div class="w-full md:w-1/3 space-y-4">
          <div class="flex justify-between items-center">
            <p class="text-[#7A7A7A] nunito-sans-light"><span>Lot #:</span>{{ product.lot_number }}</p>
            <p class="text-[#7A7A7A] nunito-sans-light text-right"><span>Sold Date:</span> {{ product.post_date }}</p>
          </div>

          <h1 class="text-2xl text-gray-800 raleway-custom">{{ product.lot_title }}</h1>

          <div class="flex justify-between">
            <div class="flex flex-col border  py-3  w-full text-center ">
              <span class="text-[#7A7A7A] text-[14px] nunito-sans-light">Reserve Price:</span>
              <span class="text-gray-800 font-semibold nunito-sans-light text-[20px]">${{ product.reserve_price
                }}</span>
            </div>
            <div class="flex flex-col py-3 border-b border-t border-r w-full text-center bg-[#f3e9ea]">
              <span class="text-[#7A7A7A] text-[14px] nunito-sans-light">Winning Bid:</span>
              <span class="text-[#8a2432] font-semibold text-[20px] nunito-sans-light">${{ product.buy_now_price
                }}</span>
            </div>
          </div>

          <!-- Product Info Details -->
          <div class="space-y-1 pt-2 nunito-sans-light">
            <div class="flex justify-between">
              <p class="text-[#7A7A7A]">Distillery/Brand:</p>
              <div class="ml-auto text-left w-40">
                <p class="text-black">{{ product.distillery_brand }}</p>
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
import axios from "axios";
import SiteFooter from "@/components/SiteFooter.vue";
import ProductListSlider from '@/components/ProductListSlider.vue';

export default {
  components: {
    SiteFooter,
    ProductListSlider,
  },
  data() {
    return {
      product: null,
      isLoading: true,
      error: null,
      activeTab: 'description', // Set the default active tab
    };
  },
  created() {
    this.fetchProductDetails();
  },
  methods: {
    async fetchProductDetails() {
      // Access the product ID from state, fallback to query parameters if needed
      const id = this.$route.state?.id || this.$route.query.id;

      // Check if ID is available
      if (!id) {
        this.error = "Product ID is missing or not passed in the state or query.";
        this.isLoading = false;
        return;
      }

      const url = `https://awa.gprlive.com/api/lots/detail/${id}`;

      try {
        const response = await axios.get(url);
        if (response.data) {
          this.product = response.data;  // The product data is directly available in response.data
          this.isLoading = false;
        } else {
          throw new Error("No product data found.");
        }
      } catch (error) {
        this.error = error.message || "Failed to fetch product details";
        this.isLoading = false;
      }
    }
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
</style>
