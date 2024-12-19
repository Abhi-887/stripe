<template>
    <div class="container mx-auto p-6">
      <!-- Privacy Policy Section -->
      <section>
        <h2 class="text-3xl raleway-custom text-[#8a2432] uppercase mb-6">Privacy Policy</h2>
        <p class="text-lg text-gray-700 mb-4">
          Your privacy is important to us. This privacy policy explains how we collect, use, and protect your personal information when you use our services.
        </p>
        <div class="space-y-6">
          <p class="text-gray-600">
            At Wickman, we value your privacy and are committed to protecting your personal data. This policy outlines the types of personal information we collect, how we use it, and the steps we take to safeguard it.
          </p>
          
          <h3 class="text-xl font-semibold text-[#8a2432]">1. Information We Collect</h3>
          <p class="text-gray-600">
            We collect the following types of information when you use our platform:
          </p>
          <ul class="list-disc ml-6">
            <li>Personal details such as your name, email address, and phone number.</li>
            <li>Payment information including credit/debit card details or bank account information for processing purchases.</li>
            <li>Usage data such as IP addresses, browser type, and browsing activity on our platform to improve user experience and platform functionality.</li>
          </ul>
          
          <h3 class="text-xl font-semibold text-[#8a2432]">2. How We Use Your Information</h3>
          <p class="text-gray-600">
            The information we collect is used for the following purposes:
          </p>
          <ul class="list-disc ml-6">
            <li>Processing your transactions and fulfilling orders.</li>
            <li>Improving our platform by analyzing usage trends.</li>
            <li>Sending marketing communications with your consent, including newsletters and promotional offers.</li>
            <li>Ensuring compliance with our policies and legal obligations.</li>
          </ul>
          
          <h3 class="text-xl font-semibold text-[#8a2432]">3. Data Protection and Security</h3>
          <p class="text-gray-600">
            We implement strong security measures to protect your personal information from unauthorized access, alteration, or destruction. All sensitive data is encrypted, and we regularly review our security procedures to ensure they meet industry standards.
          </p>
          
          <h3 class="text-xl font-semibold text-[#8a2432]">4. Sharing Your Information</h3>
          <p class="text-gray-600">
            We do not sell or rent your personal data to third parties. However, we may share your data with trusted service providers who help us operate the platform, such as payment processors and delivery services, provided that they adhere to strict privacy standards.
          </p>
          
          <h3 class="text-xl font-semibold text-[#8a2432]">5. Your Rights</h3>
          <p class="text-gray-600">
            You have the right to request access to, correction, or deletion of your personal information. You may also opt-out of receiving marketing communications at any time by following the unsubscribe link in our emails.
          </p>
          
          <h3 class="text-xl font-semibold text-[#8a2432]">6. Changes to This Policy</h3>
          <p class="text-gray-600">
            We reserve the right to update this Privacy Policy at any time. Any changes will be reflected on this page, and we encourage you to review it periodically to stay informed about how we protect your information.
          </p>
          
          <h3 class="text-xl font-semibold text-[#8a2432]">7. Contact Us</h3>
          <p class="text-gray-600">
            If you have any questions or concerns about our privacy practices, please contact us at support@wickman.com.
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
  