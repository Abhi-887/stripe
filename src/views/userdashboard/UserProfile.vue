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
        <a href="#" class="text-[#3D3D3D]">Account</a>
      </li>
    </ol>
  </nav>


  <div class="flex wapper-max bg-grey container mx-auto  xl:px-4 lg:px-12 md:px-16 sm:px-5 px-5 min-h-screen">
    <UserDashboardSidebar />
    <main class="flex-1 px-12  py-6 bg-[#F9E7E966]">
      <div class="">
    <div class=" mx-auto rounded-lg  p-6">
      <!-- Profile Section -->
      <div class="border  bg-white  border-[#f8d7da] rounded-md p-6 mb-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-bold text-gray-800">Profile</h2>
          <button class="text-[#8a2432] hover:text-red-600">
            <i class="fas fa-edit"></i>
          </button>
        </div>
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <label class="block text-gray-500">First Name:</label>
            <p class="text-gray-800 font-semibold">William</p>
          </div>
          <div>
            <label class="block text-gray-500">Last Name:</label>
            <p class="text-gray-800 font-semibold">Wickman</p>
          </div>
          <div>
            <label class="block text-gray-500">Date of Birth:</label>
            <p class="text-gray-800 font-semibold">25-12-1990</p>
          </div>
          <div>
            <label class="block text-gray-500">Contact No.:</label>
            <p class="text-gray-800 font-semibold">1125 265 365</p>
          </div>
        </div>
      </div>

      <!-- Security Section -->
      <div class="border   bg-white  border-[#f8d7da] rounded-md p-6 mb-6">
        <h2 class="text-lg font-bold text-gray-800 mb-4">Security</h2>
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <label class="block text-gray-500">Email:</label>
            <p class="text-gray-800 font-semibold">william@gmail.com</p>
          </div>
          <div>
            <label class="block text-gray-500">Password:</label>
            <p class="text-gray-800 font-semibold">**********</p>
            <button class="text-[#8a2432] text-sm mt-1 hover:text-red-600">Reset Password</button>
          </div>
        </div>
      </div>

      <!-- Account Type Section -->
      <div class="border  bg-white  border-[#f8d7da] rounded-md p-6">
        <h2 class="text-lg font-bold text-gray-800 mb-4">Account Type</h2>
        <div class="flex items-center gap-6 text-sm">
          <div class="flex items-center">
            <input
              type="radio"
              id="buyer"
              name="accountType"
              value="buyer"
              class="form-radio text-[#8a2432]"
              checked
            />
            <label for="buyer" class="ml-2 text-gray-800">Buyer</label>
          </div>
          <div class="flex items-center">
            <input
              type="radio"
              id="seller"
              name="accountType"
              value="seller"
              class="form-radio text-[#8a2432]"
            />
            <label for="seller" class="ml-2 text-gray-800">Seller</label>
          </div>
        </div>
        <p class="text-sm text-gray-500 mt-4">
          <a href="#" class="text-[#8a2432] hover:underline">Contact us</a> to change your account type
        </p>
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
      user: {
        name: "", // Empty initially, will be filled from sessionStorage
        email: "", // Empty initially
        phone: "", // Empty initially
        currentAddress: "", // Empty initially
        deliveryAddress: "", // Empty initially
      },
      isEditing: false,
      fieldToEdit: "",
    };
  },
  created() {
    const userData = sessionStorage.getItem("user"); // Get user data from sessionStorage
    if (userData) {
      this.user = JSON.parse(userData); // Parse the user data and assign it to 'user'
    } else {
      this.$router.push({ name: "LoginUser" }); // Redirect to login if no user data is found
    }
  },
  methods: {
    editInfo(field) {
      this.fieldToEdit = field;
      this.isEditing = true;
    },
    cancelEdit() {
      this.isEditing = false;
      this.fieldToEdit = "";
    },
    saveEdit() {
      // Here, you would typically send the updated data to the server via an API call.
      this.isEditing = false;
      this.fieldToEdit = "";
      alert("Changes saved!");
    },
  },
};
</script>

<style scoped>
.bg-white {
  background-color: #ffffff;
}

button {
  transition: all 0.3s ease;
}

.wapper-max {
  max-width: 1536px !important;
}
</style>