<template>
  <section class="hero flex items-center lg:flex">
    <div class="container mx-auto xl:px-4 lg:px-12 md:px-16 sm:px-8 px-6 flex flex-col md:flex-row relative">
      <!-- Left Column for Text -->
      <div class="flex flex-col justify-center text-white text-center md:text-left md:items-start items-start xl:my-20 lg:my-4 md:my-4 my-10 relative z-10">
        <!-- Use props for title and description -->
        <h1 class="text-2xl md:text-4xl lg:text-4xl raleway-custom leading-tight w-2/3 custom-lg uppercase">
          {{ title }} 
        </h1>
        <p class="text-base xl:w-2/5 text-start w-3/5 md:text-lg lg:text-lg my-10 nunito-sans-light">
          <!-- Short description: show only 2 lines initially -->
          <span v-if="!showMore">{{ shortDescription }}</span>
          <!-- Full description: show on 'Read more' -->
          <span v-if="showMore">{{ longDescription }}</span>
          
          <!-- 'Read more' or 'Read less' link -->
          <span v-if="!showMore">... </span>
          <a href="#" class="font-bold ps-1" @click.prevent="toggleReadMore">{{ showMore ? 'Read less' : 'Read more' }}</a>
        </p>
      </div>
      <!-- Right Column for Image (Handled by background image) -->
    </div>
  </section>
</template>

<script>
export default {
  name: 'TopBanner',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    longDescription: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showMore: false
    };
  },
  computed: {
    // Short description: only show up to 2 lines
    shortDescription() {
      const shortDesc = this.description.split(' ').slice(0, 20).join(' '); // Show only the first 20 words
      return `${shortDesc}...`; // Add ellipsis to indicate truncation
    }
  },
  methods: {
    toggleReadMore() {
      this.showMore = !this.showMore;
    }
  }
};
</script>

<style scoped>
.hero {
  background-image: url('@/assets/List Page Header.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center; /* Ensure the background is centered */
}

.container {
  position: relative;
  max-width: 1280px;
  height: 100%;
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
