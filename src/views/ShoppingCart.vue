<template>
  <div class="bg-[#f9f5f6] pb-5">
    <!-- Breadcrumb Navigation -->
    <div class="container px-5 py-8 mx-auto text-sm text-gray-600 xl:px-4 lg:px-12 md:px-16 sm:px-8">
      <nav aria-label="Breadcrumb nunito-sans-light">
        <ol class="flex list-reset">
          <li>
            <a href="#" class="text-[#B8B8B8]">Home</a>
            <span class="mx-2 text-[#B8B8B8]">></span>
          </li>
          <li>
            <span class="text-[#3D3D3D]">Cart</span>
          </li>
        </ol>
      </nav>
    </div>

    <div class="py-10">
      <div class="max-w-4xl mx-auto">
        <!-- Progress Bar -->
        <div class="flex items-center justify-between">
          <div class="text-center">
            <div class="w-8 h-8 flex items-center justify-center bg-[#E496A1] text-black rounded-full mx-auto">
              1
            </div>
            <p class="md:text-md sm:text-base text-[12px] nunito-sans-light text-gray-700 mt-2">Cart Overview</p>
          </div>
          <div class="flex-1 border-t border-[#d9c6c8] -mt-7"></div>
          <div class="text-center">
            <div class="w-8 h-8 flex items-center justify-center bg-[#F9E7E9] text-black rounded-full mx-auto">
              2
            </div>
            <p class="md:text-md sm:text-base text-[12px] nunito-sans-light text-gray-700 mt-2">Select Address</p>
          </div>
          <div class="flex-1 border-t border-[#d9c6c8] -mt-7"></div>
          <div class="text-center">
            <div class="w-8 h-8 flex items-center justify-center bg-[#F9E7E9] text-black rounded-full mx-auto">
              3
            </div>
            <p class="md:text-md sm:text-base text-[12px] nunito-sans-light text-gray-700 mt-2">Review Order</p>
          </div>
          <div class="flex-1 border-t border-[#d9c6c8] -mt-7"></div>
          <div class="text-center">
            <div class="w-8 h-8 flex items-center justify-center bg-[#F9E7E9] text-black rounded-full mx-auto">
              4
            </div>
            <p class="md:text-md sm:text-base text-[12px] nunito-sans-light text-gray-700 mt-2">Make Payment</p>
          </div>
        </div>
      </div>
    </div>

    <div class="container p-10 mx-auto bg-white border border-red-200 rounded-lg wapper-max">
      <p class="mb-10 md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-light text-gray-700">{{
        cartItems.length }} items in your bag.</p>

      <!-- If there are items in the cart -->
      <div v-if="cartItems.length">
        <!-- Table Header -->
        <div
          class="grid items-center justify-center grid-cols-12 gap-4 py-2 mb-4 font-semibold text-gray-700 border-t border-b border-gray-300">
          <div class="col-span-2 md:text-md sm:text-base text-[12px] nunito-sans-light text-gray-700 text-center">Image
          </div>
          <div class="col-span-2 md:text-md sm:text-base text-[12px] nunito-sans-light text-gray-700 text-center">Lot
            No.</div>
          <div class="col-span-4 md:text-md sm:text-base text-[12px] nunito-sans-light text-gray-700 text-center">Name
          </div>
          <div class="col-span-2 md:text-md sm:text-base text-[12px] nunito-sans-light text-gray-700 text-center">
            Quantity</div>
          <div class="col-span-2 md:text-md sm:text-base text-[12px] nunito-sans-light text-gray-700 text-center">Price
          </div>
        </div>

        <!-- Loop over cart items -->
        <div v-for="item in cartItems" :key="item.id" class="mb-4">
          <!-- Table Row for Cart Item -->
          <div class="grid items-center grid-cols-12 gap-4 py-4 justify-items-center">
            <!-- Image Column -->
            <div class="flex justify-center col-span-2">
              <img :src="item.product_image ? `https://awa.gprlive.com/${item.product_image}` : 'default-image.jpg'"
                :alt="item.product_name" class="object-cover w-16 h-16 rounded-md" />
            </div>

            <!-- Lot No. Column -->
            <div
              class="col-span-2 md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-light text-gray-700 text-center">
              #{{ item.lot_no }}
            </div>

            <!-- Name Column -->
            <div class="col-span-4 md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">
              {{ item.product_name }}
            </div>

            <!-- Quantity Column -->
            <div
              class="col-span-2 md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-light text-gray-700 text-center">
              {{ parseFloat(item.quantity) }} Bottle
            </div>

            <!-- Price Column -->
            <div
              class="col-span-2 md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700 text-center">
              £{{ parseFloat(item.price).toFixed(2) }}
            </div>
          </div>
        </div>
        <div class="pt-5 border-t me-14">
          <p class="md:text-lg sm:text-base text-[12px] nunito-sans-light text-gray-700 text-end">Total Amount: <span
              class="font-semibold ms-10">£{{ total.toFixed(2) }}</span></p>
        </div>
      </div>

      <!-- If no items in the cart -->
      <div v-else>
        <p class="md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-light text-gray-700">Your cart is empty.
        </p>
      </div>
    </div>

    <!-- Checkout Button or Empty Cart Message -->
    <div class="container pt-10 mx-auto wapper-max text-end">
      <a v-if="isCheckoutEnabled" @click="handleCheckout"
        class="bg-[#8a2432] cursor-pointer border border-[#8a2432] text-white xl:py-3 lg:py-3 md:py-3 sm:py-3 py-2 xl:px-16 lg:px-6 md:px-4 sm:px-4 px-5 hover:border-[#8a2432] transition hover:bg-white hover:text-[#8a2432] nunito-sans-light md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-light text-gray-700">
        Checkout
      </a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useCartStore } from '@/stores/cart'; // Import the Pinia store

