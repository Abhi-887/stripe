<template>
  <div>



    <Notificationbar />

    <!-- Hero Section -->
    <HeroSection />

    <!-- Welcome Section -->
    <div class="bg-white pt-16 pb-12">
      <div class="container mx-auto xl:px-4 lg:px-12 md:px-16 sm:px-5 px-6 text-center">
        <h2
          class="text-2xl md:text-4xl lg:text-4xl sm:text-2x1 raleway-custom  custom-lg text-[#8a2432] uppercase sm:pt-6">
          Welcome to<br>
          Wickman’s Wine & Whisky Auctions
        </h2>
        <p class="text-black md:text-lg lg:text-lg sm:text-base text-[12px] py-4 nunito-sans-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br>
          sed do eiusmod tempor incididunt ut labore et dolore
        </p>
      </div>
    </div>

    <!-- Card Section -->
    <div class="card-section-wrapper bg-white">
      <CardSection :cards="cards" />
    </div>

    <!-- Image Slider Section -->
    <div class="slider-section bg-white text-center sm:pt-10">
      <h1 class="text-[#8a2432] raleway-custom py-10 text-2xl md:text-4xl lg:text-4xl sm:text-2x1 custom-lg">PREVIOUS
        AUCTIONS</h1>
      <ImageSlider :images="imageData" />
    </div>

    <!-- Latest News Section -->
    <div class="slider-section bg-white text-center sm:pt-10">
      <h1 class="text-2xl md:text-4xl lg:text-4xl sm:text-2x1 text-[#8a2432] raleway-custom py-4 custom-lg">WICKMAN'S
        RESOURCES
      </h1>
      <div class="card-section-wrapper bg-white">
        <NewsSection :cards="news" />
      </div>
      <div class="flex justify-center">
        <a href="YOUR_LINK_HERE"
          class="group py-2 transition bg-transparent nunito-sans-light custom-font-weight md:text-xl sm:text-[14px] text-[12px] hover:text-black text-[#8a2432] font-bold flex items-center">
          View all Resources
          <div class="group">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"
              class="sm:ml-2 ml-1 md:mt-1 sm:w-3 sm:h-3 w-2 h-2 stroke-[#8A2432] group-hover:stroke-black">
              <path d="M1 7L7 1" />
              <path d="M3 1H7V5" />
            </svg>
          </div>
        </a>
      </div>

    </div>

    <!-- Banner Section -->
    <div class="sm:pt-16 pt-6 bg-white">
      <BannerBody />
    </div>

    <!-- Newsletter Subscription Section -->
    <div class="bg-[#f0e5e5]">
      <SubscribeNewsletter />
    </div>

    <!-- Site Footer -->
    <SiteFooter />
  </div>
</template>

<script>
import CardSection from "@/components/CardSection.vue";
import HeroSection from "@/components/HeroSection.vue";
import SiteFooter from "@/components/SiteFooter.vue";
import ImageSlider from "@/components/ImageSlider.vue";
import NewsSection from "@/components/NewsSection.vue";
import BannerBody from "@/components/BannerBody.vue";
import SubscribeNewsletter from "@/components/SubscribeNewsletter.vue";
import Notificationbar from "@/components/Notificationbar.vue";

export default {
  name: "HomePage",
  components: {
    HeroSection,
    SiteFooter,
    CardSection,
    ImageSlider,
    NewsSection,
    BannerBody,
    SubscribeNewsletter,
    Notificationbar,
  },
  data() {
    return {
      cards: [
        {
          title: "HOW TO SELL",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
          image: require('@/assets/howtobuy.jpg'),
          registerLink: "/register",
          learnLink: "/how-sale",
        },
        {
          title: "HOW TO BUY",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
          image: require('@/assets/howtosell.jpg'),
          registerLink: "/register",
          learnLink: "/how-buy",
        },
      ],

      news: [
        {
          date: "20th Sept 2024",
          title: "Lorem ipsum dolor sit amet adipiscing",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
          image: require('@/assets/news1.jpg'), // Assuming you're using Webpack or similar for image handling
          link: "/news/announcements/ewan-mcgregor-auctions-26-year-old-arran-whisky-auctioneer-chas",
        },
        {
          date: "20th Sept 2024",
          title: "Lorem ipsum dolor sit amet adipiscing",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
          image: require('@/assets/news2.jpg'), // Assuming you're using Webpack or similar for image handling
          link: "/news/announcements/ewan-mcgregor-auctions-26-year-old-arran-whisky-auctioneer-chas",
        },
      ],
      imageData: [
        {
          image: require('@/assets/1.png'),
          title: '01 JAN 2024 AUCTION',
          link: 'https://example.com/1',
        },
        {
          image: require('@/assets/2.png'),
          title: '22 SEPT 2024 AUCTION',
          link: 'https://example.com/2',
        },
        {
          image: require('@/assets/3.png'),
          title: '01 JAN 2024 AUCTION',
          link: 'https://example.com/1',
        },
        {
          image: require('@/assets/1.png'),
          title: '22 SEPT 2024 AUCTION',
          link: 'https://example.com/2',
        },
        {
          image: require('@/assets/2.png'),
          title: '01 JAN 2024 AUCTION',
          link: 'https://example.com/1',
        },
        {
          image: require('@/assets/3.png'),
          title: '22 SEPT 2024 AUCTION',
          link: 'https://example.com/2',
        },
        // Add more items as needed
      ],
    };
  },
};
</script>

<style scoped>
.leading-tight {
  line-height: 1.25 !important;
}

.custom-font-weight {
  font-weight: 600;
  /* Adjust this value as needed */
}

@media (min-width: 1500px) {
  .custom-lg {
    font-size: 2.8em;
  }
}

/* Add any page-specific styles if needed */
</style>
