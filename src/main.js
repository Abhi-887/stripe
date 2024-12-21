import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Ensure this line imports your router
import './index.css'; // or your main CSS file
import { createPinia } from 'pinia';  // Import Pinia
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import vue3GoogleLogin from 'vue3-google-login';
import 'slick-carousel';
import { VueStripe } from '@vue-stripe/vue-stripe';



// Import the toastification styles
import 'vue-toastification/dist/index.css';

const CLIENT_ID = "443909802788-uqen9a4to31d21eejfd4j2kb4hdnqh3c.apps.googleusercontent.com";

const app = createApp(App)
  .use(vue3GoogleLogin, {
    clientId: CLIENT_ID,
  })
  .use(createPinia())
  .use(router); // Ensure to use the router here


  app.use(VueStripe, {
    pk: 'pk_test_51QRW37Bl2yY8FU6UKeAbQGJ9thPYl4bG1R2Lw9CYmVoSuT6JXH1JYSIfEmDP96hCiN2NrklHKbNSOgRbZS6zpeem00yVYxgk2Y', // Replace with your Stripe publishable key
    stripeAccount: null, // Optional, for Connect accounts
  });

// Mount the app and add ToastContainer to the template
app.mount('#app');
