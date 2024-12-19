<template>
  <div class="relative flex items-center justify-center min-h-screen">
    <!-- Background Image with Blur Effect -->
    <div class="absolute inset-0 bg-cover img_blur"
      :style="{ backgroundImage: `url(${require('@/assets/Login_page_BG_Blur.jpg')})` }"></div>

    <!-- Error Message Container -->
    <div v-if="errorMessage"
      class="absolute top-10 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50">
      <p>{{ errorMessage }}</p>
    </div>

    <!-- Forgot Password Section -->
    <div class="absolute z-10 flex w-full max-w-5xl overflow-hidden bg-white shadow-lg">
      <!-- Left Section (Reset Password Form) -->
      <div class="w-full md:w-1/2 p-8 sm:p-12">
        <h2 class="text-2xl font-semibold mb-6">Forgot Password</h2>

        <!-- Email Input -->
        <div class="mb-4">
          <p v-if="emailError" class="mt-1 text-red-500 text-sm">Please enter a valid email address.</p>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input type="email" id="email" v-model="email"
            class="w-full border border-gray-300 px-3 py-2 rounded text-base focus:outline-none focus:ring-2 focus:ring-[#8a2432]"
            placeholder="Enter your email"
            :class="{ 'border-red-500 focus:ring-red-500': emailError }"
            @blur="validateEmail" />
        
        </div>

        <!-- Reset Password Button -->
        <button @click="resetPassword"
          class="w-full py-2 rounded bg-[#8a2432] text-white hover:bg-[#721e2b] disabled:opacity-50"
          :disabled="emailError || !email">
          Reset Password
        </button>

        <!-- Login Link -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            <router-link to="/login" class="text-[#8a2432] hover:underline">Back to Login</router-link>
          </p>
        </div>
      </div>

      <!-- Right Section (Information About Service) -->
      <div class="hidden md:block w-1/2 bg-[#F9F4F5] p-8 sm:p-12">
        <h3 class="text-xl font-semibold text-black mb-4">Forgot your password?</h3>
        <p class="text-gray-600 mb-4">If you've forgotten your password, don't worry! Just follow these simple steps:</p>
        <ul class="text-gray-600 list-decimal pl-5">
          <li>Click on the "Forgot Password" link on the login page.</li>
          <li>Enter your registered email address.</li>
          <li>Check your email inbox for a password reset link.</li>
          <li>Click the link and follow the instructions to create a new password.</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      errorMessage: '',
      emailError: false
    };
  },
  methods: {
    // Validate email format
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = !emailPattern.test(this.email);
      if (this.emailError) {
        this.errorMessage = 'Invalid email format.';
      } else {
        this.errorMessage = '';
      }
    },

    // Handle password reset
    resetPassword() {
      if (!this.emailError && this.email) {
        console.log('Password reset for email:', this.email);
        this.email = '';
        this.errorMessage = 'Password reset email sent!';
        setTimeout(() => {
          this.errorMessage = '';
        }, 5000); // Clear message after 5 seconds
      }
    }
  }
};
</script>

<style scoped>
.img_blur {
  filter: blur(5px);
}

button:disabled {
  cursor: not-allowed;
}
</style>
