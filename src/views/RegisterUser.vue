<template>
  <div class="bg-white min-h-screen">
    <!-- Notification Bar -->
    <div class="bg-[#f3e9ea] py-2">
      <div class="container mx-auto xl:px-4 lg:px-12 md:px-16 sm:px-5 px-5">
        <div class="grid grid-cols-1 gap-4 text-center">
          <div class="flex items-center justify-center hover:text-black transition-colors duration-300">
            <p class="md:text-lg flex sm:items-center lg:text-lg sm:text-base text-[12px] nunito-sans-light">
              <span>
                <img src="@/assets/Notification.svg" alt="Notification Icon" class="sm:w-3.5 w-3 sm:mt-0 mt-0.5 sm:mr-2 mr-1" />
              </span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Registration Form -->
    <div class="container mx-auto px-5 py-16">
      <h2 class="text-[24px] raleway-custom uppercase mb-6">Register Your Account</h2>
      
      <!-- Success Message -->
      <div v-if="registrationSuccess" class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
        <strong>Registration successful!</strong> You will be redirected shortly.
      </div>

      <form @submit.prevent="handleRegister" class="grid grid-cols-2 gap-4">
        <!-- Left Column (Input Fields) -->
        <div class="col-span-2 md:col-span-1 pe-5">
          <label for="first-name" class="block nunito-sans-light pb-1">First Name *</label>
          <input type="text" id="first-name" v-model="form.first_name" class="w-full h-12 border border-black px-3 py-2 mb-4" required />

          <label for="email" class="block nunito-sans-light pb-1">Email *</label>
          <input 
            type="email" 
            id="email" 
            v-model="form.email" 
            class="w-full h-12 border border-black px-3 py-2 mb-4" 
            required 
            :class="{'border-red-500': emailError}" 
            @blur="validateEmail"
          />
          <p v-if="emailError" class="text-red-500 text-xs">Please enter a valid email address.</p>

          <label for="password" class="block nunito-sans-light pb-1">Password *</label>
          <div class="relative">
            <input 
              :type="showPassword ? 'text' : 'password'" 
              id="password" 
              v-model="form.password" 
              class="w-full h-12 border border-black px-3 py-2 mb-4 pr-10" 
              required 
              :class="{'border-red-500': passwordError}" 
              @blur="validatePassword"
            />
            <img 
              src="@/assets/eye-open.svg" 
              alt="Toggle Password Visibility" 
              @click="togglePasswordVisibility" 
              class="absolute top-1/3 right-3 transform -translate-y-1/2 cursor-pointer" 
            />
          </div>
          <p v-if="passwordError" class="text-red-500 text-xs">Password must be at least 6 characters.</p>

          <label for="dob" class="block nunito-sans-light pb-1">Date of Birth *</label>
          <input type="date" id="dob" v-model="form.dob" class="w-full h-12 border border-black text-[#B8B8B8] px-3 py-2 mb-4" required />
        </div>

        <!-- Right Column (Confirm Password & Checkboxes) -->
        <div class="col-span-2 md:col-span-1 ps-5">
          <label for="last-name" class="block nunito-sans-light pb-1">Last Name *</label>
          <input type="text" id="last-name" v-model="form.last_name" class="w-full h-12 border border-black px-3 py-2 mb-4" required />

          <label for="contact-number" class="block nunito-sans-light pb-1">Contact Number *</label>
          <input 
            type="text" 
            id="contact-number" 
            v-model="form.contact_number" 
            class="w-full h-12 border border-black px-3 py-2 mb-4" 
            required 
            :class="{'border-red-500': phoneError}" 
            @blur="validatePhoneNumber"
          />
          <p v-if="phoneError" class="text-red-500 text-xs">Phone number must be 10 digits long.</p>

          <label for="confirm-password" class="block nunito-sans-light pb-1">Confirm Password *</label>
          <div class="relative">
            <input 
              :type="showConfirmPassword ? 'text' : 'password'" 
              id="confirm-password" 
              v-model="form.confirm_password" 
              class="w-full h-12 border border-black px-3 py-2 mb-4 pr-10" 
              required 
              :class="{'border-red-500': confirmPasswordError}" 
              @blur="validateConfirmPassword"
            />
            <img 
              src="@/assets/eye-open.svg" 
              alt="Toggle Confirm Password Visibility" 
              @click="toggleConfirmPasswordVisibility" 
              class="absolute top-1/3 right-3 transform -translate-y-1/2 cursor-pointer" 
            />
          </div>
          <p v-if="confirmPasswordError" class="text-red-500 text-xs">Passwords do not match.</p>

          <!-- Checkbox Section -->
          <div class="mt-7">
            <div class="flex items-center gap-2">
              <input type="checkbox" v-model="form.sell" id="sell" class="custom-checkbox" />
              <label for="sell" class="text-[12px] leading-3">I want to sell</label>
            </div>
            <div class="flex items-center gap-2 mt-2">
              <input type="checkbox" v-model="form.newsletter" id="newsletter" class="custom-checkbox" />
              <label for="newsletter" class="text-[12px] leading-3">Subscribe to our Newsletter</label>
            </div>
            <div class="flex items-center gap-2 mt-2">
              <input type="checkbox" v-model="form.agree" id="terms" class="custom-checkbox" />
              <label for="terms" class="text-[12px] leading-3">
                Please confirm that you have read & agree to our
                <a href="#" class="text-[#8a2432]">Terms & Conditions</a>
              </label>
              <p v-if="checkboxError" class="text-red-500 text-xs">You must agree to the Terms & Conditions to proceed.</p>
            </div>
            <p class="text-black text-[12px] mt-8">
              One-time Registration Fee of $10 will be applicable.
            </p>
            <button type="submit" class="w-full h-12 bg-[#8a2432] text-white py-2 mt-2">
              Register
            </button>
          </div>
        </div>
      </form>
    </div>

    <!-- Footer -->
    <SiteFooter />
  </div>
