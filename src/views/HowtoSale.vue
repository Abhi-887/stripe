<template>
    <!-- Top Banner -->
    <TopBanner 
      :title="bannerData.title"
      :description="bannerData.description"
      :longDescription="bannerData.longDescription"
    />
    
    <div class="bg-white py-12">
      <div class="container mx-auto xl:px-4 lg:px-12 md:px-16 sm:px-8 px-6 space-y-12">
        <!-- Selling Process Section -->
        <section>
          <h2 class="text-3xl raleway-custom text-[#8a2432] uppercase  mb-6">SELLING YOUR ITEMS</h2>
          <p class="text-lg mb-4 nunito-sans-light">
            Selling with us is straightforward and rewarding! We help you reach a global audience of collectors and enthusiasts for your fine wines and luxury items. Follow the steps below to get started.
          </p>
        </section>
  
        <!-- DIY Wine Price Research Section -->
        <section>
          <h2 class="text-3xl raleway-custom  text-[#8a2432] uppercase   mb-6">DIY WINE PRICE RESEARCH</h2>
          <p class="text-lg mb-4 nunito-sans-light">
            Understand your item's value before listing it for auction. Use the resources below to evaluate market trends, historical sales, and potential demand for your wines.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
            <WineCard v-for="(card, index) in wineCards" :key="index" :cardData="card" />
          </div>
        </section>
  
        <!-- Steps to Sell Section -->
        <section>
          <h2 class="text-3xl raleway-custom  text-[#8a2432] uppercase  mb-6">STEPS TO SELL</h2>
          <ol class="list-decimal list-inside space-y-4 text-lg nunito-sans-light">
            <li>Register with us and agree to our <a href="#" class="text-blue-500 underline">Terms & Conditions</a>.</li>
            <li>Submit a detailed description of your items, including images and any documentation.</li>
            <li>We’ll evaluate and list your items in our upcoming auctions.</li>
            <li>Track your item’s progress and view real-time bidding results in your account.</li>
            <li>Receive payment once the auction is completed and the buyer has settled.</li>
          </ol>
        </section>
  
        <!-- Seller's Fees Section -->
        <section>
          <h2 class="text-3xl raleway-custom text-[#8a2432] uppercase   mb-6">SELLER'S FEES</h2>
          <p class="text-lg mb-4 nunito-sans-light">
            A commission of 10% is charged on the final sale price. Additional services like insurance, storage, and valuation are available upon request.
          </p>
        </section>
  
        <!-- Frequently Asked Questions -->
        <section>
          <h2 class="text-3xl raleway-custom text-[#8a2432] uppercase  mb-6">FREQUENTLY ASKED QUESTIONS</h2>
          <div>
            <details class="mb-4">
              <summary class="text-lg font-medium cursor-pointer ">What Items Can I Sell?</summary>
              <p class="mt-2 text-gray-600 nunito-sans-light">
                We accept fine wines, luxury items, and antiques. All items must meet our quality standards and authenticity requirements.
              </p>
            </details>
            <details class="mb-4">
              <summary class="text-lg font-medium cursor-pointer">How Do I Ship My Items?</summary>
              <p class="mt-2 text-gray-600 nunito-sans-light">
                After approval, our team will guide you through the shipping process to ensure the safe delivery of your items to our warehouse.
              </p>
            </details>
          </div>
        </section>
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
        bannerData: {
          title: 'How to Sale',
          description: 'Discover how easy it is to sell your fine wines, antiques, and luxury items through our auction platform.',
          longDescription: 'We connect sellers with a global network of buyers who value exceptional items. With our streamlined process, you can confidently showcase your collection, achieve competitive pricing, and enjoy a hassle-free selling experience.',
        },
        wineCards: [
          { title: 'Market Trends', description: 'Analyze recent market data to understand pricing trends.' },
          { title: 'Historical Sales', description: 'Explore previous auction results for similar items.' },
          { title: 'Demand Analysis', description: 'Assess current demand for wines in your collection.' },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 1280px;
  }
  
  details summary {
    cursor: pointer;
  }
  </style>
  