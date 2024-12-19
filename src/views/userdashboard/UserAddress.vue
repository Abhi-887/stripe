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

  <div class="flex wapper-max bg-grey container mx-auto  xl:px-4 lg:px-12 md:px-16 sm:px-5 px-5 min-h-screen">
    <UserDashboardSidebar />
    <main class="flex-1 px-12 py-6 bg-[#F9E7E966]">
      <h1 class="text-3xl raleway-custom">Manage Addresses</h1>
      <p class="text-gray-500 nunito-sans-light mb-6">Manage your payment and billing addresses here.</p>

      <!-- Address List -->
      <div class="bg-white  rounded-md border border-[#E496A1]  p-6 mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl raleway-custom">My Addresses</h2>
          <button @click="addNewAddress" class="bg-[#8a2430] text-white py-2 px-4">
            + Add New Address
          </button>
        </div>

        <div class="space-y-6"> <!-- Increased space between address items -->
          <!-- Loop through addresses -->
          <div v-for="(address, index) in addresses" :key="index"
            class="flex justify-between items-center border-b border-gray-300 pb-4 mb-4">
            <div>
              <p class="nunito-sans-light">{{ address.first_name }} {{ address.last_name }}</p>
              <p class="nunito-sans-light text-gray-500">{{ address.street }}, {{ address.city }}, {{ address.state }},
                {{ address.zip }}</p>
              <p><span>Email:</span>{{ address.email }}</p>
              <p class="space-x-4 "><span>Phone:</span>{{ address.phone }}</p>
            </div>

            <div class="flex items-center space-x-4">
              <!-- Default Payment Address -->
              <label class="flex items-center">
                <input type="checkbox" v-model="selectedPaymentAddress" :value="address.id"
                  @change="handlePaymentAddressChange(address.id)" class="custom-checkbox"
                  :checked="selectedPaymentAddress === address.id" />
                <span class="ml-2 nunito-sans-light" style="color: grey;">Set as Payment Address</span>
              </label>

              <!-- Default Billing Address -->
              <label class="flex items-center">
                <input type="checkbox" v-model="selectedBillingAddress" :value="address.id"
                  @change="handleBillingAddressChange(address.id)" class="custom-checkbox"
                  :checked="selectedBillingAddress === address.id" />
                <span class="ml-2 nunito-sans-light" style="color: grey;">Set as Billing Address</span>
              </label>

              <!-- Edit Address Button -->
              <button @click="editAddress(index)" class="text-[#8a2430] nunito-sans-light hover:text-blue-700">
                <i class="fas fa-edit"></i> Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Address Modal (for adding/editing an address) -->
      <div v-if="isEditing" class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-6 max-w-3xl rounded-lg">
          <h2 class="text-xl nunito-sans-light mb-4 !font-semibold">{{ editMode ? 'Edit Address' : 'Add New Address' }}
          </h2>
          <div class="grid grid-cols-6 gap-4">
            <!-- First Row -->
            <div class="col-span-3">
              <label for="firstName" class="text-gray-600">First Name*</label>
              <input type="text" id="firstName" v-model="currentAddress.first_name" placeholder="First Name"
                class="border border-gray-300 p-2 mb-4 w-full mt-1 rounded-lg" />
            </div>
            <div class="col-span-3">
              <label for="lastName" class="text-gray-600">Last Name*</label>
              <input type="text" id="lastName" v-model="currentAddress.last_name" placeholder="Last Name"
                class="border border-gray-300 p-2 mb-4 w-full mt-1 rounded-lg" />
            </div>
            <div class="col-span-3">
              <label for="email" class="text-gray-600">Email*</label>
              <input type="email" id="email" v-model="currentAddress.email" placeholder="Email"
                class="border border-gray-300 p-2 mb-4 w-full mt-1 rounded-lg" />
            </div>
            <div class="col-span-3">
              <label for="phone" class="text-gray-600">Phone*</label>
              <input type="tel" id="phone" v-model="currentAddress.phone" placeholder="Phone"
                class="border border-gray-300 p-2 mb-4 w-full mt-1 rounded-lg" />
            </div>
          </div>

          <div class="grid grid-cols-6 gap-4">
            <!-- Second Row -->
            <div class="col-span-6">
              <label for="address" class="text-gray-600">Address*</label>
              <input type="text" id="address" v-model="currentAddress.address" placeholder="Address"
                class="border border-gray-300 p-2 mb-4 w-full mt-1 rounded-lg" />
            </div>
          </div>

          <div class="grid grid-cols-6 gap-4">
            <div class="col-span-3">
              <label for="city" class="text-gray-600">City*</label>
              <input type="text" id="city" v-model="currentAddress.city" placeholder="City"
                class="border border-gray-300 p-2 mb-4 w-full mt-1 rounded-lg" />
            </div>
            <div class="col-span-3">
              <label for="state" class="text-gray-600">State*</label>
              <input type="text" id="state" v-model="currentAddress.state" placeholder="State"
                class="border border-gray-300 p-2 mb-4 w-full mt-1 rounded-lg" />
            </div>
            <div class="col-span-3">
              <label for="postal_code" class="text-gray-600">Postal Code*</label>
              <input type="number" id="postal_code" v-model="currentAddress.postal_code" placeholder="Postal Code"
                class="border border-gray-300 p-2 mb-4 w-full mt-1 rounded-lg" />
            </div>
            <div class="col-span-3">
              <label for="country" class="text-gray-600">Country*</label>
              <select id="country" v-model="currentAddress.country"
                class="border border-gray-300 p-2 mb-4 w-full mt-1 rounded-lg">
                <option value="" disabled>Select Country</option>
                <option value="UK">UK</option>
                <option value="US">US</option>
                <option value="EU">EU</option>
              </select>

            </div>
          </div>

          <div class="flex justify-end gap-2">
            <button @click="cancelEdit" class="bg-white border-black border nunito-sans-light text-black px-8 py-2">
              Cancel
            </button>
            <button @click="saveAddress" class="bg-[#8a2430] nunito-sans-light text-white px-8 py-2">
              Save
            </button>
          </div>
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
      addresses: [
        { id: 1, first_name: "John", last_name: "Doe", email: "mailto:deo@gmail.com",phone: "0000000000", street: "123 Main St", city: "Cityville", state: "Stateville", zip: "12345" },
        { id: 2, first_name: "Jane ", last_name: "Smith", email: "mailto:deo@gmail.com",phone: "0000000000", street: "456 Oak St", city: "Townsville", state: "Countyville", zip: "67890" },
        { id: 3, first_name: "Michael ", last_name: "Johnson", email: "mailto:deo@gmail.com",phone: "0000000000", street: "789 Pine St", city: "Lakeview", state: "Riverside", zip: "23456" },
        { id: 4, first_name: "Emily ", last_name: "Davis", email: "mailto:deo@gmail.com",phone: "0000000000", street: "101 Maple St", city: "Hilltop", state: "Greenwood", zip: "34567" },
        { id: 5, first_name: "David ", last_name: "Williams", email: "mailto:deo@gmail.com",phone: "0000000000", street: "202 Birch St", city: "Mountainview", state: "Lakeside", zip: "45678" },
        { id: 6, first_name: "Sarah ", last_name: "Miller", email: "mailto:deo@gmail.com",phone: "0000000000", street: "303 Cedar St", city: "Riverdale", state: "Pleasantville", zip: "56789" },
        { id: 7, first_name: "James ", last_name: "Brown", email: "mailto:deo@gmail.com",phone: "0000000000", street: "404 Elm St", city: "Sunset", state: "Clearwater", zip: "67801" },
        { id: 8, first_name: "Sophia ", last_name: "Wilson", email: "mailto:deo@gmail.com",phone: "0000000000", street: "505 Willow St", city: "Seaside", state: "Oceanside", zip: "78912" }
      ],
      selectedPaymentAddress: null, // Only one payment address can be selected
      selectedBillingAddress: null, // Only one billing address can be selected
      currentAddress: {
        name: "",
        street: "",
        city: "",
        state: "",
        zip: "",
      },
      isEditing: false,
      editMode: false,
      editIndex: null,
    };
  },
  methods: {
    editAddress(index) {
      this.editMode = true;
      this.isEditing = true;
      this.currentAddress = { ...this.addresses[index] };
      this.editIndex = index;
    },
    addNewAddress() {
      this.editMode = false;
      this.isEditing = true;
      this.currentAddress = {
        name: "",
        street: "",
        city: "",
        state: "",
        zip: "",
      };
      this.editIndex = null;
    },
    cancelEdit() {
      this.isEditing = false;
      this.editMode = false;
      this.currentAddress = {
        name: "",
        street: "",
        city: "",
        state: "",
        zip: "",
      };
    },
    saveAddress() {
      if (this.editMode) {
        if (this.editIndex !== null) {
          // Update existing address
          this.addresses[this.editIndex] = { ...this.currentAddress };
        } else {
          // Add new address
          const newId = this.addresses.length + 1;
          this.addresses.push({ ...this.currentAddress, id: newId });
        }
        this.cancelEdit();
      }
    },
    handlePaymentAddressChange(id) {
      // Ensure only one payment address is selected
      if (this.selectedPaymentAddress !== id) {
        this.selectedPaymentAddress = id;
      } else {
        this.selectedPaymentAddress = null; // Deselect if clicked again
      }
    },
    handleBillingAddressChange(id) {
      // Ensure only one billing address is selected
      if (this.selectedBillingAddress !== id) {
        this.selectedBillingAddress = id;
      } else {
        this.selectedBillingAddress = null; // Deselect if clicked again
      }
    },
  },
};
</script>

<style scoped>
button {
  transition: all 0.3s ease;
}




.wapper-max {
  max-width: 1536px !important;
}

.custom-checkbox {
  appearance: none;
  width: 16px;
  height: 16px;
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
  left: 4px;
  top: 0px;
  width: 6px;
  height: 12px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
</style>
