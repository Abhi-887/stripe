import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../views/HomePage.vue';
import LiveAuctionPage from '../views/LiveAuctionPage.vue';
import PastAuction from '@/views/PastAuction.vue';
import PastAuctionlot from '@/views/PastAuctionlot.vue';
import PastAuctionDetailPage from '@/views/PastAuctionDetailPage.vue';
import RegisterUser from '@/views/RegisterUser.vue';
import LoginUser from '@/views/LoginUser.vue';
import RequestAndValuation from '@/views/RequestAndValuation.vue';
import DashboardPage from '@/views/DashboardPage.vue';
import ShoppingCart from '@/views/ShoppingCart.vue';
import CheckOutPage from '@/views/CheckOutPage.vue';
import ReviewOrderPage from '@/views/ReviewOrderPage.vue';
import PaymentSuccess from '@/views/PaymentSuccess.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/payment-success',
    name: 'PaymentSuccess',
    component: PaymentSuccess,
  },
  // {
  //   path: '/payment-cancel',
  //   name: 'PaymentCancel',
  //   component: () => import('@/views/PaymentCancel.vue'), // Lazy-loaded
  // },
  {
    path: '/live-auction',
    name: 'LiveAuction',
    component: LiveAuctionPage,
  },
  {
    path: '/request-Valuation',
    name: 'RequestAndValuation',
    component: RequestAndValuation,
  },
  { path: '/login', name: 'LoginUser', component: LoginUser, meta: { guest: true } },
  { path: '/dashboard', name: 'DashboardPage', component: DashboardPage, meta: { requiresAuth: true } },
  {
    path: '/register-user',
    name: 'RegisterUser',
    component: RegisterUser,
  },
  {
    path: '/past-auction/:slug',
    name: 'PastAuctionlot',
    component: PastAuctionlot,
    props: true,
  },
  {
    path: '/past-auction',
    name: 'PastAuction',
    component: PastAuction,
  },


  {
    path: '/pastAuctionDetailPage/:id',
    name: 'PastAuctionDetailPage',
    component: PastAuctionDetailPage,
    props: true,
  },
  {
    path: '/cart',
    name: 'ShoppingCart',
    component: ShoppingCart,
    meta: { requiresAuth: true },
  },
  {
    path: '/cart/address',
    name: 'CheckOutPage',
    component: CheckOutPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/cart/address/review-order',
    name: 'ReviewOrderPage',
    component: ReviewOrderPage,
    meta: { requiresAuth: true },
  },

  // Catch-all route
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Global Navigation Guard
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token'); // Check if the user is authenticated
  const errorMessageContainer = document.querySelector('.error-message-container');  // Get the error message container

  // Check if the route requires authentication
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // If the route requires authentication and the user is not authenticated
    if (!token) {
      // Display the error message directly on the page
      if (errorMessageContainer) {
        errorMessageContainer.style.display = 'block';
      }

      // Redirect to the login page after a short delay to let the user see the error message
      setTimeout(() => {
        // Hide the error message container before redirecting
        if (errorMessageContainer) {
          errorMessageContainer.style.display = 'none';
        }
        next({ name: 'LoginUser' });  // Redirect to login page
      }, 1000); // Redirect after 3 seconds (adjust delay as needed)

      return;
    }
  }

  // Check if the route is for guests only (e.g., login, registration)
  if (to.matched.some((record) => record.meta.guest)) {
    // If the route is for guests only and the user is already authenticated
    if (token) {
      return next({ name: 'DashboardPage' });
    }
  }

  next(); // Allow navigation if no conditions block it
});

export default router;
