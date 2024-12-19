<template>
  <div
    @click="redirectToProductPage"
    class="product-card border-[#e399a3] border overflow-hidden hover:border-[#8a2432] hover:border-transparent bg-[#8A24320D] hover:ring-1 hover:ring-[#8a2432] hover:ring-offset-0 cursor-pointer"
  >
    <div class="product-card-content flex flex-col justify-between h-full">
      <!-- Sold on info -->
      <div class="flex justify-between items-center px-4 pt-2 bg-[#ffffff] text-gray-500 text-[10px]">
        <div>Sold on</div>
        <div>{{ product.soldDate }}</div>
      </div>

      <!-- Product Image -->
      <img :src="product.image" alt="Product Image" class="w-full object-contain" />

      <!-- Product Details -->
      <div class="p-6 text-center flex flex-col justify-between flex-1">
        <!-- Lot Number and Status -->
        <div class="flex justify-between items-center text-gray-500 text-[10px] mb-2">
          <div>Lot #{{ product.lotNumber }}</div>
          <div class="flex items-center">
            <img :src="getStatusIcon(product.reserveStatus)" alt="Status Icon" class="check-status-icon" />
            <span class="text-[10px] ml-1 nunito-sans-light">{{ product.reserveStatus }}</span>
          </div>
        </div>

        <!-- Title and Winning Bid -->
        <h3 class="product-title nunito-sans-light text-black leading-4 text-[14px] mb-2">{{ product.title }}</h3>
        <p class="text-[12px] nunito-sans-light mt-2 text-[#8A2432]">
          Winning Bid <span class="text-black font-bold ps-1 text-[16px]">$ {{ product.winningBid }}</span>
        </p>

        <!-- View Lot Button -->
        <button
          @click.stop="redirectToProductPage"
          class="mt-4 bg-[#8a2432] text-[12px] border hover:border-[#8a2432] text-white hover:text-[#8a2432] w-full py-2 hover:bg-[white] nunito-sans-custom"
        >
          View Lot
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    // Redirect to product detail page with id
    redirectToProductPage(event) {
      event.stopPropagation(); // Prevent event bubbling if clicking the button directly

      if (this.product && this.product.slug) {  // Ensure the product and slug are defined
        this.$router.push({
          path: `/past-auction-detail/${this.product.slug}`, // Slug as the URL path
          query: { id: this.product.id },  // Pass ID in the query parameters
        });
      }
    },

    // Method to return the correct icon based on reserve status
    getStatusIcon(status) {
      if (status === "Reserve has been met") {
        return require('@/assets/checkstatus.svg'); // Icon for "Reserve has been met"
      } else if (status === "Reserve has not been met") {
        return require('@/assets/resernenot-ment.svg'); // Icon for "Reserve has not been met"
      }
      return ''; // Default case if status is neither of the two
    },
  },
};
</script>

<style scoped>
.product-card {
  transition: transform 0.2s;
  cursor: pointer; /* Make sure the card itself is clickable */
}

.product-card-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.check-status-icon {
  width: 15px;
  height: 15px;
}

/* Title styling for ellipsis */
.product-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
}

.product-card-content .p-6 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1; /* Make sure content fills available space */
}

@media (min-width: 768px) {
  /* Flex properties for ensuring equal heights across cards */
  .product-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 450px; /* You can adjust this value to control card height */
  }
}

@media (max-width: 768px) {
  .product-card {
    width: 100%; /* Ensure it's full width on smaller screens */
  }
}
</style>
