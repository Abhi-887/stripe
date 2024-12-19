<template>
  <div class="card-section-container container xl:px-4 lg:px-12 md:px-16 sm:px-10 px-6 mx-auto">
    <div class="bg-white">
      <div class="card-grid grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-stretch sm:pb-4">
        <div
          v-for="(card, index) in cards"
          :key="index"
          class="card flex flex-col text-left bg-[#f9f5f6] overflow-hidden my-4"
          :class="{ 'self-end': index % 2 === 0, 'self-start': index % 2 !== 0 }"
        >
          <!-- Image Section -->
          <div>
         
              <img :src="card.image" :alt="card.title" class="w-full h-80 object-cover" />
         
          </div>

          <!-- Content Section -->
          <div class="content xl:p-16 lg:p-12 md:p-10 sm:p-8 p-6 bg-[#f9f5f6]">
            <p class="md:text-lg lg:text-lg text-black sm:text-base text-[12px] nunito-sans-light xl:mb-6 lg:mb-6 md:mb-5 sm:mb-4 mb-1">{{ card.date }}</p>
            <h2 class="news-title text-2xl md:text-2xl lg:text-2xl sm:text-2xl xl:text-3xl font-medium uppercase xl:mb-4 lg:mb-4 md:mb-3 sm:mb-2 mb-1 nunito-sans-custom">
              <a class="text-black no-underline hover:text-[#8a2432]">
                {{ card.title }}
              </a>
            </h2>

            <p class="md:text-lg lg:text-lg sm:text-base text-[12px] nunito-sans-light text-gray-700 xl:mb-6 lg:mb-6 md:mb-5 sm:mb-5 mb-5">{{ card.description }}</p>
            <div class="flex justify-between">
              <button class="border md:text-lg lg:text-lg sm:text-base text-[12px] border-black text-black xl:py-4 lg:py-4 md:py-3 sm:py-3 py-2 w-full transition bg-transparent hover:bg-black hover:text-white nunito-sans-light"
                @click="onRead">{{ ReadText }} More
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
    ReadText: {
      type: String,
      default: "Read",
    },
  },
  methods: {
    onRead() {
      console.log("Read More clicked");
    },
  },
};
</script>

<style scoped>
.card-section-container {
  max-width: 1280px !important;
}

@media (max-width: 917px) {
  .card-grid {
    grid-template-columns: 1fr; /* Stack cards in a single column */
  }

  .card {
    flex-direction: column; /* Ensure the flex direction is column on smaller screens */
    align-self: auto; /* Reset alignment on smaller screens */
  }
}
</style>
