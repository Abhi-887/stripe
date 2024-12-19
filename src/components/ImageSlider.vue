<template>
  <div class="wapper mx-auto">
    <!-- Container for the slider with max-width -->
    <div class="container mx-auto xl:px-4 lg:px-10 md:px-16 sm:px-7 px-4">
      <!-- Slider HTML Structure -->
      <div class="slider3">
        <div v-for="(item, index) in images" :key="index" class="px-2">
          <a :href="item.link" target="_blank">
            <img :src="item.image" class="w-full h-auto" :alt="item.title" />
          </a>
          <p class="text-center font-semibold nunito-sans-custom">{{ item.title }}</p>
        </div>
      </div>

      <!-- Custom Arrows -->
      <div class="navigation-arrows flex">
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
  name: 'ImageSlider',
  props: {
    images: {
      type: Array,
      required: true,
    },
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

        if (this.images.length) {
          $slider.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: true,
            dots: false,
            initialSlide: 1,
            responsive: [
              {
                breakpoint: 1001,
                settings: {
                  slidesToShow: 2,
                  arrows: true,
                },
              },
              {
                breakpoint: 800,
                settings: {
                  slidesToShow: 1,
                  arrows: true,
                },
              },
            ],
          });
        } else {
          console.error('No images to display in the slider.');
        }
      });
    },
    nextSlide() {
      $('.slider3').slick('slickNext');
    },
    prevSlide() {
      $('.slider3').slick('slickPrev');
    },
  },
};
</script>

<style scoped>
p {
  background-color: black;
  color: white;
  padding: 10px;
  margin: 0;
}

.navigation-arrows {
  justify-content: center;
  margin-top: 20px; /* Margin above the arrows */
  padding-top: 10px; /* Extra padding from the top */
}

.navigation-arrows button {
  background-color: #ebebeb;
  color: rgb(0, 0, 0);
  border: none;
  width: 40px; /* Default width */
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

/* Adjust button size on mobile screens */
@media (max-width: 768px) {
  .navigation-arrows button {
    width: 30px; /* Smaller width for mobile */
    height: 30px; /* Smaller height for mobile */
    font-size: 16px; /* Smaller font size for mobile */
  }
  .navigation-arrows {
  justify-content: center;
  margin-top: 0px; /* Margin above the arrows */
  padding-top: 10px; /* Extra padding from the top */
}
}

.wapper {
  max-width: 1280px;
}
</style>
