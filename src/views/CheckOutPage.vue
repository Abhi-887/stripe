<template>
  <div class="bg-[#f9f5f6] pb-5">
    <!-- Breadcrumb Navigation -->
    <div class="text-sm container mx-auto xl:px-4 lg:px-12 md:px-16 sm:px-8 px-5 py-8 text-gray-600">
      <nav aria-label="Breadcrumb nunito-sans-light">
        <ol class="list-reset flex">
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
        <div class="flex justify-between items-center">
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
      <div class="container wapper-max mx-auto border border-red-200 rounded-lg p-10 bg-white">
        <div class="">
          <!-- Table Header -->
          <div class="flex justify-between items-center px-10 pb-4">
            <h2 class="font-semibold raleway-custom md:text-lg sm:text-base text-[12px] text-gray-700">Select Shipping
              Address</h2>
            <button class="text-[#8a2432] text-md font-light" @click="showBillingForm = true">
              + Add New Address
            </button>
          </div>

          <!-- Address List -->
          <div class="grid gap-4 max-h-[200px] overflow-y-auto">
            <div v-for="(address, index) in billingAddresses" :key="index"
              class="flex items-center justify-between border-t pt-4 px-10">
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
            <div class="popup-container bg-white rounded-lg p-12">
              <div class="flex justify-between mb-10">
                <h3 class="md:text-lg lg:text-xl sm:text-base text-[12px] text-black nunito-sans-dark font-medium">Add
                  New Address</h3>
                <p @click="closeBillingForm"><i class="fa-solid fa-xmark text-2xl"></i></p>
              </div>
              <form @submit.prevent="submitBillingForm">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div class="">
                    <label
                      class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">First
                      Name*</label>
                    <input v-model="billingForm.first_name" type="text" class="w-full border p-2 rounded-lg" required />
                  </div>
                  <div class="">
                    <label
                      class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Last
                      Name*</label>
                    <input v-model="billingForm.last_name" type="text" class="w-full border p-2 rounded-lg" required />
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div class="">
                    <label
                      class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Email*</label>
                    <input v-model="billingForm.email" type="email" class="w-full border p-2 rounded-lg" required />
                  </div>
                  <div class="">
                    <label
                      class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Phone*</label>
                    <input v-model="billingForm.phone" type="tel" class="w-full border p-2 rounded-lg" required />
                  </div>
                </div>
                <div class="mb-4">
                  <label
                    class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Address*</label>
                  <input v-model="billingForm.address" type="text" class="w-full border p-2 rounded-lg" required />
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div class="">
                    <label
                      class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">City*</label>
                    <input v-model="billingForm.city" type="text" class="w-full border p-2 rounded-lg" required />
                  </div>
                  <div class="">
                    <label
                      class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">State*</label>
                    <input v-model="billingForm.state" type="text" class="w-full border p-2 rounded-lg" required />
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div class="">
                    <label
                      class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Postal
                      Code*</label>
                    <input v-model="billingForm.postal_code" type="text" class="w-full border p-2 rounded-lg"
                      required />
                  </div>
                  <div class="">
                    <label for="country"
                      class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Country*</label>
                    <select id="country" v-model="billingForm.country"
                      class="w-full border border-gray-300 p-3 rounded-lg focus:outline-none" name="country" required>
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
      <div class="container wapper-max mx-auto border border-red-200 rounded-lg p-10 bg-white">
        <div class="">
          <!-- Table Header -->
          <div class="flex justify-between items-center px-10 relative">
            <h2 class="font-semibold raleway-custom md:text-lg sm:text-base text-[12px] text-gray-700">Select Billing
              Address</h2>
            <button v-show="!sameAsBilling" class="text-[#8a2432] text-md font-light" @click="showShippingForm = true">
              + Add New Address
            </button>
          </div>

          <!-- Checkbox for "Same As Billing" -->
          <div class="mt-3 px-10 pb-4">
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
              class="flex items-center justify-between border-t pt-4 px-10">
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
            <div class="popup-container bg-white rounded-lg p-12">
              <div class="flex justify-between mb-10">
                <h3 class="md:text-lg lg:text-xl sm:text-base text-[12px] text-black nunito-sans-dark font-medium">Add
                  New Address</h3>
                <p @click="closeShippingForm"><i class="fa-solid fa-xmark text-2xl"></i></p>
              </div>
              <form class="" @submit.prevent="submitShippingForm">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div class="">
                    <label
                      class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">First
                      Name</label>
                    <input v-model="shippingForm.first_name" type="text" class="w-full border p-2  rounded-lg"
                      required />
                  </div>
                  <div class="">
                    <label
                      class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Last
                      Name</label>
                    <input v-model="shippingForm.last_name" type="text" class="w-full border p-2  rounded-lg"
                      required />
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div class="">
                    <label
                      class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Email</label>
                    <input v-model="billingForm.email" type="email" class="w-full border p-2  rounded-lg" required />
                  </div>
                  <div class="">
                    <label
                      class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Phone</label>
                    <input v-model="billingForm.phone" type="tel" class="w-full border p-2  rounded-lg" required />
                  </div>
                </div>
                <div class="mb-4">
                  <label
                    class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Address</label>
                  <input v-model="shippingForm.address" type="text" class="w-full border p-2  rounded-lg" required />
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div class="">
                    <label
                      class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">City</label>
                    <input v-model="shippingForm.city" type="text" class="w-full border p-2  rounded-lg" required />
                  </div>
                  <div class="">
                    <label
                      class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">State</label>
                    <input v-model="shippingForm.state" type="text" class="w-full border p-2  rounded-lg" required />
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div class="">
                    <label
                      class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Postal
                      Code</label>
                    <input v-model="shippingForm.postal_code" type="text" class="w-full border p-2  rounded-lg"
                      required />
                  </div>
                  <div class="">
                    <label for="country"
                      class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Country</label>
                    <select id="country" v-model="shippingForm.country"
                      class="w-full border border-gray-300 p-3 focus:outline-none rounded-lg" name="country" required>
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

    <div class="container wapper-max mx-auto pt-10 text-end">
      <a class="bg-[#8a2432] cursor-pointer border border-[#8a2432] text-white xl:py-3 lg:py-3 md:py-3 sm:py-3 py-2 xl:px-16 lg:px-6 md:px-4 sm:px-4 px-5 hover:border-[#8a2432] transition hover:bg-white hover:text-[#8a2432] nunito-sans-light md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-light text-gray-700"
        @click="redirectToReview">
        Next
      </a>
    </div>

    <!-- Edit Address Modal -->
    <div v-if="showEditModal" class="popup-backdrop" @click.self="closeEditModal">
      <div class="popup-container bg-white rounded-lg p-12">
        <div class="flex justify-between mb-10">
          <h3 class="md:text-lg lg:text-xl sm:text-base text-[12px] text-black nunito-sans-dark font-medium">Edit
            Address</h3>
          <p @click="closeEditModal"><i class="fa-solid fa-xmark text-2xl"></i></p>
        </div>

        <form @submit.prevent="saveEditedAddress">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="">
              <label class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">First
                Name*</label>
              <input v-model="editedAddress.first_name" type="text" class="w-full border p-2  rounded-lg" required />
            </div>
            <div class="">
              <label class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Last
                Name*</label>
              <input v-model="editedAddress.last_name" type="text" class="w-full border p-2  rounded-lg" required />
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="">
              <label
                class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Email*</label>
              <input v-model="editedAddress.email" type="email" class="w-full border p-2  rounded-lg" required />
            </div>
            <div class="">
              <label
                class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Phone*</label>
              <input v-model="editedAddress.phone" type="tel" class="w-full border p-2  rounded-lg" required />
            </div>
          </div>
          <div class="mb-4">
            <label
              class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Address*</label>
            <input v-model="editedAddress.address" type="text" class="w-full border p-2  rounded-lg" required />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="">
              <label
                class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">City*</label>
              <input v-model="editedAddress.city" type="text" class="w-full border p-2  rounded-lg" required />
            </div>
            <div class="">
              <label
                class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">State*</label>
              <input v-model="editedAddress.state" type="text" class="w-full border p-2  rounded-lg" required />
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="">
              <label class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Postal
                Code*</label>
              <input v-model="editedAddress.postal_code" type="text" class="w-full border p-2 rounded-lg" required />
            </div>
            <div class="">
              <label for="country"
                class="block md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-dark text-gray-700">Country*</label>
              <select id="country" v-model="editedAddress.country"
                class="w-full border border-gray-300 p-3 focus:outline-none rounded-lg" name="country" required>
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
      loading: false, // Added: Loading state
      // Address Lists
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
      // Address Editing
      editedAddress: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        postal_code: "",
        country: ""
      },
      addressTypeToEdit: '',
      addressIndexToEdit: null,
      showEditModal: false,
    };
  },
  mounted() {
    this.fetchAddresses();
    this.loadSelectedAddresses(); // Load data from localStorage
  },
  methods: {
    openEditModal() {
      this.showEditModal = true;
    },
    closeBillingForm() {
      this.showBillingForm = false;
    },
    closeShippingForm() {
      this.showShippingForm = false;
    },
    closeEditModal() {
      this.showEditModal = false;
    },
    redirectToReview() {
      if (!this.selectedBillingAddress && this.selectedBillingAddress !== 0) {
        this.showWarningToast("Please select a billing address.");
        return;
      }

      if (!this.sameAsBilling && (!this.selectedShippingAddress && this.selectedShippingAddress !== 0)) {
        this.showWarningToast("Please select a shipping address.");
        return;
      }
      // Save the selected addresses to localStorage
      this.saveSelectedAddresses();

      // Proceed to the review page
      this.$router.push('/cart/address/review-order'); // Update the route as needed
    },
    copyBillingToShipping() {
      if (this.sameAsBilling) {
        this.selectedShippingAddress = this.selectedBillingAddress;
      } else {
        this.selectedShippingAddress = null; // Clear shipping address when unchecked
      }
    },

    // Save selected addresses to localStorage
    saveSelectedAddresses() {
      const data = {
        selectedBillingAddress: this.billingAddresses[this.selectedBillingAddress],
        selectedShippingAddress: this.sameAsBilling
          ? this.billingAddresses[this.selectedBillingAddress]
          : this.shippingAddresses[this.selectedShippingAddress],
      };
      localStorage.setItem("checkoutAddresses", JSON.stringify(data));
      toastr.success("Addresses saved for checkout!", "Success");
    },

    // Load selected addresses from localStorage
    loadSelectedAddresses() {
      const storedData = localStorage.getItem("checkoutAddresses");
      if (storedData) {
        const parsedData = JSON.parse(storedData);

        // Match addresses by ID
        this.selectedBillingAddress = this.billingAddresses.findIndex(
          (address) => address.id === parsedData.selectedBillingAddress.id
        );
        this.selectedShippingAddress = this.shippingAddresses.findIndex(
          (address) => address.id === parsedData.selectedShippingAddress.id
        );
      }
    },


    // Fetch Addresses from API
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

          // Ensure selected addresses are loaded after fetching
          this.loadSelectedAddresses();
        })
        .catch((error) => {
          toastr.error("Error fetching addresses.", "Error");
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    }
    ,

    // Toggle Billing Form
    toggleBillingForm() {
      this.showBillingForm = !this.showBillingForm;
    },

    // Toggle Shipping Form
    toggleShippingForm() {
      this.showShippingForm = !this.showShippingForm;
    },

    // Toast Method
    showWarningToast(message) {
      toastr.warning(message);
    },

    // Utility Method: Base API URL
    baseURL() {
      return "https://awa.gprlive.com/api";
    },

    // Submit Billing Form
    submitBillingForm() {
      if (this.validateAddressForm(this.billingForm)) {
        axios
          .post(
            `${this.baseURL()}/addresses`,
            { ...this.billingForm, type: 'billing' },
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
              },
            }
          )
          .then((response) => {
            this.billingAddresses.push(response.data);
            this.resetForm(this.billingForm);
            this.showBillingForm = false;
            toastr.success('Billing address saved successfully!', 'Success');
          })
          .catch((error) => {
            toastr.error('Error saving billing address.', 'Error');
            console.error(error);
          });
      } else {
        toastr.warning('Please fill out all billing address fields.', 'Warning');
      }
    },

    // Submit Shipping Form
    submitShippingForm() {
      if (this.sameAsBilling) {
        if (this.selectedBillingAddress !== null) {
          const billingAddress = this.billingAddresses[this.selectedBillingAddress];
          const shippingAddress = { ...billingAddress, type: 'shipping' };
          this.shippingAddresses.push(shippingAddress);
          this.resetForm(this.shippingForm);
          this.showShippingForm = false;
          toastr.success('Shipping address saved as same as billing address!', 'Success');
        } else {
          toastr.warning('Please select a billing address first.', 'Warning');
        }
      } else {
        if (this.validateAddressForm(this.shippingForm)) {
          axios
            .post(
              `${this.baseURL()}/addresses`,
              { ...this.shippingForm, type: 'shipping' },
              {
                headers: {
                  Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
              }
            )
            .then((response) => {
              this.shippingAddresses.push(response.data);
              this.resetForm(this.shippingForm);
              this.showShippingForm = false;
              toastr.success('Shipping address saved successfully!', 'Success');
            })
            .catch((error) => {
              toastr.error('Error saving shipping address.', 'Error');
              console.error(error);
            });
        } else {
          toastr.warning('Please fill out all required shipping address fields correctly.', 'Warning');
        }
      }
    },

    // Validate Address Form
    validateAddressForm(form) {
      const requiredFields = [
        "first_name",
        "last_name",
        "email",
        "phone",
        "address",
        "city",
        "state",
        "postal_code",
        "country",
      ];

      for (const field of requiredFields) {
        if (!form[field] || form[field].trim() === "") {
          console.error(`Missing field: ${field}`);
          toastr.warning(`Missing field: ${field}`, 'Warning');
          return false;
        }
      }

      return true;
    },

    // Reset Form Helper
    resetForm(form) {
      for (const key in form) {
        form[key] = "";
      }
    },
    // Edit Address Method
    editAddress(type, index) {
      this.addressTypeToEdit = type;
      this.addressIndexToEdit = index;
      if (type === 'billing') {
        this.editedAddress = { ...this.billingAddresses[index] };
      } else if (type === 'shipping') {
        this.editedAddress = { ...this.shippingAddresses[index] };
      }
      this.showEditModal = true;
    },

    // Save Edited Address
    saveEditedAddress() {
      const addressToUpdate = this.editedAddress;
      axios.put(`${this.baseURL()}/addresses/${addressToUpdate.id}`, addressToUpdate, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        }
      })
        .then(response => {
          if (this.addressTypeToEdit === 'billing') {
            this.billingAddresses[this.addressIndexToEdit] = response.data;
          } else {
            this.shippingAddresses[this.addressIndexToEdit] = response.data;
          }

          this.$nextTick(() => {
            this.showEditModal = false;
            toastr.success('Address updated successfully!', 'Success');
          });
        })
        .catch(error => {
          toastr.error('Error updating address.', 'Error');
          console.error(error);
        });
    }
    ,

    // Delete Address
    deleteAddress(type, index) {
      const addressId = type === 'billing' ? this.billingAddresses[index].id : this.shippingAddresses[index].id;
      axios.delete(`${this.baseURL()}/addresses/${addressId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        }
      })
        .then(() => {
          if (type === 'billing') {
            this.billingAddresses.splice(index, 1);
          } else {
            this.shippingAddresses.splice(index, 1);
          }
          toastr.success('Address deleted successfully!', 'Success');
        })
        .catch(error => {
          toastr.error('Error deleting address.', 'Error');
          console.error(error);
        });
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