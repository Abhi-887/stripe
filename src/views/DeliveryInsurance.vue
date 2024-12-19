<template>
    <!-- Top Banner -->
    <TopBanner 
      :title="bannerData.title"
      :description="bannerData.description"
      :longDescription="bannerData.longDescription"
    />
  
    <div class="container mx-auto p-6">
      <!-- Delivery & Insurance Section -->
      <section>
        <h2 class="text-3xl raleway-custom text-[#8a2432] uppercase mb-6">Delivery & Insurance</h2>
        <p class="text-lg text-gray-700 mb-4">
          At Wickman, we aim to provide a seamless delivery experience while ensuring the security of your items with comprehensive insurance options. Explore our policies below.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="p-4 border rounded shadow">
            <h3 class="text-2xl font-semibold text-[#8a2432]">Delivery Options</h3>
            <p class="text-gray-600 mt-2">
              We offer multiple delivery options to suit your needs, including standard, expedited, and express shipping. Estimated delivery times and costs are provided at checkout.
            </p>
          </div>
          <div class="p-4 border rounded shadow">
            <h3 class="text-2xl font-semibold text-[#8a2432]">Insurance Policy</h3>
            <p class="text-gray-600 mt-2">
              All items are insured during transit to cover any loss or damage. The cost of insurance is included in the shipping fees.
            </p>
          </div>
        </div>
      </section>
  
      <!-- FAQ Section -->
      <section class="mt-8">
        <h2 class="text-3xl raleway-custom text-[#8a2432] uppercase mb-6">Frequently Asked Questions</h2>
        <div>
          <details class="mb-4">
            <summary class="text-lg font-medium cursor-pointer">How long does delivery take?</summary>
            <p class="mt-2 text-gray-600 nunito-sans-light">
              Delivery times vary based on the shipping option selected. Standard shipping typically takes 5-7 business days, while expedited shipping can arrive within 2-3 business days.
            </p>
          </details>
          <details class="mb-4">
            <summary class="text-lg font-medium cursor-pointer">Do you offer tracking for shipments?</summary>
            <p class="mt-2 text-gray-600 nunito-sans-light">
              Yes, all shipments include tracking details, which will be shared once your item is dispatched.
            </p>
          </details>
          <details class="mb-4">
            <summary class="text-lg font-medium cursor-pointer">What is covered under the insurance policy?</summary>
            <p class="mt-2 text-gray-600 nunito-sans-light">
              The insurance policy covers damages or loss during transit. Claims can be initiated by contacting our support team with proof of damage or non-receipt.
            </p>
          </details>
        </div>
      </section>
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
          title: 'Delivery & Insurance',
          description: 'We offer a variety of reliable delivery options to suit your needs, ensuring timely and safe arrival of your orders. Our secure insurance policies provide added protection against damage, loss, or theft, giving you peace of mind throughout the shipping process. Choose the best option for your order and shop with confidence.',
          longDescription: 'We offer a variety of reliable delivery options to suit your needs, ensuring timely and safe arrival of your orders. Our secure insurance policies provide added protection against damage, loss, or theft, giving you peace of mind throughout the shipping process. Choose the best option for your order and shop with confidence.'
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
  