<template>
  <div class="wapper mx-auto">
    <!-- Container for the slider with max-width -->
    <div class="container mx-auto  ">
      <!-- Slider HTML Structure -->
      <div class="slider3">
        <!-- Iterate through products and display them as cards in the slider -->
        <div v-for="product in products" :key="product.id" class="pe-8 ps-1 pt-4">
          <div class="product-card border-[#e399a3] border overflow-hidden hover:border-[#8a2432] hover:border-transparent bg-[#8A24320D] hover:ring-1 hover:ring-[#8a2432] hover:ring-offset-0">
            <div class="flex mb-2 justify-between items-center px-4 pt-2 bg-[#ffffff] text-gray-500 text-[10px]">
              <div>Sold on</div>
              <div>{{ product.soldDate }}</div>
            </div>
            <img :src="product.image" alt="Product Image" class="w-full object-contain" />
            <div class="p-6 text-center">
              <div class="flex justify-between items-center text-gray-500 text-[10px] mb-2">
                <div>Lot #{{ product.lotNumber }}</div>
                <div class="flex items-center">
                  <img 
                    :src="getStatusIcon(product.reserveStatus)" 
                    alt="Status Icon" 
                    class="check-status-icon" 
                  />
                  <span class="text-[10px] ml-1 nunito-sans-light">{{ product.reserveStatus }}</span>
                </div>
              </div>
              <h3 class="product-title nunito-sans-light text-black leading-4 text-[14px]">{{ product.title }}</h3>
              <p class="text-[12px] nunito-sans-light mt-2 text-[#8A2432]">
                Winning Bid <span class="text-black font-bold ps-1 text-[16px]">{{ product.winningBid }}</span>
              </p>
              <button class="mt-4 bg-[#8a2432] text-[12px] border hover:border-[#8a2432] text-white hover:text-[#8a2432] w-full py-2 hover:bg-[white] nunito-sans-custom">
                View Lot
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Custom Arrows -->
      <div class="navigation-arrows flex justify-center mt-4">
        <button class="prev" @click="prevSlide">❮</button>
        <button class="next" @click="nextSlide">❯</button>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel';

export default {
  name: 'ProductListSlider',
  data() {
    return {
      products: [
        { 
          id: 1, 
          soldDate: "21/09/2024", 
          image: require('@/assets/1.png'), 
          lotNumber: "357830", 
          reserveStatus: "Reserve has been met", 
          title: "Buffalo Trace Bourbon Very Fine Rare", 
          winningBid: "$200.00" 
        },
        { 
          id: 2, 
          soldDate: "23/09/2024", 
          image: require('@/assets/2.png'), 
          lotNumber: "357831", 
          reserveStatus: "Reserve has not been met", 
          title: "Knob Creek 9 Year Old Bourbon", 
          winningBid: "$75.00" 
        },
        { 
          id: 3, 
          soldDate: "26/09/2024", 
          image: require('@/assets/3.png'), 
          lotNumber: "357832", 
          reserveStatus: "Reserve has been met", 
          title: "Maker's Mark Bourbon", 
          winningBid: "$150.00" 
        },
        { 
          id: 4, 
          soldDate: "28/09/2024", 
          image: require('@/assets/1.png'), 
          lotNumber: "357833", 
          reserveStatus: "Reserve has not been met", 
          title: "Woodford Reserve Bourbon", 
          winningBid: "$130.00" 
        }
      ],
    };
  },
  mounted() {
    this.initializeSlider();
  },
  methods: {
    initializeSlider() {
      this.$nextTick(() => {
        const $slider = $('.slider3');
        
        if ($.fn.slick && $slider.hasClass('slick-initialized')) {
          $slider.slick('unslick');
        }

        if (this.products.length) {
          $slider.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: false, // Let custom arrows control the navigation
            dots: false,
            initialSlide: 1,
            responsive: [
              {
                breakpoint: 1001,
                settings: {
                  slidesToShow: 2,
                  arrows: false, // Disable arrows for medium screens
                },
              },
              {
                breakpoint: 800,
                settings: {
                  slidesToShow: 1,
                  arrows: false, // Disable arrows for small screens
                },
              },
            ],
          });
        } else {
          console.error('No products to display in the slider.');
        }
      });
    },
    nextSlide() {
      $('.slider3').slick('slickNext');
    },
    prevSlide() {
      $('.slider3').slick('slickPrev');
    },
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
}

/* Style for the check status image */
.check-status-icon {
  width: 15px; /* Adjust the width as needed */
  height: 15px; /* Adjust the height as needed */
}

/* Title styling for ellipsis */
.product-title {
  display: -webkit-box; /* Required for ellipsis effect */
  -webkit-line-clamp: 2; /* Limit to 2 lines */
  -webkit-box-orient: vertical; /* Vertical orientation */
  overflow: hidden; /* Hide overflow */
  text-overflow: ellipsis; /* Show ellipsis */
  font-weight: 500;
}

/* Custom Styling for Navigation Buttons */
.navigation-arrows {
  justify-content: center;
  margin-top: 20px;
  padding-top: 10px;
}

.navigation-arrows button {
  background-color: #ebebeb;
  color: rgb(0, 0, 0);
  border: none;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  cursor: pointer;
  font-size: 20px;
  border-radius: 50%;
}

.navigation-arrows button:hover {
  background-color: #8a2432;
  color: rgb(255, 255, 255);
}

/* Responsiveness for Navigation Buttons */
@media (max-width: 768px) {
  .navigation-arrows button {
    width: 30px;
    height: 30px;
    font-size: 16px;
  }
  .navigation-arrows {
    margin-top: 10px;
    padding-top: 10px;
  }
}


.slider3 img {
  max-width: 100%;
  height: auto;
}
</style>
