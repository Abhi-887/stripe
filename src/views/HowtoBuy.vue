<template>
    <!-- Top Banner -->
    <TopBanner 
      :title="bannerData.title"
      :description="bannerData.description"
      :longDescription="bannerData.longDescription"
    />
  
    <div class="bg-white py-12">
      <div class="container mx-auto xl:px-4 lg:px-12 md:px-16 sm:px-8 px-6 space-y-12">
        <!-- Buyers Section -->
        <section>
          <h2 class="text-3xl raleway-custom text-[#8a2432] uppercase  mb-6">BUYERS</h2>
          <p class="text-lg mb-4 nunito-sans-light">
            Bidding on fine wines is as simple as finding the right one! Our online auctions occur monthly, with bidding open between the last Friday and the last Sunday of the month. Start by creating an account, browsing the listings, and placing your bid!
          </p>
          <p class="text-lg nunito-sans-light">
            Familiarize yourself with the process by reviewing our <a href="#" class="text-blue-500 underline">Terms and Conditions</a>. 
          </p>
        </section>
  
        <!-- Getting Started Section -->
        <section>
          <h2 class="text-3xl raleway-custom text-[#8a2432] uppercase  mb-6">GETTING STARTED</h2>
          <p class="text-lg mb-4 nunito-sans-light">
            Register with us and agree to our <a href="#" class="text-blue-500 underline">Terms & Conditions</a>. Once your account is active, you're ready to bid on your favorite items.
          </p>
        </section>
  
        <!-- Bidding Section -->
        <section>
          <h2 class="text-3xl raleway-custom text-[#8a2432] uppercase  mb-6">LET'S GET BIDDING!</h2>
          <p class="text-lg mb-4 nunito-sans-light">
            Auctions operate with a starting price and an increment scale as shown below. Please check the details and item conditions carefully.
          </p>
          <table class="table-auto border-collapse border border-[#8a2432] w-full">
            <thead>
              <tr class="bg-[#f3e9ea] nunito-sans-light">
                <th class="border border-[#8a2432] p-2">Price From</th>
                <th class="border border-[#8a2432] p-2">Price To</th>
                <th class="border border-[#8a2432] p-2">Increment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-[#8a2432] p-2">0</td>
                <td class="border border-[#8a2432] p-2">50</td>
                <td class="border border-[#8a2432] p-2">5</td>
              </tr>
              <tr>
                <td class="border border-[#8a2432] p-2">50</td>
                <td class="border border-[#8a2432] p-2">100</td>
                <td class="border border-[#8a2432] p-2">10</td>
              </tr>
            </tbody>
          </table>
        </section>
  
        <!-- End of Auction Section -->
        <section>
          <h2 class="text-3xl raleway-custom text-[#8a2432] uppercase  mb-6">END OF AUCTION</h2>
          <p class="text-lg mb-4 nunito-sans-light">
            Auctions conclude on the last Sunday of each month. If no bids are placed within the last 15 minutes, the item is sold.
          </p>
        </section>
  
        <!-- FAQ Section -->
        <section>
          <h2 class="text-3xl raleway-custom text-[#8a2432] uppercase  mb-6">FREQUENTLY ASKED QUESTIONS</h2>
          <div>
            <details class="mb-4">
              <summary class="text-lg font-medium cursor-pointer">Buyer's Premium</summary>
              <p class="mt-2 text-gray-600 nunito-sans-light">
                A buyer's premium of 10% is applied to the final sale price.
              </p>
            </details>
            <details class="mb-4">
              <summary class="text-lg font-medium cursor-pointer">Do You Offer Insurance for Loss/Damage?</summary>
              <p class="mt-2 text-gray-600 nunito-sans-light">
                Yes, we provide insurance for items during shipping.
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
  
  export default {
    components: {
      SiteFooter,
      TopBanner,
    },
    data() {
      return {
        bannerData: {
          title: 'How to Buy',
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
  
  .table-auto {
    border: 1px solid #ddd;
    text-align: left;
  }
  
  details summary {
    cursor: pointer;
  }
  </style>
  