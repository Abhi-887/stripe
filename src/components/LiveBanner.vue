<template>
    <section class="hero flex items-center hidden lg:flex bg-cover bg-center">
      <div class="container mx-auto xl:px-4 lg:px-12 md:px-16 sm:px-8 px-6 flex flex-col md:flex-row relative">
        <!-- Left Column for Text -->
        <div class="flex flex-col justify-center text-white text-center md:text-left md:items-start items-center xl:my-32 lg:my-14 md:my-4 my-10 relative z-10">
          <h1 class="text-2xl md:text-4xl lg:text-4xl raleway-custom leading-tight custom-lg uppercase">
            October 2024 Auction Ends In
          </h1>
  
          <!-- Countdown Timer -->
          <div class="flex countdown-timer mt-8 space-x-6">
            <div class="time-unit">
              <span class="raleway-custom leading-tight text-[52px] font-bold tracking-[2%]">{{ days }}</span>
              <span class="label">Days</span>
            </div>
            <div class="separator"></div>
            <div class="time-unit">
              <span class="raleway-custom leading-tight text-[52px] font-bold tracking-[2%]">{{ hours }}</span>
              <span class="label">Hrs</span>
            </div>
            <div class="separator"></div>
            <div class="time-unit">
              <span class="raleway-custom leading-tight text-[52px] font-bold tracking-[2%]">{{ minutes }}</span>
              <span class="label">Min</span>
            </div>
            <div class="separator"></div>
            <div class="time-unit">
              <span class="raleway-custom leading-tight text-[52px] font-bold tracking-[2%]">{{ seconds }}</span>
              <span class="label">Sec</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'LiveBanner',
    data() {
      return {
        // Set end time for 4 days, 19 hours, and 46 minutes from now
        endTime: new Date().getTime() + (4 * 24 * 60 * 60 * 1000) + (19 * 60 * 60 * 1000) + (46 * 60 * 1000), // 4 days, 19 hours, and 46 minutes
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        timer: null,
      };
    },
    methods: {
      updateCountdown() {
        const now = new Date().getTime();
        const distance = this.endTime - now;
  
        if (distance > 0) {
          this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
          this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
        } else {
          clearInterval(this.timer);
          this.days = this.hours = this.minutes = this.seconds = 0;
        }
      },
    },
    mounted() {
      this.updateCountdown();
      this.timer = setInterval(this.updateCountdown, 1000); // Update every second
    },
    beforeUnmount() {
      clearInterval(this.timer);
    },
  };
  </script>
  
  <style scoped>
  .hero {
    background-image: url('@/assets/List Page Header.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center; /* Center the background image */
    width: 100%; /* Full width */
    display: flex;
    align-items: center; /* Center content vertically */
    justify-content: center; /* Optional: Center content horizontally */
  }
  
  .container {
    position: relative;
    max-width: 1280px;
  }
  
  .countdown-timer {
    display: flex;
    align-items: center;
  }
  
  .time-unit {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .label {
    font-size: 14px; /* You can adjust label font size as necessary */
    margin-top: 0.5rem;
  }
  
  .separator {
    width: 1px;
    height: 50px;
    background-color: white;
    opacity: 0.5;
    margin: 0 1rem;
  }
  
  @media (min-width: 1500px) {
    .custom-lg {
      font-size: 2.8em;
    }
  }
  </style>
  