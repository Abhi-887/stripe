<template>
    <div class="container mx-auto p-6">
      <!-- Terms & Conditions Section -->
      <section>
        <h2 class="text-3xl raleway-custom text-[#8a2432] uppercase mb-6">Terms & Conditions</h2>
        <p class="text-lg text-gray-700 mb-4">
          Please read our Terms & Conditions carefully before using our platform. These terms outline the rules and regulations for the use of Wickman’s services.
        </p>
        <div class="space-y-6">
          <p class="text-gray-600">
            By accessing or using our platform, you agree to comply with and be bound by these Terms & Conditions. If you do not agree with any part of these terms, you must refrain from using our services.
          </p>
  
          <h3 class="text-xl font-semibold text-[#8a2432]">1. User Responsibilities</h3>
          <p class="text-gray-600">
            As a user of our platform, you agree to:
          </p>
          <ul class="list-disc ml-6">
            <li>Provide accurate and up-to-date information when creating an account.</li>
            <li>Maintain the confidentiality of your account credentials and notify us immediately of any unauthorized access.</li>
            <li>Comply with all applicable laws, including intellectual property and anti-fraud regulations, when using our platform.</li>
          </ul>
  
          <h3 class="text-xl font-semibold text-[#8a2432]">2. Platform Use</h3>
          <p class="text-gray-600">
            You are granted a limited, non-exclusive, and non-transferable license to use our platform for its intended purpose of bidding and purchasing auction items. You agree not to use the platform for any unlawful activities or to engage in fraudulent or malicious activities.
          </p>
  
          <h3 class="text-xl font-semibold text-[#8a2432]">3. Fees and Payments</h3>
          <p class="text-gray-600">
            All transactions made through our platform are subject to the applicable fees, including a buyer's premium, which is a percentage of the final sale price. Payment must be made in full within the specified period following an auction win. We accept various payment methods, including credit cards and bank transfers.
          </p>
  
          <h3 class="text-xl font-semibold text-[#8a2432]">4. Suspension or Termination</h3>
          <p class="text-gray-600">
            We reserve the right to suspend or terminate your account if you violate any of the terms outlined in this agreement. This includes failure to comply with payment obligations or engaging in fraudulent activities.
          </p>
  
          <h3 class="text-xl font-semibold text-[#8a2432]">5. Disclaimers and Limitation of Liability</h3>
          <p class="text-gray-600">
            Our platform is provided "as is" and we do not offer warranties regarding its availability or accuracy. We are not liable for any indirect, incidental, or consequential damages arising from the use of the platform. Users access and use the platform at their own risk.
          </p>
  
          <h3 class="text-xl font-semibold text-[#8a2432]">6. Modifications to Terms</h3>
          <p class="text-gray-600">
            We reserve the right to modify these Terms & Conditions at any time. You will be notified of any material changes, and continued use of the platform constitutes your acceptance of the updated terms.
          </p>
  
          <h3 class="text-xl font-semibold text-[#8a2432]">7. Governing Law</h3>
          <p class="text-gray-600">
            These terms shall be governed by and construed in accordance with the laws of the jurisdiction where our company is based. Any disputes shall be resolved in the courts of that jurisdiction.
          </p>
  
          <h3 class="text-xl font-semibold text-[#8a2432]">8. Contact Information</h3>
          <p class="text-gray-600">
            If you have any questions or concerns about these Terms & Conditions, please contact us at support@wickman.com.
          </p>
        </div>
      </section>
    </div>
  
    <!-- Footer -->
    <SiteFooter />
  </template>
  
  <script>
  import SiteFooter from '@/components/SiteFooter.vue';
  
  export default {
    components: {
      SiteFooter,
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 1280px;
  }
  </style>
  