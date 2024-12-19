<template>
  <div class="auction-card overflow-hidden hover:ring-2 hover:border-transparent hover:ring-[#8a2432] bg-[#8A24320D] transition">
    <router-link :to="`/past-auction/${slug}`">
      <img :src="imageUrl" :alt="'Image for auction: ' + title" class="auction-image w-full object-cover" />

      <div class="bg-[#f9f3f4] p-8 text-left">
        <!-- Dynamic Auction Type -->
        <p class="text-[#7A7A7A] text-[12px] raleway-custom">
          {{ auctionTypeText }}
        </p>

        <!-- Auction Title with Min Height -->
        <div class="auction-title-container">
          <div class="auction-title text-[24px] raleway-custom leading-7 mb-1">{{ title }} Auction</div>
        </div>

        <p class="text-[12px] nunito-sans-custom mb-4">Ended on 10th Sept 2024</p>

        <!-- Buttons -->
        <div class="flex items-center justify-between">
          <button class="view-auction-button hover:bg-[#8a2432] hover:text-white nunito-sans-light bg-transparent text-[#8a2432] border border-[#8a2432] py-2 px-6 text-[12px] transition">
            View Auction
          </button>
          <button @click="shareAuction" class="flex items-center text-[#8a2432] hover:text-[#8a2432] transition">
            <img :src="shareIcon" alt="Share Icon" />
          </button>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    image: { type: String, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    auctionType: { type: String, required: true },
  },
  computed: {
    imageUrl() {
      return `https://wickmans.basedev.co.uk/${this.image}`;
    },
    shareIcon() {
      return require('@/assets/share.svg');
    },
    auctionTypeText() {
      return this.auctionType === '1' ? 'Monthly Auction' : this.auctionType === '2' ? 'Special Auction' : '';
    },
  },
  methods: {
    shareAuction() {
      alert("Share this auction link!");
    },
  },
};
</script>

<style scoped>
.auction-card {
  cursor: pointer;
}
</style>
