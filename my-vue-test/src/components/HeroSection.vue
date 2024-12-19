<template>
  <section class="hero flex items-center hidden lg:flex">
    <div class="container mx-auto xl:px-4 lg:px-12 md:px-16 sm:px-10 px-6 flex flex-col md:flex-row relative">
      <!-- Left Column for Text -->
      <div
        class="flex flex-col justify-center text-white items-start md:items-start text-left  xl:my-44 lg:my-32 md:my-28 sm:my-16 my-10  md:text-left relative z-10">
        <h1 class="text-3xl md:text-4xl lg:text-4xl raleway-custom leading-tight custom-lg">
          NEXT AUCTION <br> FRIDAY, 18TH OCTOBER <br> TO SUNDAY, 27TH OCTOBER
        </h1>
        <p class="text-base xl:w-2/5  w-3/5 md:text-lg lg:text-lg my-10 nunito-sans-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore
        </p>

        <!-- Buttons -->
        <div class="mt-2 md:flex md:flex-row md:space-x-10 space-x-6">
          <button
            @click="goToRegister"
            class="bg-[#8a2432] border border-[#8a2432] text-white xl:py-4  lg:py-4 md:py-4 sm:py-3  py-1.5   xl:px-10  lg:px-10  md:px-10 sm:px-4 px-4 hover:border-white transition hover:bg-white hover:text-[#8a2432] nunito-sans-light ">
            Register Now
          </button>
          <button
            class="border border-white text-white xl:py-4  lg:py-4 md:py-4 sm:py-3  py-1.5  xl:px-10  lg:px-10  md:px-10 sm:px-6 px-6 transition bg-transparent hover:bg-white hover:text-[#8a2432] nunito-sans-light ">
            How to Sell
          </button>
        </div>
      </div>
    </div>
  </section>

  <section class="block lg:hidden">
    <div>
      <img src="@/assets/herosection.jpg" alt="hero section" class="w-full" />
    </div>
    <div
      class="flex flex-col bg-black justify-center text-white items-start md:items-start text-left  xl:px-4 lg:px-12 md:px-16 sm:px-10 px-6  sm:py-12 py-8 md:text-left relative z-10">
      <h1 class="text-2xl md:text-4xl lg:text-4xl sm:text-2x1 raleway-custom custom-lg  raleway-custom leading-tight custom-lg">
        NEXT AUCTION <br> FRIDAY, 18TH OCTOBER <br> TO SUNDAY, 27TH OCTOBER
      </h1>
      <p class="md:text-lg lg:text-lg sm:text-base text-[12px] sm:w-4/5 lg:text-lg xl:my-10 lg:my-10 md:my-10 sm:my-5 my-4 nunito-sans-light">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore
      </p>

      <!-- Buttons -->
      <div class="mt-2 md:flex md:flex-row md:space-x-10 sm:space-x-6  space-x-2">
        <button
          @click="goToRegister"
          class="md:text-lg lg:text-lg sm:text-base text-[12px] bg-[#8a2432] border border-[#8a2432] text-white xl:py-4 lg:py-4 md:py-3 sm:py-3 py-2 xl:px-10 lg:px-6 md:px-4 sm:px-4 px-5 hover:border-white transition hover:bg-white hover:text-[#8a2432] nunito-sans-light">
          Register Now
        </button>
        <button
          class="md:text-lg lg:text-lg sm:text-base text-[12px] border border-white text-white xl:py-4 lg:py-4 md:py-3 sm:py-3 py-2 xl:px-10 lg:px-7 md:px-5 sm:px-6 px-7 transition bg-transparent hover:bg-white hover:text-[#8a2432] nunito-sans-light">
          How to Sell
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
  methods: {
    goToRegister() {
      this.$router.push({ path: '/register-user' });
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
  position: relative;
  max-width: 1280px;
}

@media (min-width: 1500px) {
  .custom-lg {
    font-size: 2.8em;
  }
}
.leading-tight {
  line-height: 1.25 !important;
}
</style>
