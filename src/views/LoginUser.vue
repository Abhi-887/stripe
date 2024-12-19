<template>
  <div class="relative flex items-center justify-center min-h-screen">
    <!-- Background Image with Blur Effect -->
    <div class="absolute inset-0 bg-cover img_blur"
      :style="{ backgroundImage: `url(${require('@/assets/Login_page_BG_Blur.jpg')})` }"></div>

    <!-- Error Message Container -->
    <div class="error-message-container" v-if="errorMessage"
      style="position: absolute; top: 10%; left: 50%; transform: translateX(-50%); background-color: #f44336; color: white; padding: 10px 20px; z-index: 9999;">
      <p>{{ errorMessage }}</p>
    </div>

    <!-- Login Section -->
    <div class="absolute z-10 flex w-full max-w-5xl overflow-hidden bg-white shadow-lg">
      <!-- Login Section -->
      <div class="w-1/2 p-12">
        <h2 class="text-[28px] mb-6">Login</h2>

        <!-- Error Message -->
        <p v-if="errorMessage" class="mb-4 text-red-500 text-[14px]">{{ errorMessage }}</p>

        <!-- Email Input -->
        <input type="email" v-model="email"
          class="w-full border border-black px-3 py-2 mt-2 mb-4 nunito-sans-light text-[16px]" placeholder="Email"
          :class="{ 'border-red-500': emailError }" @blur="validateEmail" />
        <p v-if="emailError" class="text-red-500 text-sm">Please enter a valid email address.</p>

        <!-- Password Input -->
        <input type="password" v-model="password"
          class="w-full border border-black px-3 py-2 mt-2 mb-1 nunito-sans-light text-[16px]" placeholder="Password" />

<!-- Forgot Password -->
<div class="text-right text-[14px] nunito-sans-light text-[#7A7A7A] mb-6">
  <router-link to="/forgot-password" class="hover:underline">Forgot Password?</router-link>
</div>


        <!-- Login Button -->
        <button @click="login" class="w-full text-white py-2 mb-3 bg-[#8a2432]"
          :disabled="emailError || !email || !password">
          Login
        </button>

        <!-- Or Separator -->
        <div class="mb-3 text-center text-gray-500">Or</div>

        <!-- Login with Google Button -->

        <button class="flex items-center justify-center w-full ">
          <GoogleLogin :callback="googleLoginCallback" />

          <!-- <img src="/img/icons8-google 1.db350f4d.svg" alt="Google Login Icon" class="w-5 h-5 ml-2"> -->
        </button>

      </div>

      <!-- Right Section (Get Started) -->
      <div class="w-1/2 bg-[#F9F4F5] p-12">
        <h2 class="text-2xl text-[#8a2432] raleway-custom text-[28px] mb-6">New here? Get started</h2>

        <!-- Sell with Us -->
        <h3 class="text-[20px] text-black mb-2 raleway-custom">Sell with us</h3>
        <ul class="text-[#707070] text-[16px] nunito-sans-light list-disc pl-5 mb-4">
          <li>Lorem ipsum dolor</li>
          <li>Consectetur adipiscing elit</li>
          <li>Eiusmod tempor incididunt</li>
        </ul>

        <!-- Buy with Us -->
        <h3 class="text-[20px] text-black mb-2 raleway-custom">Buy with us</h3>
        <ul class="text-[#707070] text-[16px] nunito-sans-light list-disc pl-5 mb-6">
          <li>Lorem ipsum dolor</li>
          <li>Consectetur adipiscing elit eiusmod tempor</li>
          <li>Quis nostrud exercitation ullamco laboris nisi</li>
        </ul>

        <!-- Register Button with Click Event -->
        <button @click="redirectToRegister"
          class="w-full border border-[#8a2432] text-[#8a2432] py-2 hover:bg-[#8a2432] hover:text-white">
          Register Now
        </button>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <SiteFooter />
</template>
<script>
import apiClient from '@/axios';  // Import the centralized apiClient
import SiteFooter from '@/components/SiteFooter.vue';
import { decodeCredential } from 'vue3-google-login';

export default {
  components: {
    SiteFooter,
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '', // Error message state
      emailError: false,
    };
  },
  methods: {
    validateEmail() {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      this.emailError = !emailPattern.test(this.email); // Set error if email is invalid
    },
    async login() {
      this.validateEmail();

      if (this.emailError || !this.email || !this.password) {
        this.errorMessage = 'Please fill in both email and password with valid data.';
        return;
      }

      try {
        const response = await apiClient.post('login', {  // Use apiClient instead of axios
          email: this.email,
          password: this.password,
        });

        if (response.data.token) {
          sessionStorage.setItem('token', response.data.token);
          sessionStorage.setItem('user', JSON.stringify(response.data.user));
          this.$router.push({ name: 'DashboardPage' });
        }
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
      }
    },
    async googleLoginCallback(response) {
      try {
        const { credential: id_token } = response; // Extract the ID token

        // Decode the user details on the frontend
        const user = decodeCredential(id_token);
        console.log('Decoded User:', user);

        // Check if the email is verified
        if (user.email_verified) {
          // Use the centralized apiClient to validate the email with the backend
          const emailCheckResponse = await apiClient.post('check-email', {
            email: user.email,
          });

          if (emailCheckResponse.data.exists) {
            // Fetch the backend token for the user
            const tokenResponse = await apiClient.post('google-login', { email: user.email });

            if (tokenResponse.data.token) {
              // Store the token and user information in session storage
              sessionStorage.setItem('token', tokenResponse.data.token); // Backend token
              sessionStorage.setItem('user', JSON.stringify(user));      // Google user details

              // Redirect to the Dashboard
              this.$router.push({ name: 'DashboardPage' });
            } else {
              throw new Error('Failed to retrieve token.');
            }
          } else {
            this.errorMessage = 'Email not found in the system. Please sign up first.';
          }
        } else {
          this.errorMessage = 'Email verification failed. Please try again.';
        }
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
        console.error('Google Login Error:', error);
      }
    },
    redirectToRegister() {
      this.$router.push({ name: 'RegisterUser' });
    },
  },
};
</script>





<style scoped>
.container {
  max-width: 1280px;
}

.bg-cover {
  background-size: cover;
}

.error-message-container {
  display: none;
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  z-index: 9999;
}

.google-login-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 1px solid black; 
  padding: 0.5rem 0;
  color: #4a4a4a;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.google-login-button:hover {
  background-color: #f5f5f5;

}

.google-login-button img {
  margin-left: 0.5rem;

  width: 1.25rem;

  height: 1.25rem;

}
</style>