</template>

<script>
import apiClient from '@/axios';  // Import the centralized axios instance
import SiteFooter from '@/components/SiteFooter.vue';

export default {
  components: {
    SiteFooter,
  },
  data() {
    return {
      showPassword: false,
      showConfirmPassword: false,
      form: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
        dob: '',
        contact_number: '',
        sell: false,
        newsletter: false,
        agree: false,
      },
      registrationSuccess: false,
      emailError: false,
      passwordError: false,
      phoneError: false,
      confirmPasswordError: false,
      checkboxError: false, // For checkbox validation error
    };
  },
  methods: {
    // Toggle visibility for password field
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    // Toggle visibility for confirm password field
    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
    
    // Validate email format
    validateEmail() {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zAZ]{2,6}$/;
      this.emailError = !regex.test(this.form.email);
    },

    // Validate phone number (should be exactly 10 digits)
    validatePhoneNumber() {
      this.phoneError = this.form.contact_number.length !== 10 || isNaN(this.form.contact_number);
    },
    
    // Validate password (at least 6 characters)
    validatePassword() {
      this.passwordError = this.form.password.length < 6;
    },

    // Validate confirm password (must match the password)
    validateConfirmPassword() {
      this.confirmPasswordError = this.form.password !== this.form.confirm_password;
    },
    
    // Handle form submission and validation
    handleRegister() {
      // Validate that the checkbox is checked
      if (!this.form.agree) {
        this.checkboxError = true;
        return;
      } else {
        this.checkboxError = false;
      }

      // Validate form fields
      this.validateEmail();
      this.validatePhoneNumber();
      this.validatePassword();
      this.validateConfirmPassword();

      // Check if there are any validation errors
      if (this.emailError || this.phoneError || this.passwordError || this.confirmPasswordError) {
        alert("Please fix the errors in the form before submitting.");
        return;
      }

      // Submit registration data to the server using the centralized API client
      apiClient.post('/register', this.form)  // Use apiClient here
        .then(() => {
          this.registrationSuccess = true;

          // Redirect after successful registration
          setTimeout(() => {
            this.$router.push({ name: 'RegisterPayment' });
          }, 2000);
        })
        .catch(error => {
          console.error(error.response ? error.response.data : error);
          alert('Registration failed. Please check your input.');
        });
    },
  },
};
</script>


<style scoped>
/* Optional: Style for checkbox error message */
.text-red-500 {
  color: #f56565;
}

.custom-checkbox {
  appearance: none;
  width: 12px;
  height: 12px;
  border: 1px solid #8A2432;
  background-color: white;
  cursor: pointer;
  outline: none;
  position: relative;
}

.custom-checkbox:checked {
  background-color: #8A2432;
}

.custom-checkbox:checked::after {
  content: '';
  position: absolute;
  left: 4px;
  top: -1px;
  width: 4px;
  height: 10px;
  border: solid white;
  border-width: 0 1px 1px 0;
  transform: rotate(45deg);
}
</style>
