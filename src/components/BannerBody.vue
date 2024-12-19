<template>
  <section class="hero flex items-center hidden lg:flex">
    <div class="container mx-auto xl:px-4 lg:px-12 md:px-16 sm:px-8 px-6 flex flex-col md:flex-row relative">
      <!-- Left Column for Text -->
      <div
        class="flex flex-col justify-center text-white text-center md:text-left md:items-start items-start xl:my-44 lg:my-32 md:my-28 sm:my-16 my-10 relative z-10">
        <h1 class="text-2xl md:text-4xl lg:text-4xl raleway-custom leading-tight custom-lg uppercase">
          About Us
        </h1>
        <p class="text-base xl:w-2/5 text-start w-3/5 md:text-lg lg:text-lg my-10 nunito-sans-light">
          Distinguished by innovation and driven by
          passion, Wickman’s Fine Wine Auctions has
          been a lively and profitable meeting ground for
          wine buyers and sellers since 2003...
        </p>

        <!-- Buttons -->
        <div class="flex flex-col items-center md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <router-link
            to="/about-us"
            class="group text-white hover:text-[#CE4558] transition bg-transparent nunito-sans-light custom-font-weight text-xl flex items-center"
          >
            Read More
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"
              class="sm:ml-2 ml-1 md:mt-1 sm:w-3 sm:h-3 w-2 h-2 stroke-white transition group-hover:stroke-[#CE4558]">
              <path d="M1 7L7 1" />
              <path d="M3 1H7V5" />
            </svg>
          </router-link>
        </div>

      </div>
      <!-- Right Column for Image (Handled by background image) -->
    </div>
  </section>

  <section class="block lg:hidden">
    <div>
      <img src="@/assets/Whiskey+Pour.jpg" alt="Whiskey Pour" class="w-full" />
    </div>
    <div
      class="flex flex-col xl:px-4 lg:px-12 md:px-16 sm:px-10 px-6 justify-center bg-black text-white text-left sm:py-12 py-8 relative z-10">
      <h1 class="text-2xl md:text-4xl lg:text-4xl sm:text-2x1 raleway-custom leading-tight custom-lg uppercase">
        About Us
      </h1>
      <p
        class="md:text-lg lg:text-lg sm:text-base text-[12px] sm:w-4/5 lg:text-lg xl:my-10 lg:my-10 md:my-10 sm:my-10 my-4 nunito-sans-light">
        Distinguished by innovation and driven by passion, Wickman’s Fine Wine Auctions has
        been a lively and profitable meeting ground for wine buyers and sellers since 2003...
      </p>

      <!-- Buttons -->
      <div class="flex flex-col items-start space-y-4">
        <router-link
          to="/about-us"
          class="text-white group-hover:text-[#CE4558] transition bg-transparent nunito-sans-light custom-font-weight md:text-xl sm:text-[14px] md:text-lg lg:text-lg sm:text-base text-[12px] flex items-center"
        >
          Read More
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"
            class="sm:ml-2 ml-1 md:mt-1 sm:w-3 sm:h-3 w-2 h-2 stroke-white transition group-hover:stroke-[#CE4558]">
            <path d="M1 7L7 1" />
            <path d="M3 1H7V5" />
          </svg>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "BannerBody",
};
</script>

<style scoped>
.hero {
  background-color: black;
  background-image: url('@/assets/About Us Section BG.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

.container {
  position: relative;
  max-width: 1280px;
}

.custom-font-weight {
  font-weight: 600;
}

@media (min-width: 1500px) {
  .custom-lg {
    font-size: 2.8em;
  }
}
</style>
