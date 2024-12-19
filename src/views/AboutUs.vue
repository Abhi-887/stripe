<template>

      <!-- Top Banner -->
      <TopBanner 
      :title="bannerData.title"
      :description="bannerData.description"
      :longDescription="bannerData.longDescription"
    />

    <div class="container mx-auto p-6">
      <!-- About Us Section -->
      <section>        
        <!-- Introduction -->
        <div class="mb-12 text-center">
          <p class="text-lg text-gray-700">
            Welcome to <span class="font-semibold text-[#8a2432]">Wiskii Auctions</span>, the premier platform for live bidding and auction enthusiasts worldwide. Whether you're a buyer or seller, we strive to create a seamless, secure, and transparent auction experience.
          </p>
        </div>
  
        <!-- Our Mission and Vision -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 class="text-2xl font-semibold text-[#8a2432] mb-4">Our Mission</h3>
            <p class="text-gray-700">
              At Wiskii, our mission is to bring buyers and sellers together on a trusted platform where they can explore, bid, and trade unique and valuable items. We are dedicated to creating an environment of fairness, transparency, and excitement.
            </p>
          </div>
          <div>
            <h3 class="text-2xl font-semibold text-[#8a2432] mb-4">Our Vision</h3>
            <p class="text-gray-700">
              Our vision is to be the world’s most preferred auction platform, connecting people with extraordinary items and helping sellers achieve maximum value for their treasures. We aim to be synonymous with innovation and customer satisfaction.
            </p>
          </div>
        </div>
  
        <!-- Our Core Values -->
        <div class="mb-12">
          <h3 class="text-2xl font-semibold text-center text-[#8a2432] mb-6">Our Core Values</h3>
          <ul class="text-gray-700 space-y-4 list-disc list-inside">
            <li><span class="font-semibold">Transparency:</span> Building trust through honest and open communication.</li>
            <li><span class="font-semibold">Innovation:</span> Continuously improving the auction experience with cutting-edge technology.</li>
            <li><span class="font-semibold">Customer Focus:</span> Prioritizing the needs and satisfaction of our users.</li>
            <li><span class="font-semibold">Integrity:</span> Upholding the highest ethical standards in all transactions.</li>
          </ul>
        </div>
  
        <!-- Our Story -->
        <div class="mb-12">
          <h3 class="text-2xl font-semibold text-[#8a2432] mb-4">Our Story</h3>
          <p class="text-gray-700">
            Wiskii was founded in 2021 by a group of auction enthusiasts who recognized the need for a modern, user-friendly platform that caters to both traditional and digital audiences. Over the years, we’ve grown into a thriving community of buyers and sellers who share a passion for unique and valuable items. From rare collectibles to high-end art, we’ve facilitated thousands of successful transactions worldwide.
          </p>
        </div>
      </section>
    </div>
    <SubscribeNewsletter/>
    <!-- Footer -->
    <SiteFooter />
  </template>
  
  <script>
  import SiteFooter from "@/components/SiteFooter.vue";
import SubscribeNewsletter from "@/components/SubscribeNewsletter.vue";
  import TopBanner from '@/components/TopBanner.vue';
  
  export default {
    components: {
      SiteFooter,
      TopBanner,
      SubscribeNewsletter,
    },
    data() {
    return {
      // Sample data to pass to the TopBanner
      bannerData: {
        title: 'about us',
        description: 'Explore our wide range of exclusive fine wines, antiques, and collectibles available for auction.',
        longDescription: 'Our auction platform offers a curated selection of fine wines, luxury items, and collectibles from various top brands, bringing enthusiasts and collectors together in a secure, transparent, and seamless environment. Our team ensures all items are authenticated, with detailed descriptions and images available for review.'
      },

    };
  },
  };

  </script>
  
  <style scoped>
  .container {
    max-width: 1280px;
  }
  </style>
  