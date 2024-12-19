<template>
    <!-- Auction Notification Banner -->
    <div class="bg-[#f9f5f6] py-2">
      <div class="container mx-auto xl:px-4 lg:px-12 md:px-16 sm:px-5 px-4">
        <div class="flex justify-center items-center text-center">
          <p class="text-[12px] sm:text-base lg:text-lg md:text-lg nunito-sans-light flex items-center hover:text-black transition-colors duration-300">
            <img
              src="@/assets/Notification.svg"
              alt="Notification Icon"
              class="sm:w-3.5 w-3 sm:mr-2 mr-1"
            />
            {{ notificationMessage }}
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "NotificationBar",
    props: {
      notificationMessage: {
        type: String,
        default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any additional styling if needed */
  .container {
    max-width: 1280px !important;
  }
  </style>
  