<template>
  <div class="container xl:px-4 lg:px-12 md:px-16 sm:px-10 px-6 mx-auto">
    <div class="card-section-wrapper bg-white">
      <div class="grid card-grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-stretch">
        <div v-for="(card, index) in cards" :key="index" class="card-section">
          <!-- Image Section -->
          <div class="image-container">
            <img :src="card.image" :alt="card.title" class="w-full h-80 object-cover" />
          </div>

          <!-- Content Section -->
          <div class="content xl:p-16 lg:p-12 md:p-10 sm:p-8 p-6 bg-[#f9f5f6]">
            <div
              class="news-title text-2xl md:text-2xl lg:text-2xl sm:text-2xl xl:text-3xl raleway-custom font-medium uppercase mb-4">
              <h2 class="text-black hover:text-[#8a2432]">
                {{ card.title }}
              </h2>
            </div>
            <p class="md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-light text-gray-700 mb-6">{{
              card.description }}</p>
            <div class="mt-2 md:flex md:flex-row md:space-x-10 sm:space-x-6 space-x-2">
              <button
                class="bg-[#8a2432] border md:text-lg lg:text-lg sm:text-base text-[12px] border-[#8a2432] text-white xl:py-4 lg:py-4 md:py-3 sm:py-3 py-2 xl:px-10 lg:px-6 md:px-4 sm:px-4 px-5 hover:border-[#8a2432] transition hover:bg-white hover:text-[#8a2432] nunito-sans-light"
                @click="onRegister(card.registerLink)">
                {{ registerText }} Now
              </button>
              <button
                class="border md:text-lg lg:text-lg sm:text-base text-[12px] border-black text-black xl:py-4 lg:py-4 md:py-3 sm:py-3 py-2 xl:px-10 lg:px-7 md:px-5 sm:px-6 px-7 transition bg-transparent hover:bg-black hover:text-white nunito-sans-light"
                @click="onLearn(card.learnLink)">
                {{ learnText }} More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardSection",
  props: {
    cards: {
      type: Array,
      required: true,
    },
    registerText: {
      type: String,
      default: "Register",
    },
    learnText: {
      type: String,
      default: "Learn",
    },
  },
  methods: {
    onRegister(link) {
      const token = sessionStorage.getItem("token");

      if (token) {
        // User is authenticated, redirect to the dashboard
        this.$router.push("/dashboard");
      } else {
        // User is not authenticated, redirect to the registration page
        if (link) {
          this.$router.push(link);
        } else {
          console.warn("No register link provided");
        }
      }
    },
    onLearn(link) {
      if (link) {
        this.$router.push(link); // Navigate to the learn link
      } else {
        console.warn("No learn link provided");
      }
    },
  },
};
</script>

<style>
.container {
  max-width: 1280px !important;
}

@media (max-width: 917px) {
  .card-grid {
    grid-template-columns: 1fr !important;
    /* Stack cards in a single column */
  }
}
</style>