export default {
  computed: {
    // Access cart items from Pinia store
    cartItems() {
      const cartStore = useCartStore();
      return cartStore.cartItems;
    },
    // Calculate the total cost of the cart using Pinia store
    total() {
      const cartStore = useCartStore();
      return cartStore.cartItems.reduce((acc, item) => acc + parseFloat(item.price) , 0);
    },
    isCheckoutEnabled() {
      const cartStore = useCartStore();
      return cartStore.cartItems.length > 0 && (cartStore.cartItems[0].order_status === 'In-Cart' || cartStore.cartItems[0].order_status === 'Draft');
    }
  },
  methods: {
    // Fetch data from the API and store it in Pinia
    fetchCartData() {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.warn('No token found in session storage.');
        return;
      }

      // Fetch user details
      axios.get('https://awa.gprlive.com/api/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(userResponse => {
          const user = userResponse.data.user;

          if (!user || !user.id) {
            console.error('Invalid user data or user ID missing.');
            return;
          }

          console.log('User details fetched successfully:', user);

          // Fetch cart data
          return axios.get(`https://awa.gprlive.com/api/carts?user_id=${user.id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        })
        .then(response => {
          if (response && response.data && Array.isArray(response.data.data)) {
            // Use Pinia store to update cart data
            const cartStore = useCartStore();
            cartStore.setCartData(response.data.data.map(item => ({
              ...item,
              // quantity: 1,
            })));

            console.log('Cart data fetched successfully:', cartStore.cartItems);
          } else {
            console.warn('No cart data available.');
          }
        })
        .catch(error => {
          console.error('Error fetching cart data:', error.response?.data || error.message);
          this.$toast.error('Unable to fetch cart data. Please try again later.');
        });
    },

    // Redirect to the checkout page
    handleCheckout() {
      if (this.isCheckoutEnabled) {
        this.$router.push({ name: 'CheckOutPage' }); // Navigate to the checkout route
      } else {
        this.$toast.error('Your cart is empty. Please add items to proceed.');
      }
    }
  },

  mounted() {
    this.fetchCartData(); // Fetch cart data when the component is mounted
  }
};
</script>
