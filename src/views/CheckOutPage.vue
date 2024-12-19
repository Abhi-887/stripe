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
            <a href="#" class="text-[#B8B8B8]">Cart</a>
            <span class="mx-2 text-[#B8B8B8]">></span>
          </li>
          <li>
            <span class="text-[#3D3D3D]">Select Delivery Address</span>
          </li>
        </ol>
      </nav>
    </div>
    <div class="py-10">
      <div class="max-w-4xl mx-auto">
        <!-- Progress Bar -->
        <div class="flex items-center justify-between">
          <div class="text-center">
            <router-link to="/cart">
              <div class="w-8 h-8 flex items-center justify-center bg-[#E496A1] text-black rounded-full mx-auto">
                1
              </div>
            </router-link>
            <p class="md:text-md sm:text-base text-[12px] nunito-sans-light text-gray-700 mt-2">Cart Overview</p>
          </div>
          <div class="flex-1 border-t border-[#E496A1] -mt-7"></div>
          <div class="text-center">
            <div class="w-8 h-8 flex items-center justify-center bg-[#E496A1] text-black rounded-full mx-auto">
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

    <div class="">
      <div class="container p-10 mx-auto bg-white border border-red-200 rounded-lg wapper-max">
        <div class="">
          <!-- Table Header -->
          <div class="flex items-center justify-between px-10 pb-4">
            <h2 class="font-semibold raleway-custom md:text-lg sm:text-base text-[12px] text-gray-700">Select Shipping
              Address</h2>
            <button class="text-[#8a2432] text-md font-light" @click="showBillingForm = true">
              + Add New Address
            </button>
          </div>

          <!-- Address List -->
          <div class="grid gap-4 max-h-[200px] overflow-y-auto">
            <div v-for="(address, index) in billingAddresses" :key="index"
              class="flex items-center justify-between px-10 pt-4 border-t">
              <!-- Billing Address -->
              <div class="flex items-start space-x-4">
                <input id="selectbilling" class="accent-[#8a2432] mt-2" type="radio" name="billingAddress"
                  :value="index" v-model="selectedBillingAddress" />
                <label class="block" for="selectbilling">
                  <p class="md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark">{{ address.first_name }} {{
                    address.last_name }}</p>
                  <p class="md:text-md sm:text-base text-[12px] nunito-sans-light text-gray-700">
                    {{ address.address }}, {{ address.city }}, {{ address.state }}, {{ address.country }} - {{
                      address.postal_code }}
                  </p>
                  <p class="md:text-md sm:text-base text-[12px] nunito-sans-light text-gray-700">{{ address.phone }}</p>
                </label>
              </div>

              <!-- Edit Button (Right Side) -->
              <div class="flex items-center">
                <button @click="editAddress('billing', index)" class="text-sm">
                  <i class="fa-regular fa-pen-to-square"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Modal for Add New Address -->
          <div v-if="showBillingForm" class="popup-backdrop" @click.self="closeBillingForm">
            <div class="p-12 bg-white rounded-lg popup-container">
              <div class="flex justify-between mb-10">
                <h3 class="md:text-lg lg:text-xl sm:text-base text-[12px] text-black nunito-sans-dark font-medium">Add
                  New Address</h3>
                <p @click="closeBillingForm"><i class="text-2xl fa-solid fa-xmark"></i></p>
              </div>
              <form @submit.prevent="submitBillingForm">
                <div class="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                  <div class="">
                    <label
                      class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">First
                      Name*</label>
                    <input v-model="billingForm.first_name" type="text" class="w-full p-2 border rounded-lg" required />
                  </div>
                  <div class="">
                    <label
                      class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Last
                      Name*</label>
                    <input v-model="billingForm.last_name" type="text" class="w-full p-2 border rounded-lg" required />
                  </div>
                </div>
                <div class="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                  <div class="">
                    <label
                      class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Email*</label>
                    <input v-model="billingForm.email" type="email" class="w-full p-2 border rounded-lg" required />
                  </div>
                  <div class="">
                    <label
                      class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Phone*</label>
                    <input v-model="billingForm.phone" type="tel" class="w-full p-2 border rounded-lg" required />
                  </div>
                </div>
                <div class="mb-4">
                  <label
                    class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Address*</label>
                  <input v-model="billingForm.address" type="text" class="w-full p-2 border rounded-lg" required />
                </div>
                <div class="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                  <div class="">
                    <label
                      class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">City*</label>
                    <input v-model="billingForm.city" type="text" class="w-full p-2 border rounded-lg" required />
                  </div>
                  <div class="">
                    <label
                      class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">State*</label>
                    <input v-model="billingForm.state" type="text" class="w-full p-2 border rounded-lg" required />
                  </div>
                </div>
                <div class="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                  <div class="">
                    <label
                      class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Postal
                      Code*</label>
                    <input v-model="billingForm.postal_code" type="text" class="w-full p-2 border rounded-lg"
                      required />
                  </div>
                  <div class="">
                    <label for="country"
                      class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Country*</label>
                    <select id="country" v-model="billingForm.country"
                      class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none" name="country" required>
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                    </select>
                  </div>
                </div>
                <div class="flex justify-between mt-10">
                  <div class="">
                    <input type="checkbox" class="mr-2 accent-[#8a2432]" id="defaultAddress" />
                    <label for="defaultAddress"
                      class="md:text-md sm:text-base text-[12px] nunito-sans-light text-gray-700">Set As Default
                      Shipping Address</label>
                  </div>
                  <button type="submit"
                    class="bg-[#8a2432] border md:text-lg lg:text-lg sm:text-base text-[12px] border-[#8a2432] text-white lg:py-3 md:py-3 sm:py-3 py-2 lg:px-5 md:px-4 sm:px-4 px-5 hover:border-[#8a2432] transition hover:bg-white hover:text-[#8a2432] nunito-sans-light">Save
                    Address</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pt-5">
      <div class="container p-10 mx-auto bg-white border border-red-200 rounded-lg wapper-max">
        <div class="">
          <!-- Table Header -->
          <div class="relative flex items-center justify-between px-10">
            <h2 class="font-semibold raleway-custom md:text-lg sm:text-base text-[12px] text-gray-700">Select Billing
              Address</h2>
            <button v-show="!sameAsBilling" class="text-[#8a2432] text-md font-light" @click="showShippingForm = true">
              + Add New Address
            </button>
          </div>

          <!-- Checkbox for "Same As Billing" -->
          <div class="px-10 pb-4 mt-3">
            <input type="checkbox" v-model="sameAsBilling" @change="copyBillingToShipping" class="mr-2 accent-[#8a2432]"
              id="sameAsBillingAddress" />
            <label for="sameAsBillingAddress"
              class="md:text-md sm:text-base text-[12px] nunito-sans-light text-gray-700">
              Shipping Address Same As Billing Address
            </label>
          </div>

          <!-- Shipping Address List (If 'Same as Billing' is not selected) -->
          <div class="grid gap-4 max-h-[200px] overflow-y-auto" v-show="!sameAsBilling">
            <div v-for="(address, index) in shippingAddresses" :key="index"
              class="flex items-center justify-between px-10 pt-4 border-t">
              <!-- Shipping Address -->
              <div class="flex items-start space-x-4">
                <input id="selectshipping" class="accent-[#8a2432]" type="radio" name="shippingAddress" :value="index"
                  v-model="selectedShippingAddress" />
                <label class="block" for="selectshipping">
                  <p class="md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark">{{ address.first_name }} {{
                    address.last_name }}</p>
                  <p class="md:text-md sm:text-base text-[12px] nunito-sans-light text-gray-700">
                    {{ address.address }}, {{ address.city }}, {{ address.state }}, {{ address.country }} - {{
                      address.postal_code }}
                  </p>
                  <p class="md:text-md sm:text-base text-[12px] nunito-sans-light text-gray-700">{{ address.phone }}</p>
                </label>
              </div>

              <!-- Edit Button (Right Side) -->
              <div class="flex items-center">
                <button @click="editAddress('shipping', index)" class="text-sm">
                  <i class="fa-regular fa-pen-to-square"></i>
                </button>
              </div>
            </div>
          </div>
          <!-- Modal for Add New Shipping Address -->
          <div v-if="showShippingForm" class="popup-backdrop" @click.self="closeShippingForm">
            <div class="p-12 bg-white rounded-lg popup-container">
              <div class="flex justify-between mb-10">
                <h3 class="md:text-lg lg:text-xl sm:text-base text-[12px] text-black nunito-sans-dark font-medium">Add
                  New Address</h3>
                <p @click="closeShippingForm"><i class="text-2xl fa-solid fa-xmark"></i></p>
              </div>
              <form class="" @submit.prevent="submitShippingForm">
                <div class="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                  <div class="">
                    <label
                      class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">First
                      Name</label>
                    <input v-model="shippingForm.first_name" type="text" class="w-full p-2 border rounded-lg"
                      required />
                  </div>
                  <div class="">
                    <label
                      class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Last
                      Name</label>
                    <input v-model="shippingForm.last_name" type="text" class="w-full p-2 border rounded-lg" required />
                  </div>
                </div>
                <div class="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                  <div class="">
                    <label
                      class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Email</label>
                    <input v-model="billingForm.email" type="email" class="w-full p-2 border rounded-lg" required />
                  </div>
                  <div class="">
                    <label
                      class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Phone</label>
                    <input v-model="billingForm.phone" type="tel" class="w-full p-2 border rounded-lg" required />
                  </div>
                </div>
                <div class="mb-4">
                  <label
                    class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Address</label>
                  <input v-model="shippingForm.address" type="text" class="w-full p-2 border rounded-lg" required />
                </div>
                <div class="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                  <div class="">
                    <label
                      class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">City</label>
                    <input v-model="shippingForm.city" type="text" class="w-full p-2 border rounded-lg" required />
                  </div>
                  <div class="">
                    <label
                      class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">State</label>
                    <input v-model="shippingForm.state" type="text" class="w-full p-2 border rounded-lg" required />
                  </div>
                </div>
                <div class="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                  <div class="">
                    <label
                      class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Postal
                      Code</label>
                    <input v-model="shippingForm.postal_code" type="text" class="w-full p-2 border rounded-lg"
                      required />
                  </div>
                  <div class="">
                    <label for="country"
                      class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Country</label>
                    <select id="country" v-model="shippingForm.country"
                      class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none" name="country" required>
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                    </select>
                  </div>
                </div>
                <div class="flex justify-between mt-10">
                  <div class="">
                    <input type="checkbox" class="mr-2 accent-[#8a2432]" id="defaultAddress" />
                    <label for="defaultAddress"
                      class="md:text-md sm:text-base text-[12px] nunito-sans-light text-gray-700">Set As Default Billing
                      Address</label>
                  </div>
                  <button type="submit"
                    class="bg-[#8a2432] border md:text-lg lg:text-lg sm:text-base text-[12px] border-[#8a2432] text-white lg:py-3 md:py-3 sm:py-3 py-2 lg:px-5 md:px-4 sm:px-4 px-5 hover:border-[#8a2432] transition hover:bg-white hover:text-[#8a2432] nunito-sans-light">Save
                    Address</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container pt-10 mx-auto wapper-max text-end">
      <a class="bg-[#8a2432] cursor-pointer border border-[#8a2432] text-white xl:py-3 lg:py-3 md:py-3 sm:py-3 py-2 xl:px-16 lg:px-6 md:px-4 sm:px-4 px-5 hover:border-[#8a2432] transition hover:bg-white hover:text-[#8a2432] nunito-sans-light md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-light text-gray-700"
        @click="redirectToReview">
        Next
      </a>
    </div>

    <!-- Edit Address Modal -->
    <div v-if="showEditModal" class="popup-backdrop" @click.self="closeEditModal">
      <div class="p-12 bg-white rounded-lg popup-container">
        <div class="flex justify-between mb-10">
          <h3 class="md:text-lg lg:text-xl sm:text-base text-[12px] text-black nunito-sans-dark font-medium">Edit
            Address</h3>
          <p @click="closeEditModal"><i class="text-2xl fa-solid fa-xmark"></i></p>
        </div>

        <form @submit.prevent="saveEditedAddress">
          <div class="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
            <div class="">
              <label class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">First
                Name*</label>
              <input v-model="editedAddress.first_name" type="text" class="w-full p-2 border rounded-lg" required />
            </div>
            <div class="">
              <label class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Last
                Name*</label>
              <input v-model="editedAddress.last_name" type="text" class="w-full p-2 border rounded-lg" required />
            </div>
          </div>
          <div class="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
            <div class="">
              <label
                class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Email*</label>
              <input v-model="editedAddress.email" type="email" class="w-full p-2 border rounded-lg" required />
            </div>
            <div class="">
              <label
                class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Phone*</label>
              <input v-model="editedAddress.phone" type="tel" class="w-full p-2 border rounded-lg" required />
            </div>
          </div>
          <div class="mb-4">
            <label
              class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Address*</label>
            <input v-model="editedAddress.address" type="text" class="w-full p-2 border rounded-lg" required />
          </div>
          <div class="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
            <div class="">
              <label
                class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">City*</label>
              <input v-model="editedAddress.city" type="text" class="w-full p-2 border rounded-lg" required />
            </div>
            <div class="">
              <label
                class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">State*</label>
              <input v-model="editedAddress.state" type="text" class="w-full p-2 border rounded-lg" required />
            </div>
          </div>
          <div class="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
            <div class="">
              <label class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Postal
                Code*</label>
              <input v-model="editedAddress.postal_code" type="text" class="w-full p-2 border rounded-lg" required />
            </div>
            <div class="">
              <label for="country"
                class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Country*</label>
              <select id="country" v-model="editedAddress.country"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none" name="country" required>
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
              </select>
            </div>
          </div>
          <div class="flex justify-end mt-5">
            <button type="submit"
              class="bg-[#8a2432] border md:text-lg lg:text-lg sm:text-base text-[12px] border-[#8a2432] text-white lg:py-3 md:py-3 sm:py-3 py-2 lg:px-5 md:px-4 sm:px-4 px-5 hover:border-[#8a2432] transition hover:bg-white hover:text-[#8a2432] nunito-sans-light">Save
              Changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export default {
  data() {
    return {
      showShippingForm: false,
      showBillingForm: false,
      loading: false,
      billingAddresses: [],
      shippingAddresses: [],
      selectedBillingAddress: null,
      selectedShippingAddress: null,
      sameAsBilling: true,

      // Forms
      billingForm: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
      },
      shippingForm: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
      },
    };
  },
  mounted() {
    this.fetchAddresses();
  },
  methods: {
    // Fetch addresses from API
    fetchAddresses() {
      this.loading = true;
      axios
        .get(`${this.baseURL()}/addresses`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        })
        .then((response) => {
          const addresses = response.data;
          this.billingAddresses = addresses.filter((address) => address.type === 'billing');
          this.shippingAddresses = addresses.filter((address) => address.type === 'shipping');
        })
        .catch((error) => {
          toastr.error("Error fetching addresses.", "Error");
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    // Redirect to the review page with query parameters
    redirectToReview() {
      if (this.selectedBillingAddress === null) {
        toastr.warning("Please select a billing address.", "Warning");
        return;
      }
      if (!this.sameAsBilling && this.selectedShippingAddress === null) {
        toastr.warning("Please select a shipping address.", "Warning");
        return;
      }

      const billingId = this.billingAddresses[this.selectedBillingAddress]?.id;
      const shippingId = this.sameAsBilling
        ? billingId
        : this.shippingAddresses[this.selectedShippingAddress]?.id;

      if (!billingId) {
        toastr.error("Invalid billing address selected.", "Error");
        return;
      }

      this.$router.push(`/cart/address/review-order?billing_id=${billingId}&shipping_id=${shippingId || ''}`);
    },

    // Toggle billing form
    toggleBillingForm() {
      this.showBillingForm = !this.showBillingForm;
    },

    // Toggle shipping form
    toggleShippingForm() {
      this.showShippingForm = !this.showShippingForm;
    },

    // Utility: Base API URL
    baseURL() {
      return "https://awa.gprlive.com/api";
    },
  },
};
</script>


<style scoped>
.popup-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-container {
  max-width: 800px;
  width: 100%;
}
</style>