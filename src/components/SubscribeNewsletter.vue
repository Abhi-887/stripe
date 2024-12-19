<template>
  <section class="subscribe-newsletter sm:py-20 py-4 bg-gray-100">
    <div class="wapper mx-auto">
    <!-- Container with padding -->
    <div class="container  px-6 py-12"> <!-- Added container and px-4 for padding -->
      <!-- Flex container with reduced gap -->
      <div class="flex flex-col md:flex-row items-center justify-center w-full max-w-screen-lg mx-auto">
        
  
<!-- Image Section with visibility hidden on mobile screens -->
<div class="flex justify-end pe-10 md:w-1/3 mb-4 md:mb-0 hidden md:flex">
  <img src="@/assets/newslatter.png" alt="Newsletter" class="w-40 h-auto" />
</div>

        <!-- Title and Form Section -->
        <div class="md:w-2/3 pl-0  text-left"> 
          <h2 class="sm:text-3xl text-1xl mb-2 raleway-custom ">SUBSCRIBE TO OUR NEWSLETTER</h2>
          <p class="md:text-lg lg:text-lg sm:text-base text-[12px] mb-4 nunito-sans-light">Get updates on upcoming auctions, news, and offers.</p>

          <!-- Form for email input -->
          <form @submit.prevent="handleSubmit" class="flex items-center w-full">
                       <div class="border border-black flex w-full sm:h-full h-10  md:w-9/12 mb-4 md:mb-0">
              <input 
                type="email" 
                v-model="email" 
                placeholder="Email Address" 
                required 
                class="py-3 px-4 w-full border-0 focus:outline-none nunito-sans-light sm:text-[14px] text-[12px]" 
              />
              <button 
  type="submit" 
  class="bg-gray-100 hover:bg-[#8a2432] hover:text-white border-gray-300 py-3 px-4 flex items-center justify-center transition-colors duration-300"
  aria-label="Submit Email"
>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    class="h-6 w-6 hover:text-white transition-colors duration-300" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    aria-hidden="true"
  >
    <path 
      stroke-linecap="round" 
      stroke-linejoin="round" 
      stroke-width="2" 
      d="M13 7l5 5-5 5M6 12h12" 
    />
  </svg>
</button>

            </div>
          </form>
        </div>
      </div>

      <p v-if="submitted" class="mt-4 text-green-500">Thank you for subscribing!</p>
    </div>
</div>
  </section>
</template>

<script>
export default {
  name: 'SubscribeNewsletter',
  data() {
    return {
      email: '',
      submitted: false,
    };
  },
  methods: {
    handleSubmit() {
      console.log('Subscribed with email:', this.email);
      this.email = '';
      this.submitted = true;

      setTimeout(() => {
        this.submitted = false;
      }, 3000);
    },
  },
};
</script>

<style scoped>
.subscribe-newsletter {
  background-color: #f7f5f5; /* Light background */
}


form button {
  background-color: #f0e5e5; /* Light pink for button background */
}



@media (min-width: 768px) {
  .subscribe-newsletter {
    padding-top: 40px; /* Adjust padding on larger screens */
    padding-bottom: 40px;
  }
}
.wapper {
  max-width: 1280px; /* Set max width */
}
</style>
