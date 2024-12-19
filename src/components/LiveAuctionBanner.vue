<template>
    <section class="hero flex items-center lg:flex">
      <div class="container mx-auto xl:px-4 lg:px-12 md:px-16 sm:px-8 px-6 py-20 flex flex-col md:flex-row relative">
        <!-- Left Column for Text -->
        <div class="flex flex-col justify-center text-white text-center md:text-left md:items-start items-start xl:my-20 lg:my-4 md:my-4 my-10 relative z-10">
          <h1 class="text-2xl md:text-4xl lg:text-4xl raleway-custom leading-tight custom-lg uppercase">
            Live Auctions
          </h1>
        </div>
        <!-- Right Column for Image (Handled by background image) -->
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'LiveAuctionBanner',
    data() {
      return {
        showMore: false
      };
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
    background-image: url('@/assets/pastauction.png');
    background-repeat: no-repeat;
    background-size: cover;
  }
  
  .container {
    position: relative;
    max-width: 1280px;
    height: 100%;
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
  