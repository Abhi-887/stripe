<template>
    <!-- Top Banner -->
    <TopBanner 
      :title="bannerData.title"
      :description="bannerData.description"
      :longDescription="bannerData.longDescription"
    />

    <!-- Introduction Section -->
    <div class="bg-white py-20">
  <section class="intro-section container mx-auto flex flex-col md:flex-row items-center md:items-start">
    <div class="profile-pic bg-gray-200 w-52 h-52 flex-shrink-0 md:mr-10"></div>
    <div class="intro-content mt-6 md:mt-0">
      <h2 class="sm:text-3xl text-1xl mb-2 raleway-custom ">HI,<br> WE'RE WICKMAN'S WINE AUCTIONEERS</h2>
      <p class="text-gray-700 mb-4">
        At Wickman’s, my goal has been to provide a down-to-earth approach to wine auctions, and give our vendors clear and honest advice when it comes to auctioning their wine. So whether you’re an experienced seller or doing this for the first time, we can guide you through the process.
      </p>
      <p class="pt-1">
        Keep scrolling for more information or simply fill out the form below for an expert valuation and all the information you may need about selling at Auction.
      </p>
    </div>
  </section>
 </div>



  <!-- Request Form and Bottle Image Section -->
  <div class="valuation-section container mx-auto py-12 flex flex-col md:flex-row items-start justify-center">
    
    <!-- Form Section -->
    <div class="form-section md:w-1/2 md:pr-20">
      <h3 class="text-2xl mb-4 text-[8a2432]">REQUEST FOR VALUATION</h3>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm mb-1">Name*</label>
          <input type="text" class="w-full border p-2" required />
        </div>
        <div>
          <label class="block text-sm mb-1">Email*</label>
          <input type="email" class="w-full border p-2" required />
        </div>
        <div>
          <label class="block text-sm mb-1">Phone Number*</label>
          <input type="tel" class="w-full border p-2" required />
        </div>
        <div>
          <label class="block text-sm mb-1">State*</label>
          <input type="text" class="w-full border p-2" required />
        </div>
        <div>
          <label class="block text-sm mb-1">Purpose*</label>
          <input type="text" class="w-full border p-2" required />
        </div>
        <div>
          <label class="block text-sm mb-1">Wine/Whisky Details*</label>
          <textarea class="w-full border p-2" rows="4" required></textarea>
        </div>
        <button type="submit" class="w-full bg-[#8a2432] text-white py-2">Send</button>
      </form>
    </div>
    
    <!-- Bottle Image Section -->
    <div class="image-section md:w-1/2 flex justify-center md:justify-start mt-8 md:mt-0">
<img data-v-962b0962="" src="@/assets/ballantines-1246125.jpg" alt="Bottle Image" class="">
    </div>
  </div>

<div class="py-12 bg-white">
 <div class="container mx-auto">
    <h2 class="text-2xl font-semibold text-center mb-6">DIY WINE PRICE RESEARCH</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
      <WineCard v-for="(card, index) in wineCards" :key="index" :cardData="card" />
    </div>
  </div>
    </div>


 <!-- Footer -->
      <SiteFooter />
</template>

<script>
import SiteFooter from '@/components/SiteFooter.vue';
import TopBanner from '@/components/TopBanner.vue';
import WineCard from '@/components/WineCard.vue';

export default {
  components: {
    SiteFooter,
    TopBanner,
    WineCard,
  },
  data() {
    return {
      // Sample data to pass to the TopBanner
      bannerData: {
        title: 'Get True Valuation of Your Bottle',
        description: 'Explore our wide range of exclusive fine wines, antiques, and collectibles available for auction.',
        longDescription: 'Our auction platform offers a curated selection of fine wines, luxury items, and collectibles from various top brands, bringing enthusiasts and collectors together in a secure, transparent, and seamless environment. Our team ensures all items are authenticated, with detailed descriptions and images available for review.'
      },
      // Data for wine cards
      wineCards: [
        {
         image: require('@/assets/1.png'),
          title: "Wickman's Wine Price Guide",
        },
        {
             image: require('@/assets/2.png'),
          title: 'View More Wine Guides',
        },
        {
              image: require('@/assets/3.png'),
          title: 'How is Wine Valued?',
        },
        {
             image: require('@/assets/1.png'),
          title: 'Henschke Hill of Grace Price Guide',
        },
        {
               image: require('@/assets/2.png'),
          title: 'Penfolds Grange  Price Guide',
        },
        {
             image: require('@/assets/3.png'),
          title: 'Rockford Wines Price Guide Price Guide Price Guide Price Guide Price Guide Price Guide',
        },
      ],
    };
  },
};
</script>


<style scoped>
.container {
  max-width: 1280px;
}

</style>




