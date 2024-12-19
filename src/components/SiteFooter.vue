<template>
  <div>
    <!-- Footer Section -->
    <footer class="bg-black text-white">
      <div
        class="container wapper-max xl:px-6 lg:px-12 md:px-16 sm:px-10 px-4 mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-12">

        <!-- WICKMAN'S WINE & WHISKY AUCTIONS Section -->
        <div class="text-start">
          <h2 class="raleway-custom sm:text-[18px] text-[14px]">WICKMAN'S WINE & <br> WHISKY AUCTIONS</h2>
          <ul class="list-none mt-4 space-y-2 custom-list nunito-sans-light">
            <li v-for="item in footerData.auctionLinks" :key="item.label">
              <router-link :to="item.link" class="hover:text-[#CE4558] sm:text-[14px] text-[12px]">{{ item.label }}</router-link>
            </li>
          </ul>
        </div>

        <!-- BUYING & SELLING Section -->
        <div class="text-start lg:mx-auto flex flex-col">
          <h2 class="raleway-custom sm:text-[18px] text-[14px]">BUYING & SELLING</h2>
          <ul class="list-none mt-4 space-y-2 custom-list nunito-sans-light">
            <li v-for="item in footerData.buySellLinks" :key="item.label">
              <router-link :to="item.link" class="hover:text-[#CE4558] sm:text-[14px] text-[12px]">{{ item.label }}</router-link>
            </li>
          </ul>
        </div>

        <!-- OTHER LINKS Section -->
        <div class="flex md:justify-start lg:justify-end justify-start text-start">
          <div>
            <h2 class="raleway-custom sm:text-[18px] text-[14px]">OTHER LINKS</h2>
            <ul class="list-none mt-4 space-y-2 custom-list nunito-sans-light">
              <li v-for="item in footerData.otherLinks" :key="item.label">
                <router-link :to="item.link" class="hover:text-[#CE4558] sm:text-[14px] text-[12px]">{{ item.label }}</router-link>
              </li>
            </ul>
          </div>
        </div>

        <!-- SOCIAL MEDIA Section -->
        <div class="text-start block lg:hidden">
          <h2 class="raleway-custom sm:text-[18px] text-[14px]">SOCIAL MEDIA</h2>
          <nav class="flex sm:space-x-4 space-x-3">
            <a v-for="social in footerData.socialLinks" :key="social.platform" :href="social.link"
              class="hover:text-gray-400" :aria-label="social.platform" rel="noopener noreferrer"
              @mouseenter="hoveredIcon = social.hoverIcon" @mouseleave="hoveredIcon = social.icon">
              <img :src="hoveredIcon === social.hoverIcon ? social.hoverIcon : social.icon" :alt="social.platform"
                class="sm:w-5 w-4 my-2">
            </a>
          </nav>
        </div>
      </div>

      <!-- Divider Line -->
      <div class="wapper-max sm:mx-auto xl:px-6 lg:px-12 md:px-16 sm:px-10 px-4">
        <hr class="border-t border-[#3d3d3d] my-4 md:my-6 lg:my-8" />
      </div>

      <!-- Warning and License Info and Footer Bottom Row -->
      <div
        class="container wapper-max xl:px-4 lg:px-12 md:px-16 sm:px-10 px-4 mx-auto py-12 flex flex-col md:flex-row justify-between items-start space-y-4 md:space-y-0">

        <!-- Left Column: Warning and License Info -->
        <div class="sm:text-[12px] text-[10px] space-y-2 text-start nunito-sans-light">
          <p v-for="(paragraph, index) in footerData.warningInfo" :key="index">{{ paragraph }}</p>
        </div>

        <!-- Right Column: Footer Bottom with Social Links -->
        <div class="text-medium text-white flex flex-col items-start space-y-2 text-start hidden lg:flex">
          <h2 class="raleway-custom sm:text-[18px] text-[14px]">SOCIAL MEDIA</h2>
          <nav class="flex space-x-4">
            <a v-for="social in footerData.socialLinks" :key="social.platform" :href="social.link"
              class="hover:text-gray-400" :aria-label="social.platform" rel="noopener noreferrer"
              @mouseenter="hoveredIcon = social.hoverIcon" @mouseleave="hoveredIcon = social.icon">
              <img :src="hoveredIcon === social.hoverIcon ? social.hoverIcon : social.icon" :alt="social.platform"
                class="sm:w-5 my-2">
            </a>
          </nav>
        </div>
      </div>
    </footer>

    <div class="py-6 bg-[#3d3d3d] sm:text-[12px] text-[10px]">
      <div
        class="container wapper-max xl:px-4 lg:px-12 md:px-16 sm:px-10 px-4 mx-auto flex flex-col sm:flex-row justify-between items-center text-white nunito-sans-light">
        <p>&copy; 2024 Wickman's Wine & Whisky Auctions Pvt. Ltd.</p>
        <p>Designed & Developed by <a href="https://your-link.com" target="_blank">Basestation</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterSection",
  data() {
    return {
      hoveredIcon: null, // Track the hovered icon
      footerData: {
        auctionLinks: [
          { label: "Previous Auctions", link: "/past-auction" },
          { label: "Contact Us", link: "/contact-us" },
          { label: "FAQs", link: "/faqs" }
        ],
        buySellLinks: [
          { label: "How to Buy", link: "/how-buy" },
          { label: "How to Sell", link: "how-sale" },
          { label: "Delivery & Insurance", link: "/delivery-insurance" },
          { label: "Request for Valuation", link: "/request-Valuation" }  // Updated link here
        ],
        otherLinks: [
          { label: "News", link: "#" },
          { label: "Resources", link: "#" },
          { label: "Privacy Policy", link: "privacy-policy" },
          { label: "Terms & Conditions", link: "terms-conditions" }
        ],
        socialLinks: [
          { platform: "Facebook", link: "#", icon: require('@/assets/Facebook Icon.svg'), hoverIcon: require('@/assets/fb.hover.svg') },
          { platform: "Twitter", link: "#", icon: require('@/assets/Twitter Icon.svg'), hoverIcon: require('@/assets/twitter.hover.svg') },
          { platform: "YouTube", link: "#", icon: require('@/assets/Youtube Icon.svg'), hoverIcon: require('@/assets/yt.hover.svg') }
        ],
        warningInfo: [
          "WARNING: Under the Liquor Control Reform Act 1998, it is an offence to supply alcohol to a person under the age of 18 years. (Penalty exceeds $17,000).",
          "For a person under the age of 18 years to purchase or receive liquor. (Penalty exceeds $700).",
          "Liquor License No: 57705855",
          "Wine Auctions Australia Pty Ltd Trading as Wickman's Fine Wine Auctions - 2024"
        ]
      }
    };
  }
};
</script>

<style scoped>
footer {
  background-color: #000000;
  /* Background is black */
  color: #ffffff;
  /* Text is white */
}

.wapper-max {
  max-width: 1536px !important;
}
</style> 
