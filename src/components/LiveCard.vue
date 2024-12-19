<template>
  <div class="product-card-wrapper">
    <div 
      class="product-card-container border overflow-hidden border-[#e399a3] hover:ring-2 hover:border-transparent hover:ring-[#8a2432] hover:ring-offset-0 bg-[#8A24320D] cursor-pointer"
      @click="redirectToProductPage"
    >
      <!-- Lot Number and Favorite Icon -->
      <div class="flex justify-between items-center bg-white px-4 pt-2 text-gray-500 text-[10px]">
        <div>Lot #{{ product.lot_number || '00' }}</div>
        <button 
          class="star-button focus:outline-none" 
          @click.stop="handleWishlistClick"
        >
          <img :src="isFavorite ? require('@/assets/Star 1.svg') : require('@/assets/Star 2.svg')" alt="Favorite" class="star-icon" />
        </button>
      </div>

      <!-- Product Image -->
      <img 
        :src="getImageUrl(product.image)"
        alt="Product Image" 
        class="w-full object-contain"
      />

      <!-- Product Details -->
      <div class="product-details px-4 py-6 text-center flex flex-col justify-between flex-1">
        <h3 class="product-title nunito-sans-light text-black leading-4 text-[14px] mb-3">{{ product.lot_title || 'No Title Available' }}</h3>

        <!-- Reserve Price and Current Bid with Vertical Separator -->
        <div class="flex items-center justify-center text-xs text-gray-600 mt-2">
          <!-- Reserve Price Column -->
          <div class="flex flex-col items-end">
            <p class="text-[#3D3D3D] text-[11px] nunito-sans-light">Reserve Price</p>
            <p class="text-[16px] text-black nunito-sans-light">$ {{ product.reserve_price || '00' }}</p>
          </div>

          <!-- Vertical Separator -->
          <div class="border-l border-[#646464] h-7 mx-4"></div>

          <!-- Current Bid Column -->
          <div class="flex flex-col items-start">
            <p class="text-[#8a2432] text-[11px] nunito-sans-light">Current Bid</p>
            <p class="text-[16px] text-black nunito-sans-light custom-font-weight ">$ {{ product.reserve_price || '00' }}</p>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-between gap-4 mt-4">
          <button 
            class="flex-1 bg-[#f9f3f4] border border-[#8a2432] text-[12px] nunito-sans-custom text-[#8a2432] py-2 hover:border-[black] hover:bg-black hover:text-white"
            @click.stop="redirectToProductPage"
          >
            View Lot
          </button>
          <button 
            class="flex-1 py-2 bg-[#8a2432] border text-[12px] nunito-sans-custom text-white hover:bg-white hover:border-[#8a2432] hover:text-[#8a2432]"
            @click.stop="showQuickBidPopup"
          >
            Quick Bid
          </button>
        </div>
      </div>
    </div>

    <!-- QuickBidCard Modal -->
    <div 
      v-if="showQuickBid" 
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      @click.self="closeQuickBidPopup"
    >
      <div class="relative bg-white p-6 shadow-lg max-w-md w-full">
        <button 
          class="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          @click="closeQuickBidPopup"
        >
          ✕
        </button>
        <QuickBidCard :product="quickBidProduct" @close="closeQuickBidPopup" />
      </div>
    </div>
  </div>
</template>

<script>
import apiClient, { baseURL } from '@/axios'; // Import apiClient and baseURL from axios.js
import QuickBidCard from './QuickBidCard.vue';
import { useToast } from 'vue-toastification'; // Import useToast for toasts

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isFavorite: false, // Default state of the star
      showQuickBid: false, // Controls the visibility of QuickBidCard
      quickBidProduct: null, // Holds the product data for quick bid
      wishlist: [], // To hold the fetched wishlist
    };
  },
  methods: {
    // Method to construct the full image URL
    getImageUrl(imagePath) {
      return imagePath ? `${baseURL.replace('/api', '')}${imagePath}` : require('@/assets/Mark 1.jpg');
    },

    redirectToProductPage() {
      this.$router.push({
        name: 'LiveAuctionDetailPage', // Use the route name for navigation
        params: {
          slug: this.product.slug, // Pass the slug parameter in the URL
        },
        query: {
          id: this.product.id, // Pass the ID as a query parameter
        },
      });
    },

    // Check login status and handle wishlist click
    handleWishlistClick() {
      const token = sessionStorage.getItem('token');
      if (!token) {
        // Show toast notification before redirecting to login
        this.showToast('Please log in before adding to the wishlist.');
        this.$router.push({ name: 'LoginUser' });
        return;
      }
      // Proceed to toggle the favorite state
      this.toggleFavorite();
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

    async showQuickBidPopup() {
      const token = sessionStorage.getItem('token');
      if (!token) {
        // Show toast notification before redirecting to login
        this.showToast('Please log in to place a quick bid.');
        this.$router.push({ name: 'LoginUser' });
        return;
      }

      const id = this.product.id;
      const url = `/lots/detail/${id}`;

      try {
        const response = await apiClient.get(url);
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

    // Method to show toast notifications
    showToast(message) {
      const toast = useToast();
      toast.info(message); // Display an info toast message
    },
  },
  components: {
    QuickBidCard,
  },
  created() {
    this.getWishlist();
  },
};
</script>



<style scoped>
.product-card-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 16px; /* Add spacing between cards */
}

.product-card-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 400px; /* Minimum height for each card */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-title {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limit to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden; /* Hide overflow */
  text-overflow: ellipsis; /* Show ellipsis */
  font-weight: 500;
}

.star-button {
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

.star-icon {
  width: 20px;
  height: 20px;
}

.product-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1; /* Make sure this div takes up remaining space */
}

.product-card-container img {
  object-fit: cover;
}

@media (max-width: 1024px) {
  .product-card-container {
    width: calc(50% - 16px); /* 2 cards per row on medium screens */
  }
}

@media (max-width: 768px) {
  .product-card-container {
    width: 100%; /* 1 card per row on small screens */
  }
}
</style>
