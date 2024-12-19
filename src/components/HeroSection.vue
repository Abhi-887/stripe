<template>
  <!-- Desktop Hero Section -->
  <section class="hero flex items-center hidden lg:flex">
    <div class="container mx-auto xl:px-4 lg:px-12 md:px-16 sm:px-10 px-6 flex flex-col md:flex-row relative">
      <!-- Left Column for Text -->
      <div
        class="flex flex-col justify-center text-white text-left xl:my-44 lg:my-32 md:my-28 sm:my-16 my-10 relative z-10">
        <h1 class="text-3xl md:text-4xl lg:text-4xl raleway-custom leading-tight custom-lg">
          NEXT AUCTION <br> FRIDAY, 18TH OCTOBER <br> TO SUNDAY, 27TH OCTOBER
        </h1>
        <p class="text-base xl:w-2/5 w-3/5 md:text-lg lg:text-lg my-10 nunito-sans-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
        </p>
        <!-- Buttons -->
        <div class="mt-4 flex space-x-6 md:space-x-10">
          <button
            @click="goToRegister"
            class="bg-[#8a2432] border border-[#8a2432] hover:border-white text-white py-3 px-6 xl:py-4 xl:px-10 hover:bg-white hover:text-[#8a2432] transition nunito-sans-light">
            Register Now
          </button>
          <button
            @click="goToHowToSale"
            class="border border-white text-white py-3 px-6 xl:py-4 xl:px-10 bg-transparent hover:bg-white hover:text-[#8a2432] transition nunito-sans-light">
            How to Sell
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Mobile Hero Section -->
  <section class="block lg:hidden">
    <div>
      <img src="@/assets/herosection.jpg" alt="Hero Section" class="w-full" />
    </div>
    <div class="flex flex-col bg-black text-white px-6 sm:px-10 sm:py-12 py-8 relative z-10">
      <h1 class="text-2xl sm:text-3xl md:text-4xl raleway-custom leading-tight custom-lg">
        NEXT AUCTION <br> FRIDAY, 18TH OCTOBER <br> TO SUNDAY, 27TH OCTOBER
      </h1>
      <p class="sm:text-base text-sm sm:w-4/5 my-4 sm:my-5 nunito-sans-light">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
      </p>
      <!-- Buttons -->
      <div class="mt-4 flex space-x-4 sm:space-x-6">
        <button
          @click="goToRegister"
          class="bg-[#8a2432] border border-[#8a2432] text-white py-2 px-5 sm:py-3 sm:px-6 hover:bg-white hover:text-[#8a2432] transition nunito-sans-light">
          Register Now
        </button>
        <button
          @click="goToHowToSale"
          class="border border-white text-white py-2 px-5 sm:py-3 sm:px-6 bg-transparent hover:bg-white hover:text-[#8a2432] transition nunito-sans-light">
          How to Sell
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HeroSection",
  methods: {
    goToRegister() {
      // Check if token exists in sessionStorage
      const token = sessionStorage.getItem("token");
      if (token) {
        // Redirect to dashboard if user is logged in
        this.$router.push({ path: "/dashboard" });
      } else {
        // Redirect to register page if user is not logged in
        this.$router.push({ path: "/register" });
      }
    },
    goToHowToSale() {
      this.$router.push({ path: "/how-sale" });
    },
  },
};
</script>

<style scoped>
.leading-tight {
  line-height: 1.25 !important;
}

.hero {
  background-color: black;
  background-image: url('@/assets/Hero Section BG.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

.container {
  max-width: 1280px;
}

@media (min-width: 1500px) {
  .custom-lg {
    font-size: 2.8em;
  }
}
</style>
